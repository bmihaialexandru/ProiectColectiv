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
        $array = array_merge($array, $this->run_add());
        $array = array_merge($array, $this->run_get());
        $array = array_merge($array, $this->run_update());

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

    public function run_add(){
        $ctrl = new Controller();
        try {
            $ctrl->cctrl->add_new_course("Test","Test","Test");

            return array(["name" => "Add a new course unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Add a new course unit test", "result" => "failed"]);
        }
    }

    public function run_get(){
        $ctrl = new Controller();
        try {
            $ctrl->cctrl->get_course(8888888);

            return array(["name" => "Get a course unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get a course unit test", "result" => "failed"]);
        }
    }

    public function run_update(){
        $ctrl = new Controller();
        try {
            $ctrl->cctrl->update_course(8888888, "TestUpdate","testupdate","testupdate");

            return array(["name" => "Update a course unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Update a course unit test", "result" => "failed"]);
        }
    }

}