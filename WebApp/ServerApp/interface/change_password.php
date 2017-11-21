<?php
error_reporting(E_ERROR | E_PARSE);
include("..\controllers\controller.php");
include("..\services\JWTService.php");
if($_SERVER["REQUEST_METHOD"] != "POST")
{
   $message->answer = "Error";
   echo json_encode($message);
}
	else{
	$ctrl = new Controller();
	$jwt_serv = new JWTService();
    //$username = $_POST['username'];
	$new_password = $_POST['new_password'];
	$old_password = $_POST['old_password'];
	$security_token = $_POST['token'];
	
    $username = $jwt_serv->validateToken($security_token)["username"];
	
	else
	{
		
		 //TODO: validate email and phone number
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
				echo json_encode($message);
			}
		}
		else
		{
			$message->answer = "Error";
			echo json_encode($message);
		}
	}
}
?>