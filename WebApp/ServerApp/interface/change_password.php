<?php
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
	$jwt_serv = new JWTService();
	$new_password = $_POST['new_password'];
	$old_password = $_POST['old_password'];
	$security_token = $_POST['token'];
    $token_ok = true;
	try {
        $username = $jwt_serv->validateToken($security_token)["name"];

    } catch(Exception $e)
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
		if(!empty($username) and !empty($old_password) and !empty($new_password))
		{
		
			$res=$ctrl->uctrl->change_password_for_user($username, $old_password, $new_password);
			if($res == 0) 
			{
				$message->answer = "Success";
				echo json_encode($message);
			}
			else 
			{
				$message->answer = "Error";
				$message->reason = "Mismatch between old password given and real old password";
				echo json_encode($message);
			}
		}
		else
		{
			$message->answer = "Error";
			$message->reason = "New password and old password must not be empty!";
			echo json_encode($message);
		}
	}
}
?>