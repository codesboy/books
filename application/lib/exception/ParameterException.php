<?php
/**
 * Created by PhpStorm.
 * User: yanfaone
 * Date: 2017/6/16 0016
 * Time: 15:07
 */
namespace app\lib\exception;

use think\Exception;

class ParameterException extends BaseException
{
    public $code = 400;
    public $msg = '参数错误';
    public $errorCode = 10000;
}