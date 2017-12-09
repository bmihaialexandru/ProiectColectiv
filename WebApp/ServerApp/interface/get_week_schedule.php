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
    $ctrl = new Controller();
    $message->answer = "Success";
    $message->schedule = $ctrl->sctrl->get_current_week();
    echo json_encode($message);

}
