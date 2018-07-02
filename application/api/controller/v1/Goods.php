<?php
namespace app\api\controller\v1;
use app\api\validate\GoodsNew;
use app\api\model\Goods as GoodsModel;
// 货物
class Goods extends Base{

    public function createOrUpdateGoods(){

        $validate=new GoodsNew();

        $validate->doCheck();
        // dump($validate->doCheck());
        // die;
        $dataArray=$validate->getDataByRule(input('post.'));
        

        $addGood = GoodsModel::create($dataArray);
        return $addGood;
    }
    public function getGoods(){

    }


}
