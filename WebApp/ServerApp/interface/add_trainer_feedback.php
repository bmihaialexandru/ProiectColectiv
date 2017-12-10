<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/10/2017
 * Time: 9:41 AM
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
    $stars = $_POST['stars'];
    $feedback_message = $_POST['message'];
    $trainer_id = $_POST['trainer_id'];
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
        if(!is_numeric($stars))
        {
            $message->answer = "Error";
            $message->reason = "Star score must be a number!";
            echo json_encode($message);
            exit(0);
        }
        echo $message;
        if(!empty($stars) && !empty($trainer_id) && !empty($feedback_message))
        {

            $res=$ctrl->ftctrl->AddFeedback($stars,$feedback_message,$user['id'],$trainer_id);
            if($res === 0)
            {
                $message->answer = "Success";
                echo json_encode($message);
            }
            else
            {
                if($res === 1){
                    $message->answer = "Error";
                    $message->reason = "Invalid rating!";
                    echo json_encode($message);
                }
                if($res === 2){
                    $message->answer = "Error";
                    $message->reason = "Invalid trainer id!";
                    echo json_encode($message);
                }

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