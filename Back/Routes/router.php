 <?php
    function load(string $controller, string $action){
        try{
            
            $controllerNamespace = "app\\controller\\{$controller}";
            
            if(!class_exists($controllerNamespace)){
                throw new Exception("Controller not exists!");
            }
            
            $controllerInstance = new $controllerNamespace();

            if(!method_exists($controllerNamespace, $action)){
                throw new Exception("Method {$action} not exists into {$controllerNamespace}!");
            }

            $controllerInstance->$action();
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }

    function findRoute(string $method, string $way){

        switch ($method){
            case "GET":
                switch ($way) {
                    case "/sale/init": {
                        load("SaleController", "init");
                        break; 
                    } 
                    case "/sale/index": {
                        load("SaleController", "index");
                        break; 
                    }
                    case "/tax/index": {
                        load("TaxController", "index");
                        break; 
                    }
                    case "/taxProductType/index": {
                        load("TaxProductTypeController", "index");
                        break; 
                    }
                    case "/productType/index": {
                        load("ProductTypeController", "index");
                        break; 
                    }     
                    case "/product/index": {
                        load("ProductController", "index");
                        break; 
                    }     
                    default: {
                        echo 'End-point not found!';
                    }              
                }
                break;
            case "POST":
                switch ($way) {
                    case "/taxProductType/store": {
                        load("TaxProductTypeController", "store");
                        break;                        
                    }
                    case "/taxProductType/drop": {
                        load("TaxProductTypeController", "drop");
                        break;                        
                    }
                    case "/sale/store": {
                        load("SaleController", "store");
                        break;                        
                    }
                    case "/sale/drop": {
                        load("SaleController", "drop");
                        break;                        
                    }
                    case "/tax/store": {
                        load("TaxController", "store");
                        break; 
                    }     
                    case "/tax/drop": {
                        load("TaxController", "drop");
                        break; 
                    }
                    case "/productType/store": {
                        load("ProductTypeController", "store");
                        break; 
                    }
                    case "/productType/drop": {
                        load("ProductTypeController", "drop");
                        break; 
                    }
                    case "/product/store": {
                        load("ProductController", "store");
                        break; 
                    }
                    case "/product/drop": {
                        load("ProductController", "drop");
                        break; 
                    }     
                    default: {
                        echo 'End-point not found!';
                    }              
                }
            default: {
                echo 'Method not allow!';
            }              

        }
    }

?>