<?php

namespace tests;

use app\model\Product;
use PHPUnit\Framework\TestCase;

class ProductTest extends TestCase
{ 
    public function testProduct(): void
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
        
        $product->name = "Bola de futebol de campo";
        $product->productTypeId = 6;
        $product->price = "60.00";

        $saved = $product->save();

        $this->assertTrue($saved);

        if($saved){
        
            $product1 = new Product();
            $product1 = $product1->getByName("Bola de futebol de campo");

            $this->assertNotNull($product1->id);
            
            if($saved){

                $dropped = $product1->delete($product1->id);

                $this->assertTrue($dropped);

            }


        }


    }
}