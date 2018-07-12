<?php
namespace app\api\controller\v1;
use app\api\validate\CustomerNew;
use app\api\validate\CustomerDebts;
use app\api\validate\ImgUpload as UploadValidate;
use app\api\model\CustomerInfo;
use app\api\model\Images;
use app\lib\exception\CustomerException;
use app\lib\exception\UploadException;
use think\Db;
// 客户
class Customer extends Base{

    public function createCustomer(){

        $validate=new CustomerNew();
        $validate->goCheck();
        
        $dataArray=$validate->getDataByRule2(input('post.'),['cid']);//如果用户提交的数据中有cid字段就过滤掉
        // dump($dataArray);die;
        
        $infoData = [
            'name'=>$dataArray['name'],
            'phone'=>$dataArray['phone']

        ];
        // 查询客户是否已经存在
        $customer = customerInfo::getCustomerByNameOrPhone($dataArray['name']);
        

        // 启动事务
        Db::startTrans();
        try{
            if($customer){
                $addInfo = $customer;
                // throw new CustomerException([
                //     'msg'=>'该客户已经存在！'
                // ]);
            }else{
                $addInfo = CustomerInfo::create($infoData);
            }

            
            
            $rs = $addInfo->debts()->saveAll($dataArray['debts']);
            // dump($rs);exit;
            // 提交事务
            Db::commit();
            //saveAll方法新增数据返回的是包含新增模型（带自增ID）的数据集对象。
            return json($rs);
        }catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            // throw $e;
            throw new CustomerException([
                'msg'=>'保存失败，事务回滚，请重新提交！'.$e,
                'errorCode'=>60000
            ]);
        };

    }
    
    
    // 还账
    public function payback(){
        $validate = new CustomerDebts();
        $validate->goCheck();
        $dataArray=$validate->getDataByRule2(input('post.'),['cid']);

        $customer = customerInfo::getCustomerByNameOrPhone($dataArray['keyword']);
        if(!$customer){
            throw new CustomerException();
        }
        // dump($customer);die;
        $rs=$customer->debts()->save([
            'payback_money'=>$dataArray['payback_money'],
            'happen_time'=>$dataArray['happen_time'],
            'comment'=>$dataArray['comment']
        ]);
        $r=customerInfo::with('debts,debts.goods')->find($rs->cid);
        // return json($r);
        // dump($r);
        return $r;

    }

    // 获取所有欠款记录
    public function getAllDebts(){
        $data = CustomerInfo::with(['debts'=>['goods','images']])->order('create_time','desc')->select();
        return $data;
    }

    // 上传图片
    public function upload(){
        $file = request()->file('image');
        // dump($file);
        if(!$file){
            throw new UploadException([
                'code'=>0,
                'msg'=>'没有选择图片或者图片超过post_max_size、upload_max_filesize大小'
            ]);
        };

        $validate=new UploadValidate();
        // 针对getimagesize(): Read error!异常
        try {
            // 上传文件验证
            $result=$validate->check(['file' => $file]);
        } catch (\Exception $e) {
            throw new UploadException([
                'code'=>0,
                'msg'=>$e->getMessage()
            ]);
        }

        // 验证不通过
        if(true !== $result){
            // dump(UploadException);die;
            throw new UploadException([
                // 'msg'=>$this->error($result);
                'code'=>0,
                'msg'=>$validate->getError()
            ]);
        }

        $info = $file->move( './uploads');
        if($info){
            // return $info->getSaveName();
            $url =  $info->getSaveName();
            //写入数据库
            // $images = new Images();
            $images=Images::create([
                "url"=>$url
            ]);
            return $images->id;
        }else{
            // 上传失败获取错误信息
            echo $file->getError();
        }
        
        // echo 1;
    }
}
