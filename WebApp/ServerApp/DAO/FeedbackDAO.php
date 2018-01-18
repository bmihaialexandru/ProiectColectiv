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
        $sql = 'SELECT feedback.*, `user`.name as username from feedback inner join `user` on feedback.user_id = `user`.id WHERE course_id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $feedback = $stmt->fetchAll();
        return $feedback;
    }

    public function GetFeedbackById($id)
    {
        $sql = 'SELECT * from feedback where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $feedback = $stmt->fetchAll();
        return $feedback;
    }

    public function DeleteFeedback($id)
    {
        $sql = 'DELETE FROM feedback where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
    }
	
	 public function GetAllFeedbacks()
    {
        $sql = 'SELECT feedback.*, `user`.name as username from feedback inner join `user` on feedback.user_id = `user`.id ORDER BY id DESC';
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $feedback = $stmt->fetchAll();
        return $feedback;
    }
}