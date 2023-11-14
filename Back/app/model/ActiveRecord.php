<?php
namespace app\model;

abstract class ActiveRecord {
    
    protected array $data;

    public function __set($index, $value)
    {
        if(!isset($this->data[$index]))
        $this->data[$index] = $value;
    }
 
    public function __get($index)
    {
        if(isset($this->data[$index])){
            return $this->data[$index];
        }
    }
 
    public function getData(){
        return $this->data;
    }

}

?>