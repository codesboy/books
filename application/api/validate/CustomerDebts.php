<?php
namespace app\api\validate;

class CustomerDebts extends BaseValidate{
    protected $rule=[
        'keyword'=>'require|isNotEmpty',
        'payback_money'=>'require|float',
        'happen_time'=>'require|dateFormat:Y-m-d',
        'comment'=>'isNotEmpty'
    ];

    protected $message=[
        'keyword'=>'请输入正确的姓或手机号进行查询',
        'payback_money'=>'请填写还账金额',
        'happen_time'=>'请选择时间'
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
