<?php

require_once('..\DAO\UserDAO.php');

class UserController
{
    private $userDAO;

    public function __construct()
    {
        $this->userDAO = new UserDAO();
    }

    public function get_user_with_password($name, $password)
    {
		$password_hash = hash('ripemd160', $password);
        return $this->userDAO->checkuser($name, $password_hash);
    }

	public function add_new_user($name, $password, $phone, $email)
	{
		$password_hash = hash('ripemd160', $password);
		if(count($this->userDAO->get_user_by_name($name)) != 0)
		{
			return 1;
		}
		return $this->userDAO->adduser($name, $password_hash, $phone, $email);
	}

	public function change_password_for_user($name, $old, $new)
	{

		$old_hash = hash('ripemd160', $old);
		$new_hash = hash('ripemd160', $new);
		$users = $this->userDAO->get_user_by_name($name);
		if(count($users) != 1)
		{
			return 1;
		}
		$user = $users[0];

		if($user['passwordhash'] != $old_hash)
		{
			return 1;
		}
		$this->userDAO->update_password($user['id'], $new_hash);
		return 0;

	}

	public function is_password_changed($name)
	{
		$users = $this->userDAO->get_user_by_name($name);
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

	public function get_user_by_name($name)
    {
        $users = $this->userDAO->get_user_by_name($name);
        if(count($users) != 1)
        {
            return null;
        }
        return $users[0];
    }

}
?>