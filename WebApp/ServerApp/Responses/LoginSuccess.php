<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 5:32 PM
 */

class LoginSuccess
{
    public $role;
    public $token;

    public function __construct ($role, $token) {
        $this->role = $role;
        $this->token = $token;
    }
}