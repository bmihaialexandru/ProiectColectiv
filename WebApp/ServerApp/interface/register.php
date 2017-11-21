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
	$username = $_POST['username'];
	$password = $_POST['password'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
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
	// we need to be sure that this token has admin rights before other changes are made.
	//if(!$ctrl->uctrl->validate_token($security_token, $username, "register"))
	//{
	//	$message->answer = "Error";
	//	echo json_encode($message);
	//}

    if($token_ok == false)
    {
        $message->answer = "UNAUTHORIZED!!!";
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
				$message->reason = "User with this name already in DB";
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