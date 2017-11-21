<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:22 PM
 */


use Firebase\JWT\JWT;

require_once("../vendor/autoload.php");

class JWTService
{
    private $key;
    public function __construct()
    {
        // cea mai buna keye
        $this->key = "eusibaietiimeisunteminmileniultrei";
    }

    //Checks if the token is valid and returns the user role
    public function validateToken($token)
    {
        $arr = array("HS512");

        $token = JWT::decode($token,
            $this->key,
            $arr);

        // don't ask why thx ms pwp
        return json_decode(json_encode($token), true);

    }

    public function createToken($role, $username)
    {
        $data = ["name"=>$username, "role"=>$role];

        $jwt = JWT::encode(
            $data,      //Data to be encoded in the JWT
            $this->key, // The signing key
            'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );

        return $jwt;
    }
}
