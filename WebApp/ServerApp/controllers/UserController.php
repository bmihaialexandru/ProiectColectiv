<?php

include('..\db\db_manager.php');

class UserController
{
    private $db;

    public function __construct()
    {
        $this->db = new DBUtils();
    }

    public function get_user_with_password($name, $password)
    {
		$password_hash = hash('ripemd160', $password);
        return $this->db->checkuser($name, $password_hash);
    }
	
	public function add_new_user($name, $password, $phone, $email)
	{
		$password_hash = hash('ripemd160', $password);
		return $this->db->adduser($name, $password_hash, $phone, $email);
	}
	
	// TODO: really validate token, for now it will return TRUE for any user
	public function validate_token($token, $section)
	{
		return true;
	}
}
?>