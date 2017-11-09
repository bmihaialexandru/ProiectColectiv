<?php

include('credentials.php');

class DBUtils {
	
	public $pdo;
	private $error;
	private $cred;
	private $host;
	private $db;
	private $user;
	private $pass;
	private $charset;
	
	public function __construct () {
		$this->cred =new Credentials();
        $this->host = $this->cred->host;
        $this->db = $this->cred->db;
        $this->user = $this->cred->user;
        $this->pass = $this->cred->pass;
        $this->charset = $this->cred->charset;
		$dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
		$opt = array(PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false);
		$this->pdo = new PDO($dsn, $this->user, $this->pass, $opt);
	}

	public function checkuser($username,$password){
		$sql = 'SELECT * FROM users WHERE name = ? AND passwordhash=?';
		$stmt=$this->pdo->prepare($sql);
		$stmt->execute([$username,$password]);
		$user = $stmt->fetch();
		if($user)
		{
			return $user;
		}
		return false;
	}
}
?>