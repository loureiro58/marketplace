<?php

namespace tests;

use app\model\Tax;
use PHPUnit\Framework\TestCase;

class TaxTest extends TestCase
{ 
    public function testTax(): void
    {

        $tax = new Tax(); 
        $tax->name = "CPMF";
        $tax->percentage = 15.4;
        $saved = $tax->save();

        $this->assertTrue($saved);

        if($saved){
        
            $tax1 = new Tax();
            $tax1 = $tax1->getByName("CPMF");

            $this->assertNotNull($tax1->id);
            
            $tax1->percentage = 8.3;
            $saved = $tax1->saveOrUpdate();

            $this->assertTrue($saved);

            if($saved){

                $dropped = $tax1->delete($tax1->id);

                $this->assertTrue($dropped);

            }


        }


    }
}