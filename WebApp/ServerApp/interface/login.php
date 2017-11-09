<?php
include("..\controllers\controller.php");


if($this->get_request_method() != "POST")
{
$this->response('',406);
}
$ctrl = new Controller();
$username = $this->_request['username'];
$password = $this->_request['ppassword'];

// Input validations
if(!empty($username) and !empty($password))
{
	$res=$ctrl->uctrl->checkuser($username,$password);
    if($res != false) {
        $this->response($this->json($result), 200);
    }
    else {
        $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
        $this->response($this->json($error), 400);
    }
}
?>