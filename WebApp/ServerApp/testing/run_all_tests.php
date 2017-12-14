<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/13/2017
 * Time: 6:08 PM
 */

require_once("course_tests.php");
require_once("feedback_course_tests.php");
require_once("feedback_trainer_tests.php");
require_once("package_tests.php");

include("../interface/headers.php");
// add more files here as needed

$results = array();

$cTest = new CourseTests();
$fcTest = new FeedbackCourseTests();
$ftTest = new FeedbackTrainerTests();
$pTest = new PackageTests();

$results = (array)array_merge((array)$results, 
(array)$cTest->run_all_tests(), 
(array)$fcTest->run_all_tests(),
(array)$ftTest->run_all_tests(),
(array)$pTest->run_all_tests());

echo json_encode($results);