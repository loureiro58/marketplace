<?php
namespace app\controller;

use app\model\ProductType;
use app\model\Tax;
use app\model\TaxProductType;

class TaxProductTypeController{

    public function index(){
        
        $count = 0;
        $data = [];        
        $taxProductType = new TaxProductType();
        $taxProductTypes = $taxProductType->all();
        
        foreach($taxProductTypes as $taxProductType){
            $tax = new Tax();
            $nameTax = $tax->getById('name', $taxProductType->taxId);
            $taxProductType->nameTax = $nameTax->getData();

            $productType = new ProductType();
            $nameType = $productType->getById('name', $taxProductType->productTypeId);
            $taxProductType->nameProductType = $nameType->getData();

            $data[$count] = $taxProductType->getData();
            $count++;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;
    }

    public function store(){
  
        $productTypeId = isset($_POST['productTypeId']) ? $_POST['productTypeId'] : null;
        $taxId = isset($_POST['taxId']) ? $_POST['taxId'] : null;

        $taxProductTypeId = 0;
        if( !is_null($productTypeId) && $productTypeId > 0 && !is_null($taxId) && $taxId > 0)
        {
            $taxProductType = new TaxProductType();
            $taxProductType->productTypeId = $productTypeId;
            $taxProductType->taxId = $taxId;
            $saved = $taxProductType->save();

            if($saved){
                $taxProductTypeId = 1;
            }

        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($taxProductTypeId);
        exit;

    }

    public function drop(){

        $id = isset($_POST['id']) ? $_POST['id'] : null;
        
        $drop = 0;
        if( !is_null($id) && $id !== '')
        {
            $taxProd = new TaxProductType();
            $dropped = $taxProd->delete($id);
                             
            if($dropped){
                $drop = 1;
            }            

        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($drop);
        exit;
        
    }

}

?>