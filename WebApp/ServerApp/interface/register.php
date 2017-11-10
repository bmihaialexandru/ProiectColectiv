<?php
error_reporting(E_ERROR | E_PARSE);
include("..\controllers\controller.php");
if($_SERVER["REQUEST_METHOD"] != "POST")
{
   $message->answer = "Error";
   echo json_encode($message);
}
	else{
	$ctrl = new Controller();
	$username = $_POST['username'];
	$password = $_POST['password'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$security_token = $_POST['token'];
	
	// we need to be sure that this token has admin rights before other changes are made.
	if(!$ctrl->uctrl->validate_token($security_token, $username, "register"))
	{
		$message->answer = "Error";
		echo json_encode($message);
	}
	else
	{
		
		 //TODO: validate email and phone number
		if(!empty($username) and !empty($password) and !empty($phone) and !empty($email))
		{
		
			$res=$ctrl->uctrl->add_new_user($username, $password, $phone, $email);
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