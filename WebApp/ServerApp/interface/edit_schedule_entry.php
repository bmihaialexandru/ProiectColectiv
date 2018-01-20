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
    $id = $_POST['id'];
    $day=$_POST['day'];
    $hour_start=$_POST['hour_start'];
    $hour_finish=$_POST['hour_finish'];
    $id_course=$_POST['id_course'];
    $id_trainer=$_POST['id_trainer'];
    $id_training_room=$_POST['id_training_room'];

    $security_token = $_POST['token'];
    $jwt_service = new JWTService();
    $token_ok = true;

    try
    {
        $current_role = $jwt_service->validateToken($security_token)["role"];
        if($current_role != "1")
        {
            throw new Exception("What are you doing here?????");
        }
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
        if(!empty($id) and !empty($day) and !empty($hour_start) and !empty($hour_finish)
            and !empty($id_course) and !empty($id_trainer) and !empty($id_training_room))
        {

            $not_ok = False;

            $dt = new DateTime($day);

            $entries=$ctrl->sctrl->get_schedule_entry_by_day($dt->format("Y-m-d"));
            $index = -1;
            for($i=0; $i<count($entries); $i++)
            {
                if($entries[$i]['id'] == $id)
                {
                    $index = $i;
                    break;
                }
            }
            /*if($index == -1)
            {
                $message->answer = "Error";
                $message->reason = "Updating a non-existend schedule entry";
                echo json_encode($message);
            }
            else {*/
                if($index != -1)
                        array_splice($entries, $index, 1);
                foreach ($entries as $entry) {
                    if (($id_trainer == $entry['id_trainer'] or $id_training_room == $entry['id_training_room']) and
                        (($entry['hour_start'] <= $hour_start and $entry['hour_finish'] > $hour_start)
                            or ($entry['hour_start'] < $hour_finish and $entry['hour_finish'] >= $hour_finish))) {
                        $message->answer = "Error";
                        $message->reason = "Schedule entry already exists on date " . $dt->format("Y-m-d");
                        echo json_encode($message);
                        $not_ok = True;
                        break;
                    }
                }


                if (!$not_ok) {
                    $ctrl->sctrl->update_schedule_entry($id, $day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room);

                    $message->answer = "Success";
                    echo json_encode($message);
                }
            //}
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