<?php
namespace app\api\model;
use think\Model;

class Goods extends Model{

    protected $hidden=['update_time'];//隐藏指定的字段

    protected $autoWriteTimestamp = true;//自动时间戳

    protected $dateFormat = 'Y-m-d';//输出时间戳格式

    public function debts(){
        // 第一个参数是要关联的模型名(需要先建立好)，第二个参数是关联模型外键，第三个参数是当前模型对应表的组件
        return $this->hasMany('CustomerDebts','goods_id');
    }

    public static function getGoods(){
        $goods=self::order('create_time','desc')->select();//查询数据

        return $goods;
    }
}

// $this和self的区别
// $this是指向继承的父类，self是指当前的类
