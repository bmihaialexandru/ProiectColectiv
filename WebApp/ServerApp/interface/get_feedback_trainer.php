<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/10/2017
 * Time: 10:03 AM
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

    $feedbacks = $ctrl->ftctrl->GetFeedbacks($id);
    if($feedbacks == 1){
        $message->answer = "Error";
        $message->reason = "Invalid trainer id";
        echo json_encode($message);
    }
    else{
        $message->answer = "Success";
        $message->feedbacks = $feedbacks;
        echo json_encode($message);
    }
}