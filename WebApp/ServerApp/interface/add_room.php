<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 5:28 PM
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
    $name = $_POST["name"];
    $max_capacity = $_POST["max_capacity"];
    $token = $_POST["token"];
    $token_ok = true;
    $data = null;

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
        $token_ok = false;
    }

    if($token_ok == false)
    {
        $message->answer = "Error";
        $message->reason = "Invalid token given";
        echo json_encode($message);
    }
    else
    {
        if(!is_numeric($max_capacity)){
            $message->answer = "Error";
            $message->reason = "Capacity must be a number";
            echo json_encode($message);
            exit(0);
        }
        if(empty($name) || empty($max_capacity))
        {
            $message->answer = "Error";
            $message->reason = "Name or max_capacity are empty!";
            echo json_encode($message);
        }
        else
        {
            if($ctrl->rctrl->AddRoom($name,$max_capacity) == 1)
            {
                $message->answer = "Error";
                $message->reason = "Duplicate room name!";
            }
            else{
                $message->answer = "Success";
            }
            echo json_encode($message);
        }
    }

}
