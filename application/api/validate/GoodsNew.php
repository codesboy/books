<?php
namespace app\api\validate;

class GoodsNew extends BaseValidate{
    protected $rule=[
        'goods_name'=>'require|isNotEmpty'
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
