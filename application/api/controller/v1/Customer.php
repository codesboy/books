<?php
namespace app\api\controller\v1;
use app\api\validate\CustomerNew;
use app\api\validate\CustomerDebts;
use app\api\model\CustomerInfo;
use app\lib\exception\CustomerException;
// 货物
class Customer extends Base{

    public function createCustomer(){

        $validate=new CustomerNew();
        $validate->doCheck();

        $dataArray=input('post.');
        

        // dump(input('post.'));die;
        $infoData = [
            'name'=>$dataArray['name'],
            'phone'=>$dataArray['phone']

        ];
        $addInfo = CustomerInfo::create($infoData);

        if($addInfo){
            $rs = $addInfo->debts()->save([
                'goods_id'=>$dataArray['goods_id'],
                'debts_time'=>$dataArray['debts_time'],
                'debts_money'=>$dataArray['debts_money'],
                'comment'=>$dataArray['comment']
            ]);

            return json($rs);
        }
        // return $addInfo;
    }
    public function getCustomer(){
        $c = CustomerInfo::get(1);
        dump($c->debts);
    }
    
    // 还账
    public function payback(){
        $validate = new CustomerDebts();
        $validate->doCheck();
        $dataArray=$validate->getDataByRule(input('post.'));//获取用户提交的地址信息

        $customer = customerInfo::getCustomerByNameOrPhone($dataArray['keyword']);
        if(!$customer){
            throw new CustomerException();
        }
        // dump($customer);die;
        $rs=$customer->debts()->save([
            'payback_money'=>$dataArray['payback_money'],
            'happen_time'=>$dataArray['happen_time']
        ]);
        dump($re);

    }

}
