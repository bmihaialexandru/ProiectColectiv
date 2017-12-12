<?php
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
    $security_token = $_POST['token'];
    $jwt_service = new JWTService();
    $token_ok = true;
    $user = null;

    try
    {
        $data = $jwt_service->validateToken($security_token);
        $user = $ctrl->uctrl->get_user_by_name($data['name']);
    }
    catch (Exception $e)
    {
        $token_ok = false;
    }

    if($token_ok == false)
    {
        $message->answer = "Error";
        $message->reason = "Invalid token";
        echo json_encode($message);
    }
    else
    {
        $subs = $ctrl->subctrl->get_all_subscribtion($user['id']);
        $message->answer = "Success";
        $message->subscribtions = $subs;
        echo json_encode($message);

    }
}
?>