<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/8/2017
 * Time: 12:32 PM
 */

require_once ("../DAO/SubscribtionsDAO.php");

class SubscribtionController
{
    private $dao;

    public function __construct()
    {
        $this->dao = new SubscribtionsDAO();
    }

    public function add_subscribtion($id_user, $id_schentry)
    {
        if($this->dao->get_subscribtion($id_user, $id_schentry) != null)
        {
            return 1;
        }
        $this->dao->add_new_subscribtion($id_user, $id_schentry);
        return 0;
    }

    public function delete_subscribtion($id_user, $id_schentry)
    {
        $this->dao->delete_subscribtion($id_user, $id_schentry);
    }

    public function get_all_subscribtion($id_user)
    {
        return $this->dao->get_all_subscribtions($id_user);
    }

}