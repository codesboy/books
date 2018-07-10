<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------


//新增货物接口
Route::post('api/:version/addgoods','api/:version.Goods/createOrUpdateGoods');

// 获取货物接口
Route::get('api/:version/getgoods','api/:version.Goods/getGoods');

// 新增欠款记录
Route::post('api/:version/adddebts','api/:version.Customer/createCustomer');

// 还账
Route::post('api/:version/payback','api/:version.Customer/payback');


// 获取所有欠款记录
Route::get('api/:version/getalldebts','api/:version.Customer/getAllDebts');

// 上传
// Route::post('api/:version/upload1','api/:version.Customer/uploadImage');
Route::post('api/:version/upload','api/:version.Customer/upload');