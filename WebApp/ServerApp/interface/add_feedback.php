<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 4:07 PM
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
    $course_id = $_POST['course_id'];
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
        //TODO: validate email and phone number
        if(!empty($stars) || !empty($course_id))
        {

            $res=$ctrl->fctrl->AddFeedback($stars,$feedback_message,$user['id'],$course_id);
            if($res == 0)
            {
                $message->answer = "Success";
                echo json_encode($message);
            }
            else
            {
                $message->answer = "Error";
                $message->reason = "Non existent course!";
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