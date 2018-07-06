<?php
/**
 * Created by PhpStorm.
 * User: yanfaone
 * Date: 2017/6/30 0030
 * Time: 17:04
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\model\User as UserModel;
use app\api\service\Token as TokenService;
use app\api\validate\AddressNew;
use app\lib\exception\SuccessMessage;
use app\lib\exception\UserException;
use think\Controller;

class Address extends BaseController
{
    protected $beforeActionList = [
        'checkPrimaryScope' => ['only' => 'createOrUpdateAddress']
    ];


    /**
     * 创建或更新地址
     * @return \think\response\Json
     * @throws UserException
     * @throws \app\lib\exception\ParameterException
     */
    public function createOrUpdateAddress()
    {
        $addressNew = new AddressNew();
        $addressNew->goCheck();

        $uid = TokenService::getCurrentUid();//获取用户ID
        $user = UserModel::get($uid);//查询用户

        if (!$user) {
            throw new UserException();
        }
        $data = input('post.');
//        $filterData =$addressNew->getDataByRule($data);//过滤数据
        $filterData = $addressNew->getDataByRule2($data, ['user_id', 'uid']);//过滤数据

        $userAddress = $user->address;//通过关联模型查找 用户地址
        if (!$userAddress) { //不存在 新增
            $user->address()->save($filterData);
        } else { //存在 更新
            $user->address->save($filterData);
        }
//        return $user;
//        return 'success';
        return json(new SuccessMessage(),201);
    }
}