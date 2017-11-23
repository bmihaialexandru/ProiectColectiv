<?php

require_once('UserController.php');
require_once('CourseController.php');
require_once('TrainerController.php');

// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	public $cctrl;
	public $tctrl;
	
	function __construct() {
		$this->uctrl = new UserController();
		$this->cctrl = new CourseController();
		$this->tctrl = new TrainerController();
	}
}

?>