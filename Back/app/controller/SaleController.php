<?php
namespace app\controller;


use app\model\Product;
use app\model\ProductType;
use app\model\Sale;
use app\model\SaleDetail;
use app\model\Tax;
use app\model\TaxProductType;

class SaleController{

    public function init(){

        $cont = 0;
        $data = [];
        $product = new Product();
        $products = $product->all();

        foreach($products as $prod){

            //$productType = new ProductType();
            //$type = $productType->getById('name', $prod->productTypeId);
            //$prod->type = $type->getData()->name;
       
            $taxProductType = new TaxProductType();
            $taxIds = $taxProductType->allFilter('"productTypeId"', $prod->productTypeId, '"taxId"');
            
            $taxSum = 0;
            $tax = new Tax();
            foreach($taxIds as $taxId){
                $aux = $taxId->getData();
                $taxPercentage = $tax->getById('percentage', $aux["taxId"]);
                $percentage = $taxPercentage->getData();
                    
                $taxSum = $taxSum + doubleval($percentage["percentage"]);
            }            
            $prod->tax = $taxSum;
              
            $data[$cont] = $prod->getData();
            $cont++;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;


    }

    public function index(){

        $count = 0;
        $data = [];
        $sale = new Sale();
        $sales = $sale->all();
        
        foreach($sales as $sale){
            $data[$count] = $sale->getData();
            $count++;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;
    }   

    public function store(){

        $products = isset($_POST['productsSale']) ? json_decode($_POST['productsSale']) : null;
        $totalTax = isset($_POST['totalTax']) ? $_POST['totalTax'] : null;
        $totalSale = isset($_POST['totalSale']) ? $_POST['totalSale'] : null;
        
        $saleCode = 0;
        if( !is_null($totalTax) && !is_null($totalSale) &&
            $totalTax !== ''  && $totalSale !== '')
        {
            $sale = new Sale();
            $sale->totalTax = (double) $totalTax;
            $sale->totalSale = (double) $totalSale;

            $saved = $sale->save();

            if($saved){
                $aux = $sale->recoveryId();
                $maxId = $aux[0]->getData();
                $sale->id = $maxId['max'];
                $saleCode = $maxId['max'];

                foreach($products as $prod){
                    $saleDetail = new SaleDetail();
                    $saleDetail->price = $prod->price;
                    $saleDetail->many = $prod->many;
                    $saleDetail->valueTax = $prod->valueTax;
                    $saleDetail->valueTotal = $prod->valueTotal;
                    $saleDetail->productName = $prod->name;
                    $saleDetail-> saleId = $sale->id;

                    $saleDetail->save();
                }
            }
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($saleCode);
        exit;
    }

    public function drop(){

        $id = isset($_POST['id']) ? $_POST['id'] : null;
        
        $drop = 0;
        if( !is_null($id) && $id !== '')
        {

            $saleDetail = new SaleDetail();
            $dropped = $saleDetail->deleteByFather('saleId', $id);

            $sale = new Sale();
            $dropped = $sale->delete($id);
                             
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