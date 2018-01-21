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
include("./headers.php");

if($_SERVER["REQUEST_METHOD"] != "POST")
{
    $message->answer = "Error";
    echo json_encode($message);
}
else{
    $ctrl = new Controller();
    $tokenService = new JWTService();
    $name = $_POST["package_name"];
    $description = $_POST["package_description"];
    $pricing = $_POST["pricing"];
    $days = $_POST["days"];
    $courses = $_POST['courses'];

    $token = $_POST["token"];
    $token_ok = true;
    $data = null;

    try
    {
        $data = $tokenService->validateToken($token);
        $user = $ctrl->uctrl->get_user_by_name($data['name']);
        if($user["user_type"] != $data["role"])
        {
            throw new Exception("Mismatch user role");
        }
        if($user["user_type"] != 1)
        {
            throw new Exception("User role not administrator!");
        }
    }
    catch(Exception $e)
    {
        $token_ok = false;
    }

    if($token_ok == false)
    {
        $message->answer = "Error";
        $message->reason = "Invalid token given";
        echo json_encode($message);
    }
    else
    {
        if(empty($name) or empty($description) or empty($pricing) or empty($days) or empty($courses))
        {
            $message->answer = "Error";
            $message->reason = "Empty fields...";
            echo json_encode($message);
            exit(0);
        }

        if($ctrl->pctrl->get_package_by_name($name) != null)
        {
            $message->answer = "Error";
            $message->reason = "Can't have packages with the same name!";
            echo json_encode($message);
            exit(0);
        }

        try {
            $ctrl->pctrl->add_new_package($name, $description, $pricing, $days);

            $id = $ctrl->pctrl->get_package_by_name($name)['id'];

            for ($i = 0; $i < count($courses); $i++) {
                $course = json_decode($courses[$i], true);
                $ctrl->pctrl->add_package_course($id, $course['id'], $course['number']);
            }

            $message->answer = "Success";
            echo json_encode($message);
        }
        catch(Exception $e)
        {
            $pckg = $ctrl->pctrl->get_package_by_name($name);
            if($pckg != null) {
                $ctrl->pctrl->delete_package($pckg['id']);
            }
            $message->answer = "Error";
            $message->reason = "The data you have given is incorrect. Problems which may occur are: you haven't given any courses, or you have given the same course twice.";
            echo json_encode($message);
        }
    }

}
