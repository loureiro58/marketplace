<?php

namespace tests;

use app\model\ProductType;
use PHPUnit\Framework\TestCase;

class ProductTypeTest extends TestCase
{ 
    public function test_create()
    {
        $type = new ProductType(); 
        $type->name = "Almoxarife";
        $saved = $type->save();

        $this->assertTrue($saved);
    }
 
    public function test_read_update_delete(){

        $type1 = new ProductType();
        $type1 = $type1->getByName("Almoxarife");
    
        $this->assertNotNull($type1->id);
    
        $type1->name = "Logistica";
        $saved = $type1->saveOrUpdate();

        $this->assertTrue($saved);

        if($saved){
 
            $dropped = $type1->delete($type1->id);
    
            $this->assertTrue($dropped);
         
        }
    
    }

}