<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/8/2017
 * Time: 12:24 PM
 */

require_once ("../db/db_manager.php");

class SubscribtionsDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function add_new_subscribtion($id_user, $id_sc_entry)
    {
        $sql = "INSERT INTO subscribtion (id_user, id_schentry) VALUES(?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id_user, $id_sc_entry]);
    }

    public function delete_subscribtion($id_user, $id_sc_entry)
    {
        $sql = "DELETE * FROM subscribtion WHERE id_user=? and id_schentry = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id_user, $id_sc_entry]);
    }

    public function get_all_subscribtions($id_user)
    {
        $sql = "SELECT * FROM subscribtion WHERE id_user=?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id_user]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_subscribtion($id_user, $id_schentry)
    {
        $sql = "SELECT * FROM subscribtion WHERE id_user = ? and id_schentry = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id_user, $id_schentry]);
        return $stmt->fetch();
    }
}