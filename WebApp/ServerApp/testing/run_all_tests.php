<?php
/**
 * Created by PhpStorm.
 * User: nbodea
 * Date: 12/13/2017
 * Time: 6:08 PM
 */

require_once ("course_tests.php");
include("../interface/headers.php");
// add more files here as needed

$results = array();

$cTest = new CourseTests();
$results = (array)array_merge((array)$results, (array)$cTest->run_all_tests());

echo json_encode($results);