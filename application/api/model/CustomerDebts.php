<?php

namespace app\api\model;

class CustomerDebts extends Base{
    protected $hidden=['update_time'];//隐藏指定的字段

    protected $autoWriteTimestamp = true;//自动时间戳

    protected $dateFormat = 'Y-m-d';//输出时间戳格式

    // 写入时间格式转换
    protected $type = [
        "happen_time"=>'timestamp',
        'debts_money'=>'float',
        'payback_money'=>'float'
    ];

    public function goods()
    {
        return $this->belongsTo('Goods','goods_id');
    }


}