<?php
namespace app\api\validate;

class ImgUpload extends BaseValidate{
    protected $rule=[
        'file'=>'require|image|fileSize:8388608',
    ];

    protected $message=[
        'file.require' => '请选择上传文件!',
        'file.image' => '非法图像文件!',
        'file.fileSize' => '图片文件大小不能超过8M',
    ];

}