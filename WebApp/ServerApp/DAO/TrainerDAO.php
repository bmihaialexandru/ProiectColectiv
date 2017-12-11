<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:31 PM
 */

require_once("../db/db_manager.php");

class TrainerDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function addTrainerDAO($name, $urlPhoto, $description)
    {
        $sql = 'INSERT INTO trainer (`name`, url_photo, description) VALUES (?, ?, ?)';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$name,$urlPhoto, $description]);
    }

    public function getTrainerDAO($id)
    {
        $sql = 'SELECT trainer.*, count(feedback_trainer.id_trainer) as number_of_feedbacks
        FROM trainer 
        LEFT JOIN feedback_trainer ON(trainer.id = feedback_trainer.id_trainer)
        WHERE trainer.id = ?
        GROUP BY trainer.id';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id,]);
        $trainer = $stmt->fetch();
        return $trainer;
    }

    public function getTrainerById($id){
        $sql = 'SELECT * from trainer where id =?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function getAllTrainersDAO()
    {
        $sql = 'SELECT trainer.*, count(feedback_trainer.id_trainer) as number_of_feedbacks
        FROM trainer 
        LEFT JOIN feedback_trainer ON(trainer.id = feedback_trainer.id_trainer)
        GROUP BY trainer.id';
        $stmt=$this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function editTrainerDAO($id, $newName, $newUrlPhoto, $description)
    {
        $sql = 'UPDATE trainer set `name` = ?, url_photo = ?, description = ? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$newName, $newUrlPhoto, $description, $id]);
    }

    public function deleteTrainerDAO($id)
    {
        $sql = 'DELETE from trainer where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }
}