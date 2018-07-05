<?php

namespace app\api\model;

class CustomerInfo extends Base{
    protected $hidden=['update_time'];//隐藏指定的字段

    protected $autoWriteTimestamp = true;//自动时间戳

    protected $dateFormat = 'Y-m-d';//输出时间戳格式
    
    public function debts(){
        return $this->hasMany('CustomerDebts','cid');
    }

    // 根据姓名或手机号查询
    public static function getCustomerByNameOrPhone($keyword){
        // $customer = self::where('name|phone',$keyword)->fetchSql()->select();
        // $customer = self::with('debts')->where('name|phone',$keyword)->select();
        $customer = self::where('name|phone',$keyword)->select();
        if($customer->isEmpty()){
            return false;
        }else{
            return $customer;

        }
    }
}

// 模型的数据集查询始终返回数据集对象（模型对象实例）而不再是数组；但可以和数组一样使用

/* 使用TP5的模型查询判断有以下几种，不知道是否正确。
$info = User::select(); 
$info = User::all('1,2,3');
用if ($info->isEmpty()) {}
其他的find(); value(); column(); get(); getByName(); 还有聚合查询
都可以用if (empty($info)) {} */