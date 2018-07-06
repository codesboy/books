<?php
namespace app\api\controller\v1;
use app\api\validate\CustomerNew;
use app\api\validate\CustomerDebts;
use app\api\model\CustomerInfo;
use app\lib\exception\CustomerException;
use think\Db;
// 客户
class Customer extends Base{

    public function createCustomer(){

        $validate=new CustomerNew();
        $validate->goCheck();
        
        $dataArray=$validate->getDataByRule2(input('post.'),['cid']);//如果用户提交的数据中有cid字段就过滤掉
        // dump($dataArray);die;
        
        $infoData = [
            'name'=>$dataArray['name'],
            'phone'=>$dataArray['phone']

        ];
        // 查询客户是否已经存在
        $customer = customerInfo::getCustomerByNameOrPhone($dataArray['name']);
        
        // 启动事务
        Db::startTrans();
        try{
            if($customer){
                $addInfo = $customer;
                // throw new CustomerException([
                //     'msg'=>'该客户已经存在！'
                // ]);
            }else{
                $addInfo = CustomerInfo::create($infoData);
            }


            $rs = $addInfo->debts()->save([
                'goods_id'=>$dataArray['goods_id'],
                'happen_time'=>$dataArray['happen_time'],
                'debts_money'=>$dataArray['debts_money'],
                'comment'=>$dataArray['comment']
            ]);
            // 提交事务
            Db::commit();
            return $rs;
        }catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            // throw $e;
            throw new CustomerException([
                'msg'=>'保存失败，事务回滚，请重新提交！'.$e,
                'errorCode'=>60000
            ]);
        };

    }
    
    
    // 还账
    public function payback(){
        $validate = new CustomerDebts();
        $validate->goCheck();
        $dataArray=$validate->getDataByRule2(input('post.'),['cid']);

        $customer = customerInfo::getCustomerByNameOrPhone($dataArray['keyword']);
        if(!$customer){
            throw new CustomerException();
        }
        // dump($customer);die;
        $rs=$customer->debts()->save([
            'payback_money'=>$dataArray['payback_money'],
            'happen_time'=>$dataArray['happen_time'],
            'comment'=>$dataArray['comment']
        ]);
        $r=customerInfo::with('debts,debts.goods')->find($rs->cid);
        // return json($r);
        // dump($r);
        return $r;

    }

    // 获取所有欠款记录
    public function getAllDebts(){
        $data = CustomerInfo::with('debts,debts.goods')->select();
        return $data;
    }

}
