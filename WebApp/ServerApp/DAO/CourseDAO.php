<?php

require_once("../db/db_manager.php");
class CourseDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function get_course($id)
    {
        $sql = 'SELECT course.*, count(feedback.course_id) as number_of_feedbacks
        FROM course 
        LEFT JOIN feedback ON(course.id = feedback.course_id)
        WHERE course.id = ?
        GROUP BY course.id';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id,]);
        $course = $stmt->fetch();
        return $course;
    }

    public function get_all_courses()
    {
        $sql = 'SELECT course.*, count(feedback.course_id) as number_of_feedbacks
        FROM course 
        LEFT JOIN feedback ON(course.id = feedback.course_id)
        GROUP BY course.id';
        $stmt=$this->db->prepare($sql);
        $stmt->execute();
        $course = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $course;
    }

    public function update_course($id, $name, $url_photo, $description)
    {
        $sql = 'UPDATE course set `name` = ?, description = ?, url_photo = ? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$name, $description, $url_photo, $id]);
    }

    public function delete_course($id)
    {
        $sql = 'DELETE from course where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }

    public function add_course($name, $url_photo, $description)
    {
        $sql = 'INSERT INTO course(`name`, description, url_photo) VALUES(?,?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$name, $description, $url_photo]);
    }

}