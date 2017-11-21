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

    public function getTrainer($id)
    {
        $sql = 'SELECT * FROM trainer WHERE id = ?';
        $stmt=$this->db->prepabre($sql);
        $stmt->execute([$id,]);
        $trainer = $stmt->fetch();
        if($trainer)
        {
            return $trainer;
        }
        return false;
    }

    public function editTrainer($id, $newName, $newUrlPhoto)
    {
        $sql = 'UPDATE trainer set name = ?, url_photo = ? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$newName,$newUrlPhoto,$id]);
    }

    public function deleteTrainer($id)
    {
        $sql = 'DELETE from trainer where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }
}