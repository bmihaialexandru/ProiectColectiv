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

    $token = $_POST["token"];
    $user_id = $_POST['user_id'];
    $package_id = $_POST['package_id'];
    $unpaid_id = $_POST['id'];
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
        if($user['user_type'] != '1')
        {
            throw new Exception("Only administrators should be able to validate payments");
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
        if(empty($user_id) or empty($package_id) or empty($unpaid_id)) {
            $message->answer = "Error";
            $message->reason = "Incomplete fields";
            echo json_encode($message);
            exit(0);
        }
        try {
            $ctrl->pctrl->make_payment($user_id, $package_id, $unpaid_id);
            $message->answer = "Success";
            echo json_encode($message);
        }
        catch(Exception $e)
        {
            $message->answer = "Error";
            $message->reason = "You already have a paid package exactly like this!";
            echo json_encode($message);
        }
    }

}
