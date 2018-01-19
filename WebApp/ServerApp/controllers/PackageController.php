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

    public function get_package_by_name($name)
    {
        return $this->dao->get_package_by_name($name);
    }

    public function get_packages()
    {
        return $this->dao->get_packages();
    }

    public function get_course_packages($p_id) {
        return $this->dao->get_course_packages($p_id);
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

    public function add_package_course($package_id, $course_id, $nr_courses) {

        $this->dao->add_package_course($package_id, $course_id, $nr_courses);
    }

    public function make_payment($user_id, $package_id, $uid) {
        $this->dao->make_payment_delete_unpaid($uid);
        $this->dao->make_payment_do_paid($user_id, $package_id, $uid);

    }


    public function decrement_subscribtion_for_user($package_id) {
        $this->dao->decrement_subscribtion_for_user($package_id);
    }


    public function increment_subscribtion_for_user($package_id) {
        $this->dao->increment_subscribtion_for_user($package_id);
    }
}