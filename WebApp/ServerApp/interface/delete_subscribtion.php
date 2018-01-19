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
    $should_increment = false;
    $package_id = null;
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

        if(!empty($sc_entry))
        {
            $entry = $ctrl->sctrl->get_schedule_entry($sc_entry);

            $paid = $ctrl->pctrl->get_paid_packages($user["id"]);

            foreach($paid as $package) {
                if($package['id_course'] == $entry['id_course'] && strtotime($package['due_date']) >= strtotime(date("Y-m-d")))
                {
                    $should_increment = true;
                    $package_id = $package['id'];
                    break;
                }
            }

            if(strtotime(date("Y-m-d")) >= strtotime($entry['day']))
            {
                $should_increment = false;
            }

            $ctrl->subctrl->delete_subscribtion($user["id"], $sc_entry);
            $message->answer = "Success";

            if($should_increment)
            {
                $ctrl->pctrl->increment_subscribtion_for_user($package_id);
            }

            echo json_encode($message);

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