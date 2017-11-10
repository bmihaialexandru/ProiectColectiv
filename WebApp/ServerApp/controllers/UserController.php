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
		if(count($this->db->get_user_by_name($name)) != 0)
		{
			return 1;
		}
		return $this->db->adduser($name, $password_hash, $phone, $email);
	}
	
	public function change_password_for_user($name, $old, $new)
	{
		
		$old_hash = hash('ripemd160', $old);
		$new_hash = hash('ripemd160', $new);
		$users = $this->db->get_user_by_name($name);
		if(count($users) != 1)
		{
			return 1;
		}
		$user = $users[0];
		
		if($user['passwordhash'] != $old_hash)
		{
			return 1;
		}
		$this->db->update_password($user['id'], $new_hash);
		return 0;
		
	}
	
	public function is_password_changed($name)
	{
		$users = $this->db->get_user_by_name($name);
		if(count($users) != 1)
		{
			return 2;
		}
		$user = $users[0];
		
		if($user['pass_changed'] == 1)
		{
			return 1;
		}
		return 0;
	}
	
	// TODO: really validate token, for now it will return TRUE for any user
	public function validate_token($token, $username, $section)
	{
		return true;
	}
	
}
?>