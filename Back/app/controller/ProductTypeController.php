<?php
namespace app\controller;

use app\model\Product;
use app\model\ProductType;

class ProductTypeController{

    public function index(){
        
        $count = 0;
        $data = [];
        $productType = new ProductType();
        $types = $productType->all();
        
        foreach($types as $type){
            $data[$count] = $type->getData();
            $count++;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;
    }

    public function store(){

        $name = isset($_POST['name']) ? $_POST['name'] : null;
        
        $productTypeId = 0;
        if( !is_null($name) && $name !== '')
        {
            $productType = new ProductType();
            $productType->name = $name;

            $saved = $productType->save();

            if($saved){
                $aux = $productType->recoveryId();
                $maxId = $aux[0]->getData();
                $productType->id = $maxId['max'];
                $productTypeId = $maxId['max'];
            }

        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($productTypeId);
        exit;


    }

    public function drop(){

        $id = isset($_POST['id']) ? $_POST['id'] : null;
        
        $drop = 0;
        if( !is_null($id) && $id !== '')
        {
            $product = new Product();
            $count = $product->count('product',"productTypeId", $id);
            $many = $count[0]->getData();
            
            if($many["count"] <= 0){          
                $productType = new ProductType();
                $dropped = $productType->delete($id);
                             
                if($dropped){
                    $drop = 1;
                }
            }

        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($drop);
        exit;

        
    }

}

?>