<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/12/2017
 * Time: 5:15 PM
 */

require_once ("../DAO/PackageDAO.php");
class PackageController
{

    private $dao;
    public function __construct()
    {
        $this->dao = new PackageDAO();
    }

    public function add_new_package($name, $description, $pricing, $days)
    {
        $this->dao->add_new_package($name, $description, $pricing, $days);
    }

    public function delete_package($id)
    {
        $this->dao->delete_package($id);
    }

    public function get_packages()
    {
        return $this->dao->get_packages();
    }

    public function get_unpaid_packages($user_id)
    {
        return $this->dao->get_unpaid_packages($user_id);
    }

    public function get_paid_packages($user_id) {
        return $this->dao->get_paid_packages($user_id);
    }

    public function get_new_package($user_id, $package_id) {
        $this->dao->get_new_package($user_id, $package_id);
    }

    public function make_payment($user_id, $package_id) {
        $this->dao->make_payment_delete_unpaid($user_id, $package_id);
        $this->dao->make_payment_do_paid($user_id, $package_id);

    }


}