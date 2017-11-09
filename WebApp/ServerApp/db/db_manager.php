<?php

include('credentials.php');

class DBUtils {
	
	public $pdo;
	private $error;
	private $cred = new Credentials();
	private $host = $cred->host;
	private $db = $cred->db;
	private $user = $cred->user;
	private $pass = $cred->pass;
	private $charset = $cred->charset;
	
	public function __construct () {
		
		$dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
		$opt = array(PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false);
		$this->pdo = new PDO($dsn, $this->user, $this->pass, $opt);
	}
}

?>