<?php
namespace app\api\validate;

class CustomerNew extends BaseValidate{
    protected $rule=[
        'name'=>'require|isNotEmpty',
        'phone'=>'unique:customer_info|isMobile',
        'goods_id'=>'require|positiveInteger',
        'debts_time'=>'require|dateFormat:Y-m-d',
        'debts_money'=>'require|float'
    ];

        // 测试数据
    /*{
        "name":"rehack",
        "mobile":"13663220012",
        "province":"四川",
        "city":"成都",
        "country":"金牛",
        "detail":"万达"
    }*/

}
