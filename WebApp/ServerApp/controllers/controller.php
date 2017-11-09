<?php

include('UserController.php');

// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	
	public function __construct() {
		$uctrl = new UserController();
	}
}

?>