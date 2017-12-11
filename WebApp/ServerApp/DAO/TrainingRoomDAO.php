<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 12/8/2017
 * Time: 5:21 PM
 */

class TrainingRoomDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function GetAllRooms()
    {
        $sql = 'SELECT * from training_room';
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $rooms = $stmt->fetchAll();
        return $rooms;
    }

    public function AddRoom($name,$max_capacity)
    {
        $sql = 'INSERT into training_room(max_capacity, `name`) VALUES(?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$max_capacity,$name]);
    }

    public function GetRoomById($id)
    {
        $sql = 'SELECT * from training_room where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $rooms = $stmt->fetchAll();
        return $rooms;
    }

    public function DeleteRoom($id)
    {
        $sql = 'DELETE from training_room where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $rooms = $stmt->fetchAll();
        return $rooms;
    }

    public function GetRoomByName($name)
    {
        $sql = 'SELECT * from training_room where name = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$name]);
        $rooms = $stmt->fetchAll();
        return $rooms;
    }
}