<?php

namespace tests;

use app\model\ProductType;

class ProductTypeTest 
{ 
    public function test(): void
    {
        echo "Início teste unitário da classe ProductType:";

        $type = new ProductType(); 
        $type->name = "Suvenir";
        $saved = $type->save();

        if($saved){
            echo "Tipo de produto criado";

            $type1 = new ProductType();
            $type1 = $type1->getByName("Suvenir");

            echo "Tipo de produto recuperado";
            
            $type1->name = "Estofados";
            $saved = $type1->save();

            if($saved){
                echo "Tipo de produto atualizado";
                $dropped = $type1->delete($type->id);

                if($dropped){
                    echo "Tipo de produto removido";
                }

            }


        }

        echo "Término teste unitário da classe ProductType";

    }
}