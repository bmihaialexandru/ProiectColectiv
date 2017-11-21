<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:21 PM
 */

class TokenFilter
{
    private $db;
    private static $jwtService;
    public function __construct()
    {
        $this->db = new DBUtils();
    }

    public function validateToken($token)
    {
        $role = $this->jwtService->validateToken($token);
        return $role;
    }
}