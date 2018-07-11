<?php
namespace app\api\validate;

class CustomerNew extends BaseValidate{
    protected $rule=[
        'name'=>'require|isNotEmpty',
        'phone'=>'isMobile',
        'debts'=>'require|array|isNotEmpty',
        // 'quantity'=>'require|isPositiveInteger',
        // 'img_id'=>'isPositiveInteger',
        'happen_time'=>'require|dateFormat:Y-m-d',
        // 'debts_money'=>'require|float',
        'comment'=>'isNotEmpty'
    ];

    protected $message=[
        'name'=>'请填写姓名！',
        'phone'=>'请填写正确的11位手机号！',
        'debts'=>'请选择货物',
        'happen_time'=>'请选择时间',
        // 'debts_money'=>'请填写欠款金额'
    ];
    

}
