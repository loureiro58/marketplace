<?php
    require '../vendor/autoload.php';
    require '../Routes/router.php';

    try{
    
        $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
        $request = $_SERVER['REQUEST_METHOD'];
            
        findRoute($request, $uri);        

    }
    catch(Exception $e){
        $e->getMessage();
    }


?>