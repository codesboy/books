<?php
namespace app\api\validate;

class CustomerNew extends BaseValidate{
    protected $rule=[
        'name'=>'require|isNotEmpty',
        'phone'=>'isMobile',
        'goods_id'=>'require|isPositiveInteger',
        'quantity'=>'require|isPositiveInteger',
        'img_id'=>'require|isPositiveInteger',
        'happen_time'=>'require|dateFormat:Y-m-d',
        'debts_money'=>'require|float',
        'comment'=>'isNotEmpty'
    ];

    protected $message=[
        'name'=>'请填写姓名！',
        'phone'=>'请填写正确的11位手机号！',
        'goods_id'=>'请选择货物',
        'happen_time'=>'请选择时间',
        'debts_money'=>'请填写欠款金额'
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
