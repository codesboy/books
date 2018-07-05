<?php
namespace app\lib\exception;

class CustomerException extends BaseException{
    public $code=404;
    public $msg='查询的用户不存在';
    public $errorCode=60000;
}
