<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:14 PM
 */
include('..\DAO\TrainerDAO.php');
class TrainerController
{
    private $db;

    public function __construct()
    {
        $this->db = new TrainerDAO();
    }

    public function addTrainer($name, $urlPhoto)
    {
            $this->db->addTrainerDAO($name, $urlPhoto);
    }

    public function editTrainer($id, $newName, $newUrlPhoto)
    {
        $this->db->getTrainerDAO($id);
        $this->db->editTrainerDAO($id,$newName,$newUrlPhoto);
    }

    public function deleteTrainer($id)
    {
        $this->db->getTrainerDAO($id);
        $this->db->deleteTrainerDAO($id);
    }   

    public function getAllTrainers()
    {
        $this->db->getAllTrainersDAO();
    }    
}