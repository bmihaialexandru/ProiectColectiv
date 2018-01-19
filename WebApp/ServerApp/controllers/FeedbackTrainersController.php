<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/10/2017
 * Time: 9:38 AM
 */
require_once('..\DAO\FeedbackTrainerDAO.php');
class FeedbackTrainersController
{
    private $feedbackDb;
    private $trainerDb;

    public function __construct()
    {
        $this->feedbackDb = new FeedbackTrainerDAO();
        $this->trainerDb = new TrainerDAO();
    }

    public function AddFeedback($stars,$message,$user_id,$trainer_id){
        if($stars < 0 || $stars > 5){
            return 1;
        }
        if($this->trainerDb->getTrainerById($trainer_id) == null){
            return 2;
        }
        $this->feedbackDb->GiveFeedback($stars,$message,$user_id,$trainer_id);
        return 0;
    }

    public function DeleteFeedback($id)
    {
        if($this->feedbackDb->GetFeedbackById($id) == null){
            return 1;
        }
        $this->feedbackDb->DeleteFeedback($id);
        return 0;
    }

    public function GetFeedbacks($id)
    {
        if($this->trainerDb->getTrainerById($id) == null){
            return 1;
        }

        return $this->feedbackDb->GetFeedbacksForTrainer($id);
    }
	
	  public function get_all_trainers_feedback()
    {
        return $this->feedbackDb->GetAllFeedbacks();
    }
}