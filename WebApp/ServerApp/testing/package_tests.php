<?php

require_once ("../controllers/controller.php");

class PackageTests {
    public function run_all_tests() {

        $array = [];
        

        $array = array_merge($array, $this->run_get_all());
        $array = array_merge($array, $this->run_add());
        $array = array_merge($array, $this->run_get_unpaid());
        $array = array_merge($array, $this->run_get_paid());
        $array = array_merge($array, $this->run_get_new_package());
        $array = array_merge($array, $this->run_increment());
        $array = array_merge($array, $this->run_decrement());
        
        return $array;
    }

    public function run_get_all() {
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->get_packages();

            return array(["name" => "Get all packages unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get all packages unit test", "result" => "failed"]);
        }
    }

    public function run_add(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->add_new_package("test","Test",1,1);

            return array(["name" => "Add a new package unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Add a new package unit test", "result" => "failed"]);
        }
    }

    public function run_get_unpaid(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->get_unpaid_packages(8888888);

            return array(["name" => "Get unpaid packages unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get unpaid packages unit test", "result" => "failed"]);
        }  
    }

    public function run_get_paid(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->get_paid_packages(8888888);

            return array(["name" => "Get paid packages unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get paid packages unit test", "result" => "failed"]);
        }   
    }

    public function run_get_new_package(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->get_new_package(8888888, 8888888);

            return array(["name" => "Get a new package unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get a new package unit test", "result" => "failed"]);
        }   
    } 
    public function run_increment(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->increment_subscribtion_for_user(8888888);

            return array(["name" => "Increment subscribtion unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Increment subscribtion unit test", "result" => "failed"]);
        }   
    }
    public function run_decrement(){
        $ctrl = new Controller();
        try {
            $ctrl->pctrl->decrement_subscribtion_for_user(8888888);

            return array(["name" => "Decrement subscribtion unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Decrement subscribtion unit test", "result" => "failed"]);
        }   
    }

}