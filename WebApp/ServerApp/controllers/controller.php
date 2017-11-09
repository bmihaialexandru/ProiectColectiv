<?php

include('UserController.php');

// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	
	function __construct() {
		$this->uctrl = new UserController();
	}
}

?>