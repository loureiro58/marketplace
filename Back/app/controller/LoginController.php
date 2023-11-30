<?php
namespace app\controller;

use app\model\User;

class LoginController{

    public function auth(){

        $name = isset($_POST['name']) ? $_POST['name'] : null;
        $pass = isset($_POST['pass']) ? $_POST['pass'] : null;
        $data = [];

        $data[0] = false;
        if( !is_null($name) && !is_null($pass) &&
            $name !== ''  && $pass !== '')
        {
            if($name === 'admin'  && $pass === 'admin'){

                $token = $this->autorizar($name, $pass);
                $data[0] = true;
                $data[1] = $token;
            }
        }

        header("Access-Control-Allow-Origin: *");
        http_response_code(200);        
        echo json_encode($data);
        exit;

    }

    protected static function autorizar($name, $pass)
    {

        $key = '=0_51!*%(47';

        $header = [
            'typ' => 'JWT',
            'alg' => 'HS56'
        ];

        $payload = [
            'nome' => $name,
            'pass' => $pass,
            'timestamp' => microtime(true)

        ];

        $header = json_encode($header);
        $payload = json_encode($payload);

        $header = base64_encode($header);
        $payload = base64_encode($payload);

        $sign = hash_hmac('sha256', $header . '.' . $payload, $key, true);
        $sign = base64_encode($sign);

        $token = $header . '.' . $payload . '.' . $sign;

        return $token;

    }
}