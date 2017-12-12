<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/9/2017
 * Time: 5:30 PM
 */
error_reporting(E_ERROR | E_PARSE);

require_once("../controllers/controller.php");
require_once("../services/JWTService.php");
include("./headers.php");

if($_SERVER["REQUEST_METHOD"] != "POST")
{
    $message->answer = "Error";
    echo json_encode($message);
}
else{
    $ctrl = new Controller();
    $tokenService = new JWTService();

    $token = $_POST["token"];
    $token_ok = true;
    $data = null;
    $saved_file_name = "";

    try
    {
        $data = $tokenService->validateToken($token);
        $user = $ctrl->uctrl->get_user_by_name($data['name']);
        if($user["user_type"] != $data["role"])
        {
            throw new Exception("Mismatch user role");
        }
        if($user["user_type"] != 1)
        {
            throw new Exception("User role not administrator!");
        }
    }
    catch(Exception $e)
    {
        $message->answer = "Error";
        $message->reason = "Invalid token given";
        echo json_encode($message);
        exit(0);
    }
    $res = $ctrl->uctrl->get_users();
    $message->answer = "Success";
    $message->users = $res;
    echo json_encode($message);
}
