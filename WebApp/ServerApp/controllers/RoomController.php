<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 5:24 PM
 */
require_once("../DAO/TrainingRoomDAO.php");
class RoomController
{
    private $db;

    public function __construct()
    {
        $this->db = new TrainingRoomDAO();
    }

    public function AddRoom($name,$max_capacity)
    {
        if($this->db->GetRoomByName($name)!= null)
        {
            return 1;
        }
        $this->db->AddRoom($name,$max_capacity);
        return 0;
    }

    public function GetRooms()
    {
        return $this->db->GetAllRooms();
    }
}