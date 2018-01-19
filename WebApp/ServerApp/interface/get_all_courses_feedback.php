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
    $tokenService = new JWTService();
    $token_ok = true;
    $data = null;


    $message->answer = "Success";
    $message->feedbacks = $ctrl->fctrl->get_all_courses_feedback();
    echo json_encode($message);

}


?>