<?php
namespace app\controller;

use app\model\Product;
use app\model\ProductType;
use app\model\SaleDetail;

class ProductController{

    public function index(){
        
        $data = [];
        $cont = 0;
        $type = null;

        $product = new Product();
        $products = $product->all();
        foreach($products as $prod){

            $productType = new ProductType();
            $type = $productType->getById('name', $prod->productTypeId);
            $prod->type = $type->getData();
    
            $data[$cont] = $prod->getData();
            $cont++;
        }
                    
        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;
        
    }

    public function store(){    

            $name = isset($_POST['name']) ? $_POST['name'] : null;
            $productTypeId = isset($_POST['productTypeId']) ? $_POST['productTypeId'] : null;
            $price = isset($_POST['price']) ? $_POST['price'] : null;
            
            $prodCode = 0;
            if( !is_null($name) && !is_null($price) &&
                $name !== ''  && $price !== '')
            {
                $product = new Product();

                $id = $product->recoveryId();
                $maxId = $id[0]->getData();
                if(is_null($maxId["max"])){
                    $product->id =  1;
                }
                else {
                    $product->id =  $maxId["max"] + 1;
                }
                
                $product->name = $name;
                $product->productTypeId = $productTypeId;
                $product->price = $price;

                $saved = $product->save();
    
                if($saved){
                    $prodCode = 1;
                }
            }
    
            header("Access-Control-Allow-Origin: *");
            http_response_code(200);        
            echo json_encode($prodCode);
            exit;
        
    
    }


    public function drop(){

        $id = isset($_POST['id']) ? $_POST['id'] : null;
        
        $drop = 0;
        $product = new Product();
        $dropped = $product->delete($id);
                             
        if($dropped){
            $drop = 1;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($drop);
        exit;
        
    }

}

?>