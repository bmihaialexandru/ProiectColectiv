<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:39 PM
 */

require_once("../db/db_manager.php");

class UserDAO
{
    private $db;

    public function __construct ()
    {
        $this->db = new DBUtils();
    }

    public function checkuser($username,$password){
        $sql = 'SELECT * FROM user WHERE name = ? AND passwordhash=?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$username,$password]);
        $user = $stmt->fetch();
        if($user)
        {
            return $user;
        }
        return false;
    }

    public function adduser($username,$password_hash,$phone,$email) {
        $sql = "INSERT INTO user(name, phone_number, email, passwordhash, user_type) VALUES(?,?,?,?,?);";
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$username, $phone, $email, $password_hash, 0]);
        return 0;
    }

    public function get_user_by_name($username) {
        $sql = "SELECT * FROM user WHERE name = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$username]);
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $user;
    }

    public function deleteUser($id){
        $sql = 'DELETE FROM `user` WHERE id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
    }

    public function getUser($id){
        $sql = 'SELECT * FROM user WHERE id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUsers(){
        $sql = 'SELECT * from user';
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function editUser($id,$newphone,$newemail,$newname,$newpasshash){
        $sql = 'UPDATE user set `name` = ?,phone_number =?,email =?,passwordhash = ? where id = ?';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$newname,$newphone,$newemail,$newpasshash,$id]);
    }

    public function update_password($id, $pass_hash)
    {
        $sql = "UPDATE user SET passwordhash = ?, pass_changed = 1 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$pass_hash, $id]);
        return 0;
    }

}