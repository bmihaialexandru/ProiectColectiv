<?php
include("..\controllers\controller.php");


if(!$_SERVER["REQUEST_METHOD"] != "POST")
{
   echo "error";
}
else{
$ctrl = new Controller();
$username = $_POST['username'];
$password = $_POST['password'];
echo $username;
echo $password;
 //Input validations
if(!empty($username) and !empty($password))
{
	$res=$ctrl->uctrl->checkuser($username,$password);
    if($res != false) {
        echo "succcess";
    }
    else {
        echo "error";
    }
}
}
?>