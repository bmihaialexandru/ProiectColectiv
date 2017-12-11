<?php

require_once('UserController.php');
require_once('CourseController.php');
require_once('TrainerController.php');
require_once('ScheduleEntryController.php');
require_once('SubscribtionController.php');
require_once('FeedbackController.php');
require_once('RoomController.php');
require_once('FeedbackTrainersController.php');
// add all controllers here, include only one controller
class Controller {
	public $uctrl;
	public $cctrl;
	public $tctrl;
	public $sctrl;
	public $fctrl;
	public $rctrl;
	public $ftctrl;
	function __construct() {
		$this->uctrl = new UserController();
		$this->cctrl = new CourseController();
		$this->tctrl = new TrainerController();
		$this->sctrl = new ScheduleEntryController();
        $this->fctrl = new FeedbackController();
		$this->subctrl = new SubscribtionController();
		$this->rctrl = new RoomController();
		$this->ftctrl = new FeedbackTrainersController();
	}
}

?>