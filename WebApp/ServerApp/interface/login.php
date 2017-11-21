<?php
error_reporting(E_ERROR | E_PARSE);
include("..\controllers\controller.php");
if($_SERVER["REQUEST_METHOD"] != "POST")
{
   echo "error";
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
			$token = $tokenService->createToken($res["role"], $username);
			echo json_encode(new LoginSuccess($res["role"], $token));
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
?>