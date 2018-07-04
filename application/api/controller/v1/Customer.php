<?php
namespace app\api\controller\v1;
use app\api\validate\CustomerNew;
use app\api\model\CustomerInfo;
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


}
