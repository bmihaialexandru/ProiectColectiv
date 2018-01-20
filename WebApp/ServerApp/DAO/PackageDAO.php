<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/12/2017
 * Time: 5:15 PM
 */
require_once("../db/db_manager.php");
class PackageDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function add_new_package($name, $description, $pricing, $days) {
        $sql = "INSERT INTO subscribtion_package(package_name, description, pricing, days) VALUES(?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$name, $description, $pricing, $days]);
    }

    public function add_package_course($package_id, $course_id, $nr_courses) {
        $sql = "INSERT INTO package_course(id_package, id_course, number_subscribtions) VALUES(?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id, $course_id, $nr_courses]);
    }

    public function get_package_by_name($name)
    {
        $sql = "SELECT * FROM subscribtion_package WHERE `package_name` = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$name]);
        return $stmt->fetch();
    }

    public function delete_package($id) {
        $sql = "DELETE FROM subscribtion_package WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
    }

    public function get_course_packages($p_id) {
        $sql = "SELECT package_course.*, course.name FROM package_course  INNER JOIN course on package_course.id_course = course.id WHERE id_package = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$p_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_packages() {
        $sql = "SELECT subscribtion_package.* FROM subscribtion_package";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_unpaid_packages($user_id) {
        $sql = "SELECT unpaid_subscribtions.*, subscribtion_package.package_name, subscribtion_package.pricing, subscribtion_package.days, subscribtion_package.description FROM unpaid_subscribtions INNER JOIN subscribtion_package ON unpaid_subscribtions.id_package = subscribtion_package.id WHERE id_user = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_new_package($user_id, $package_id) {
        $sql = "INSERT INTO unpaid_subscribtions(id_user, id_package) VALUES(?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$user_id, $package_id]);
    }

    public function get_paid_packages($user_id) {
        $sql = "SELECT paid_subscribtions.*, course.name, subscribtion_package.package_name, subscribtion_package.pricing, subscribtion_package.description FROM paid_subscribtions INNER JOIN subscribtion_package on paid_subscribtions.id_package = subscribtion_package.id INNER JOIN course on paid_subscribtions.id_course = course.id WHERE id_user = ? ";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function make_payment_delete_unpaid($package_id) {
        $sql = "DELETE FROM unpaid_subscribtions WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id]);
    }

    public function make_payment_do_paid($user_id, $package_id, $uid) {
        $sql = "SELECT * FROM subscribtion_package WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id]);

        $days = $stmt->fetch()['days'];

        $sql = "SELECT * FROM package_course WHERE id_package = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $due_date = date("Y-m-d", strtotime(date("Y-m-d") . " +". $days . "days"));

        foreach($result as $course) {
            $sql = "INSERT INTO paid_subscribtions(id_package, id_user, id_course, nr_courses, due_date) VALUES(?, ?, ?, ?, ?)";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$package_id, $user_id, $course['id_course'], $course['number_subscribtions'], $due_date]);
        }
    }

    public function decrement_subscribtion_for_user($package_id) {
        $sql = "UPDATE paid_subscribtions SET nr_courses = nr_courses - 1 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id]);
    }

    public function increment_subscribtion_for_user($package_id) {
        $sql = "UPDATE paid_subscribtions SET nr_courses = nr_courses + 1 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$package_id]);
    }
}