<?php

require_once('UserController.php');
require_once('CourseController.php');
require_once('TrainerController.php');
require_once('ScheduleEntryController.php');


// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	public $cctrl;
	public $tctrl;
	public $sctrl;
	
	function __construct() {
		$this->uctrl = new UserController();
		$this->cctrl = new CourseController();
		$this->tctrl = new TrainerController();
		$this->sctrl = new ScheduleEntryController();
	}
}

?>