<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 3:59 PM
 */
require_once("../db/db_manager.php");
class FeedbackDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function GiveFeedback($stars,$message,$user_id,$course_id){
        $sql = 'INSERT INTO feedback(stars,message,user_id,course_id) VALUES(?,?,?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$stars, $message, $user_id, $course_id]);
    }

    public function GetFeedbacksForCourse($id)
    {
        $sql = 'SELECT * from feedback WHERE course_id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $feedback = $stmt->fetchAll();
        return $feedback;
    }
}