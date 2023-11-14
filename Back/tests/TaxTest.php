<?php

namespace tests;

use app\model\Tax;

class TaxTest 
{ 
    public function testTax(): void
    {
        echo "Início teste unitário da classe Tax:";

        $tax = new Tax(); 
        $tax->name = "CPMF";
        $tax->percentage = 15.4;
        $saved = $tax->save();

        if($saved){
            echo "Taxa criada";

            $tax1 = new Tax();
            $tax1 = $tax1->getByName("CPMF");

            echo "Taxa recuperada do banco";
            
            $tax1->percentage = 8.3;
            $saved = $tax1->save();

            if($saved){
                echo "Taxa atualizada";
                $dropped = $tax1->delete($tax->id);

                if($dropped){
                    echo "Taxa removida";
                }

            }


        }

        echo "Término teste unitário da classe Tax";

    }
}