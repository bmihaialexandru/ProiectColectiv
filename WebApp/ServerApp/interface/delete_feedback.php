<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 5:13 PM
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
else {
    $ctrl = new Controller();
    $tokenService = new JWTService();
    $id = $_POST["id"];
    $token = $_POST["token"];
    $token_ok = true;
    $data = null;

    try {
        $data = $tokenService->validateToken($token);
        $user = $ctrl->uctrl->get_user_by_name($data['name']);
        if ($user["user_type"] != $data["role"]) {
            throw new Exception("Mismatch user role");
        }
        if($user["user_type"] != 1)
        {
            throw new Exception("Only admins can delete feedbacks!");
        }
    } catch (Exception $e) {
        $token_ok = false;
    }

    if ($token_ok == false) {
        $message->answer = "Error";
        $message->reason = "Invalid token given";
        echo json_encode($message);
    } else {

        $feedbacks = $ctrl->fctrl->DeleteFeedback($id);
        if($feedbacks == 1){
            $message->answer = "Error";
            $message->reason = "Invalid feedback id";
            echo json_encode($message);
        }
        else{
            $message->answer = "Success";
            echo json_encode($message);
        }
    }
}