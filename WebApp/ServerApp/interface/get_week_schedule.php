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
else {
    $date = $_POST['date'];
    $ctrl = new Controller();
    if(!empty($date)) {
        $message->answer = "Success";
        $message->schedule = $ctrl->sctrl->get_current_week($date);
        echo json_encode($message);
    }
    else {
        $message->answer = "Error";
        $message->reason = "Please give a valid date!";
        echo json_encode($message);
    }
}
