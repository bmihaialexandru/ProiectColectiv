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
    $should_decrement = false;
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
                if($package['id_course'] == $entry['id_course'] && $package['nr_courses'] > 0 && strtotime($package['due_date']) >= strtotime(date("Y-m-d")))
                {
                    $should_decrement = true;
                    $package_id = $package['id'];
                    break;
                }
            }

            if(!$should_decrement)
            {
                $message->answer = "Error";
                $message->reason = "This course is not included in your paid packages. You should buy a package which includes this course.";
                echo json_encode($message);
                exit(0);
            }

            $res=$ctrl->subctrl->add_subscribtion($user["id"], $sc_entry);
            if($res == 0)
            {
                if($should_decrement) {
                    $ctrl->pctrl->decrement_subscribtion_for_user($package_id);
                    $message->answer = "Success";
                    echo json_encode($message);
                }
            }
            else if($res == 1)
            {
                $message->answer = "Error";
                $message->reason = "Already subscribed to this entry!";
                echo json_encode($message);
            }
            else if($res == 2)
            {
                $message->answer = "Error";
                $message->reason = "Maximum capacity for this schedule reached!";
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