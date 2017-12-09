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
    $type=$_POST['type'];
    $start_day=$_POST['start_day'];
    $end_day=$_POST['end_day'];
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
        if(!empty($type) and !empty($start_day) and !empty($end_day) and !empty($hour_start) and !empty($hour_finish)
            and !empty($id_course) and !empty($id_trainer) and !empty($id_training_room))
        {

            $begin = new DateTime( $start_day );
            $end = new DateTime( $end_day );

            $interval = DateInterval::createFromDateString('1 day');
            if($type=="weekly"){
                $interval = DateInterval::createFromDateString('1 week');
            }
            else if($type=="biweekly"){
                $interval = DateInterval::createFromDateString('2 weeks');
            }
            else if($type=="monthly"){
                $interval = DateInterval::createFromDateString('1 month');
            }
            $period = new DatePeriod($begin, $interval, $end);

            foreach ( $period as $dt ) {
                $entries=$ctrl->sctrl->get_schedule_entry_by_day($dt->format("Y-m-d"));
                foreach($entries as $entry){
                    if(($id_trainer==$entry->id_trainer or $id_training_room==$entry->id_training_room) and
                        (($entry->hour_start<=$hour_start and $entry->hour_finish>$hour_start)
                            or ($entry->hour_start<$hour_finish and $entry->hour_finish>=$hour_finish))){
                        $message->answer = "Error";
                        $message->reason = "Schedule entry already exists on date ".$dt->format("Y-m-d");
                        echo json_encode($message);
                        return;
                    }
                }
            }
            foreach ( $period as $dt ) {
                $ctrl->sctrl->add_new_schedule_entry($dt->format("Y-m-d"), $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room);
            }

            $message->answer = "Success";
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