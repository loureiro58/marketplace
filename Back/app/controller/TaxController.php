<?php
namespace app\controller;

use app\model\Tax;
use app\model\TaxProductType;

class TaxController{

    public function index(){
        
        $count = 0;
        $data = [];
        $tax = new Tax();
        $taxs = $tax->all();
        
        foreach($taxs as $tax){
            $data[$count] = $tax->getData();
            $count++;
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);
        echo json_encode($data);
        exit;
    }

    public function store(){
  
        $name = isset($_POST['name']) ? $_POST['name'] : null;
        $percentage = isset($_POST['percentage']) ? $_POST['percentage'] : null;

        $taxId = 0;
        if( !is_null($name) && $name !== '' && !is_null($percentage) && $percentage !== '')
        {
            $tax = new Tax();
            $tax->name = $name;
            $tax->percentage = $percentage;
            $saved = $tax->save();

            if($saved){
                $taxId = 1;
            }

        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($taxId);
        exit;

    }

    public function drop(){

        $id = isset($_POST['id']) ? $_POST['id'] : null;
        
        $drop = 0;
        if( !is_null($id) && $id !== '')
        {
            $taxProd = new TaxProductType();
            $count = $taxProd->count("taxProductType","taxId", $id);
            $many = $count[0]->getData();
            
            if($many["count"] <= 0){          
                $tax = new Tax();
                $dropped = $tax->delete($id);
                             
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