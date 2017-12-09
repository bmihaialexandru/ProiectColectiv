<?php
/**
 * Created by PhpStorm.
 * User: mihai
 * Date: 11/23/2017
 * Time: 9:39 PM
 */

require_once("../DAO/ScheduleEntryDAO.php");

class ScheduleEntryController
{
    private $db;

    public function __construct()
    {
        $this->db = new ScheduleEntryDAO();
    }

    public function add_new_schedule_entry($day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room)
    {
        $this->db->add_schedule_entry($day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room);
    }

    public function update_schedule_entry($id, $day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room)
    {
        $this->db->update_schedule_entry($id, $day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room);
    }

    public function get_schedule_entry($id)
    {
        return $this->db->get_schedule_entry($id);
    }

    public function get_schedule_entry_by_day($day)
    {
        return $this->db->get_schedule_entry_by_day($day);
    }

    public function get_all_schedule_entries()
    {
        return $this->db->get_all_schedule_entries();
    }

    public function delete_schedule_entry($id)
    {
        $this->db->delete_schedule_entry($id);
    }

    public function get_current_week()
    {
        return $this->db->get_current_week_schedule();
    }
}