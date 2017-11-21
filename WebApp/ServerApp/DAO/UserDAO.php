<?php
/**
 * Created by PhpStorm.
 * User: Titus
 * Date: 11/21/2017
 * Time: 4:39 PM
 */

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
        $user = $stmt->fetchAll(db::FETCH_ASSOC);
        return $user;
    }

    public function update_password($id, $pass_hash)
    {
        $sql = "UPDATE user SET passwordhash = ?, pass_changed = 1 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$pass_hash, $id]);
        return 0;
    }

}