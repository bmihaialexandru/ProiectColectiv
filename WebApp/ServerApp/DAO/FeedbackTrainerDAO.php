<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/10/2017
 * Time: 9:27 AM
 */

class FeedbackTrainerDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function GiveFeedback($stars,$message,$user_id,$trainer_id){
        $sql = 'INSERT INTO feedback_trainer(stars,message,id_user,id_trainer) VALUES(?,?,?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$stars, $message, $user_id, $trainer_id]);
    }

    public function GetFeedbacksForTrainer($id)
    {
        $sql = 'SELECT feedback_trainer.*, `user`.name as username from feedback_trainer inner join `user` on feedback_trainer.id_user = `user`.id WHERE id_trainer = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $feedback = $stmt->fetchAll();
        return $feedback;
    }

    public function GetFeedbackById($id)
    {
        $sql = 'SELECT * from feedback_trainer where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $feedback = $stmt->fetchAll();
        return $feedback;
    }

    public function DeleteFeedback($id)
    {
        $sql = 'DELETE FROM feedback_trainer where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
    }
}