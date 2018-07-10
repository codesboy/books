<?php
namespace app\api\model;
use think\Model;

class Images extends Model{

    protected $hidden=['update_time','create_time'];//隐藏指定的字段

    protected $autoWriteTimestamp = true;//自动时间戳

    protected $dateFormat = 'Y-m-d';//输出时间戳格式

    
}

// $this和self的区别
// $this是指向继承的父类，self是指当前的类
