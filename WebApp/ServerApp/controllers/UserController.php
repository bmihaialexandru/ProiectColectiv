<?php

include('..\db\db_manager.php');

class UserController {
	private $db;
	public function __construct() {
		$db = new DBUtils();
	}
	
	public function get_user_with_password($name, $password_hash) {
		
	}
?>