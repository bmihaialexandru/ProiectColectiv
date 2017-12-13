<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/13/2017
 * Time: 6:08 PM
 */

require_once ("../controllers/controller.php");

class CourseTests {
    public function run_all_tests() {

        $array = [];

        $array = array_merge($array, $this->run_get_all());
        // add more tests here as needed

        return $array;
    }

    public function run_get_all() {
        $ctrl = new Controller();
        try {
            $ctrl->cctrl->get_all_courses();

            return array(["name" => "Get all courses unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get all courses unit test", "result" => "failed"]);
        }
    }
}