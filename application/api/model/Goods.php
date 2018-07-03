<?php
namespace app\api\model;
use think\Model;

class Goods extends Model{

    protected $hidden=['update_time'];//隐藏指定的字段

    protected $autoWriteTimestamp = true;//自动时间戳

    protected $dateFormat = 'Y-m-d';//输出时间戳格式

    public static function getGoods(){
        $goods=self::order('create_time','desc')->select();//查询数据

        return $goods;
    }
}

// $this和self的区别
// $this是指向继承的父类，self是指当前的类
