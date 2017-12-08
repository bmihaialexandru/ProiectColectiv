<?php

require_once("../DAO/CourseDAO.php");

class CourseController
{
    private $db;

    public function __construct()
    {
        $this->db = new CourseDAO();
    }

    public function add_new_course($name, $url_photo, $description)
    {
        $this->db->add_course($name, $url_photo, $description);
    }

    public function update_course($id, $name, $url_photo, $description)
    {
        $this->db->update_course($id, $name, $url_photo, $description);
    }

    public function get_course($id)
    {
        return $this->db->get_course($id);
    }

    public function get_all_courses()
    {
        return $this->db->get_all_courses();
    }

    public function delete_course($id)
    {
        $this->db->delete_course($id);
    }
}
?>