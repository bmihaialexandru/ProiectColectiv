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
    $id = $_POST['id'];

    $security_token = $_POST['token'];
    $jwt_service = new JWTService();
    $token_ok = true;

    try
    {
        $current_role = $jwt_service->validateToken($security_token)["role"];
        if($current_role != "1")
        {
            throw new Exception("What are you doing here?????");
        }
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
        if(!empty($id))
        {
            $ctrl->sctrl->delete_schedule_entry($id);
            $message->answer = "Success";
            echo json_encode($message);
        }
        else
        {
            $message->answer = "Error";
            $message->reason = "Uncompleted fields...";
            echo json_encode($message);
        }
    }
}
?>