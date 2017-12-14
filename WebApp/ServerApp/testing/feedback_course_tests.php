<?php

require_once ("../controllers/controller.php");

class FeedbackCourseTests {
    public function run_all_tests() {

        $array = [];
        

        $array = array_merge($array, $this->run_get_feedbacks());
        $array = array_merge($array, $this->run_add());
       
        return $array;
    }

    public function run_get_feedbacks() {
        $ctrl = new Controller();
        try {
            $ctrl->fctrl->GetFeedbacks(8888888);

            return array(["name" => "Get all feedbacks unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Get all feedbacks unit test", "result" => "failed"]);
        }
    }

    public function run_add(){
        $ctrl = new Controller();
        try {
            $ctrl->fctrl->AddFeedback(5,"Test",8888888,8888888);

            return array(["name" => "Add a new feedback unit test", "result" => "passed"]);
        }
        catch(Exception $e)
        {
            return array(["name" => "Add a new feedback unit test", "result" => "failed"]);
        }
    }

}