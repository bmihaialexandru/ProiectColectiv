<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:14 PM
 */

class TrainerController
{
    private $db;

    public function __construct()
    {
        $this->db = new DBUtils();
    }

    public function editTrainer($id, $newName, $newPassword)
    {
        $this->db->getTrainer($id);
        $this->db->editTrainer($id,$newName,$newPassword);
    }

    public function deleteTrainer($id)
    {
        $this->db->getTrainer($id);
        $this->db->deleteTrainer($id);
    }
}