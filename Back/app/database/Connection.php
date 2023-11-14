<?php

namespace app\database;

use PDO;
use PDOException;

class Connection{

    public static function getConnection(){

        try{
            return new PDO("pgsql:host=localhost;port=5432;dbname=postgres;","postgres","root",["charset=utf8"]);
        }
        catch(PDOException $e){
            echo "Fail to connect to the database";   
            die();         
        }
    }
}

?>