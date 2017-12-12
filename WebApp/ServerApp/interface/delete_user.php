<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/9/2017
 * Time: 5:17 PM
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
    $id = $_POST["id"];

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
        echo $e;
        echo json_encode($message);
        exit(0);
    }
    if (empty($id))
    {
        $message->answer = "Error";
        $message->reason = "Incomplete fields";
        echo json_encode($message);
        exit(0);
    }
    else
    {

        $res = $ctrl->uctrl->delete_user($id);
        if($res === 0 ){
            $message->answer = "Success";
        }
        else{
            $message->answer = "Error";
            if($res === 1){
                $message->reason = "Invalid id";
            }
        }
        echo json_encode($message);
    }
}
