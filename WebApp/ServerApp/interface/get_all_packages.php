<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 5:28 PM
 */

error_reporting(E_ERROR | E_PARSE);

require_once("../controllers/controller.php");
require_once("../services/JWTService.php");

if($_SERVER["REQUEST_METHOD"] != "POST")
{
    $message->answer = "Error";
    echo json_encode($message);
}
else{
    $ctrl = new Controller();
    $tokenService = new JWTService();

    // no token validation should be needed for seeing all packages!
    $message->answer = "Success";
    $packages = $ctrl->pctrl->get_packages();
    for($i=0; $i<count($packages); $i++){
        $packages[$i]["courses"] = $ctrl->pctrl->get_course_packages($packages[$i]['id']);
    }
    $message->packages = $packages;
    echo json_encode($message);

}
