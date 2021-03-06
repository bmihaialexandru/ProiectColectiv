<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:14 PM
 */
require_once('../DAO/TrainerDAO.php');

class TrainerController
{
    private $db;

    public function __construct()
    {
        $this->db = new TrainerDAO();
    }

    public function addTrainer($name, $urlPhoto, $description)
    {
        $this->db->addTrainerDAO($name, $urlPhoto, $description);
    }

    public function editTrainer($id, $newName, $newUrlPhoto, $description)
    {
        $this->db->editTrainerDAO($id,$newName,$newUrlPhoto, $description);
    }

    public function deleteTrainer($id)
    {
        $this->db->deleteTrainerDAO($id);
    }   

    public function getAllTrainers()
    {
        return $this->db->getAllTrainersDAO();
    }

    public function getTrainer($id)
    {
        return $this->db->getTrainerDAO($id);
    }
}