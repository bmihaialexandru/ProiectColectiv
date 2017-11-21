<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:31 PM
 */

class TrainerDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function addTrainerDAO($id, $name, $urlPhoto)
    {
        $sql = 'INSERT INTO trainer (name, url_photo) VALUES (?, ?)';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$name,$urlPhoto]);   
    }

    public function getTrainerDAO($id)
    {
        $sql = 'SELECT * FROM trainer WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id,]);
        $trainer = $stmt->fetch();
        if($trainer)
        {
            return $trainer;
        }
        return false;
    }

    public function getAllTrainersDAO()
    {
        $sql = 'SELECT * FROM trainer';
        $stmt=$this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        if($result)
        {
            return $result;
        }
        return false;
    }

    public function editTrainerDAO($id, $newName, $newUrlPhoto)
    {
        $sql = 'UPDATE trainer set name = ?, url_photo = ? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$newName,$newUrlPhoto,$id]);
    }

    public function deleteTrainerDAO($id)
    {
        $sql = 'DELETE from trainer where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }
}