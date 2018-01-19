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
	$tokenService = new JWTService();
	$username = $_POST['username'];
	$password = $_POST['password'];
	 //Input validations
	if(!empty($username) and !empty($password))
	{
		$res=$ctrl->uctrl->get_user_with_password($username, $password);
		if($res != false) 
		{
			$token = $tokenService->createToken($res["user_type"], $username);
            $message->answer = "Success";
            $message->token = $token;
            echo json_encode($message);
		}
		else 
		{
			$message->answer = "Error";
			$message->reason = "Invalid username or password";
			echo json_encode($message);
		}
	}
	else
	{
		$message->answer = "Error";
		$message->reason = "Username and password must not be blank!";
		echo json_encode($message);
	}
}

?>