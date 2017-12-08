<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 4:02 PM
 */
require_once("../DAO/FeedbackDAO.php");
class FeedbackController
{
    private $feedbackDb;
    private $courseDb;

    public function __construct()
    {
        $this->feedbackDb = new FeedbackDAO();
        $this->courseDb = new CourseDAO();
    }

    public function AddFeedback($stars,$message,$user_id,$course_id){
        if($this->courseDb->get_course($course_id) == null){
            return 1;
        }
        $this->feedbackDb->GiveFeedback($stars,$message,$user_id,$course_id);
        return 0;
    }

    public function GetFeedbacks($id)
    {
        if($this->courseDb->get_course($id) == null){
            return 1;
        }
        return $this->feedbackDb->GetFeedbacksForCourse($id);
    }
}