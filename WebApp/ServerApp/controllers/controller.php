<?php

require_once('UserController.php');
require_once('CourseController.php');

// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	public $cctrl;
	
	function __construct() {
		$this->uctrl = new UserController();
		$this->cctrl = new CourseController();
	}
}

?>