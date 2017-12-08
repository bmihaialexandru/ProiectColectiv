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
    $sc_entry = $_POST['id_entry'];
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
        //TODO: validate email and phone number
        if(!empty($id_entry))
        {

            $res=$ctrl->subctrl->add_subscribtion($user["id"], $id_entry);
            if($res == 0)
            {
                $message->answer = "Success";
                echo json_encode($message);
            }
            else
            {
                $message->answer = "Error";
                $message->reason = "Already subscribed to this entry!";
                echo json_encode($message);
            }
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