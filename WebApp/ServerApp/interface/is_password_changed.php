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