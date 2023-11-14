<?php

namespace app\model;

use app\database\Connection;
use PDO;

abstract class ActiveRecordActions extends ActiveRecord{

    
    public function all(string $fields = '*'){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 
        
        $sql = "select {$fields} from {$tableName}";

        $con = Connection::getConnection();        
        $query = $con->query($sql);
        return $query->fetchAll(PDO::FETCH_CLASS, static::class);
    }

    public function recoveryId(string $fields = 'id'){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 
        
        $sql = "select max({$fields}) from {$tableName}";

        $con = Connection::getConnection();        
        $query = $con->query($sql);
        return $query->fetchAll(PDO::FETCH_CLASS, static::class);
    }

    public function allFilter(string $column, int $value, string $fields = '*'){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 
        
        $sql = "select {$fields} from {$tableName} where {$column} = {$value}";

        $con = Connection::getConnection();        
        $query = $con->query($sql);
        return $query->fetchAll(PDO::FETCH_CLASS, static::class);
    }

    public function count(string $table, string $column, int $value){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 
        
        $sql = 'select count(*) from '.$tableName. ' where '.$tableName.'."'.$column.'" = '.$value.';';

        $con = Connection::getConnection();        
        $query = $con->query($sql);
        return $query->fetchAll(PDO::FETCH_CLASS, static::class);
    }

    public function getByName(string $name){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 

        
        $sql = "select * from {$tableName} where upper(name) like upper('%{$name}%');";

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        $prepare->execute();

        return $prepare->fetchObject($class);

    }

    public function delete($id){

        $class = get_class($this);
        $tableName = constant("{$class}::table"); 

        $sql = "delete from {$tableName} where id = {$id} ;";

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        return $prepare->execute();

    }

    public function deleteByFather(string $column, int $id){

        $class = get_class($this);
        $tableName = constant("{$class}::table"); 

        $sql = 'delete from '.$tableName. ' where '.$tableName.'."'.$column.'" = '.$id.';';

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        return $prepare->execute();

    }

    public function getById(string $fields = '*', ?int $id = null){
        $class = get_class($this);
        $tableName = constant("{$class}::table"); 

        $sql = "select {$fields} from {$tableName} where id = :id;";

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        $prepare->execute([
            'id' => $id
        ]);

        return $prepare->fetchObject($class);

    }

    public function save(){

        $class = get_class($this);
        $tableName = constant("{$class}::table"); 
        
        $sql = 'insert into ' .$tableName. ' ("' . implode('", "', array_keys($this->data)) . '") values (:' 
                    . implode(',:', array_keys($this->data)) . ');';
            
            ;

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        return $prepare->execute($this->data);

    }

    public function saveOrUpdate(){

        $class = get_class($this);
        $tableName = constant("{$class}::table"); 

        $sql = "";
        
        if(array_key_exists('id', $this->data)){
            $sql = "update {$tableName} set ";
            foreach(array_keys($this->data) as $field){
                if($field != 'id'){
                    $sql .= "{$field} = :{$field},";
                }   
            }
            $sql = rtrim($sql, ',');
            $sql .= " where id = :id ;";
        }
        else{
        $sql = 'insert into ' .$tableName. ' ("' . implode('", "', array_keys($this->data)) . '") values (:' 
                    . implode(',:', array_keys($this->data)) . ');';
            
            ;
        }

        $con = Connection::getConnection();
        $prepare = $con->prepare($sql);
        return $prepare->execute($this->data);

    }

}

?>