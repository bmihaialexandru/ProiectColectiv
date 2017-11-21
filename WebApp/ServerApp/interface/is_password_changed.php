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
	$jwt_service = new JWTService();
	//$username = $_POST['username'];
	$security_token = $_POST['token'];
	$token_ok = true;

	try
    {
        $username = $jwt_service->validateToken($security_token)["name"];
    }
    catch(Exception $e)
    {
        $token_ok = false;
    }

	if($token_ok == false)
	{
		$message->answer = "Error";
		echo json_encode($message);
	}
	else
	{
		
		 //TODO: validate email and phone number
		if(!empty($username))
		{
		
			$res=$ctrl->uctrl->is_password_changed($username, $old_password, $new_password);
			if($res == 0) 
			{
				$message->answer = "False";
				echo json_encode($message);
			}
			else if($res == 1)
			{
				$message->answer = "True";
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