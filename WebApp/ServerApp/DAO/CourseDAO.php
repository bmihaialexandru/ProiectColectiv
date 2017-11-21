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
        $sql = 'SELECT * FROM course WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id,]);
        $course = $stmt->fetch();
        return $course;
    }

    public function get_all_courses()
    {
        $sql = 'SELECT * FROM course';
        $stmt=$this->db->prepare($sql);
        $stmt->execute();
        $course = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $course;
    }

    public function update_course($id, $name, $description)
    {
        $sql = 'UPDATE course set `name` = ?, description = ? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$name, $description, $id]);
    }

    public function delete_course($id)
    {
        $sql = 'DELETE from course where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }

    public function add_course($name, $description)
    {
        $sql = 'INSERT INTO course(`name`, description) VALUES(?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$name, $description]);
    }

}