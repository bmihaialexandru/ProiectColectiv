<?php
/**
 * Created by PhpStorm.
 * User: mihai
 * Date: 11/23/2017
 * Time: 9:01 PM
 */

require_once("../db/db_manager.php");

class ScheduleEntryDAO
{
    private $db;

    public function __construct () {
        $this->db = new DBUtils();
    }

    public function get_schedule_entry($id)
    {
        $sql = 'SELECT * FROM schedule_entry WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id,]);
        $schedule_entry = $stmt->fetch();
        return $schedule_entry;
    }

    public function get_schedule_entry_by_day($day){
        $sql = 'SELECT * FROM schedule_entry WHERE `day` = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$day,]);
        $schedule_entry = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $schedule_entry;
    }

    public function get_all_schedule_entries()
    {
        $sql = 'SELECT * FROM schedule_entry';
        $stmt=$this->db->prepare($sql);
        $stmt->execute();
        $schedule_entry = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $schedule_entry;
    }

    public function update_schedule_entry($id, $day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room)
    {
        $sql = 'UPDATE schedule_entry set `day`=?, hour_start=?, hour_finish=?, id_course=?, id_trainer=?, id_training_room=? WHERE id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room, $id]);
    }

    public function delete_schedule_entry($id)
    {
        $sql = 'DELETE from schedule_entry where id = ?';
        $stmt=$this->db->prepare($sql);
        $stmt->execute([$id]);
    }

    public function get_current_week_schedule($date)
    {
        //$start = $date;
        $period = ' -1 day';
        while(date('w', strtotime($date)) != '1')
        {
            $date = date('Y-m-d', strtotime($date . $period));
        }
        $finish = date('Y-m-d', strtotime($date. ' +6 days'));
        $sql = "SELECT schedule_entry.*, course.name as course_name, trainer.name as trainer_name, training_room.name as room_name FROM schedule_entry
        INNER JOIN course on course.id = schedule_entry.id_course
        INNER JOIN trainer on trainer.id = schedule_entry.id_trainer
        INNER JOIN training_room on training_room.id_training_room = schedule_entry.id_training_room
        WHERE `day` >= ? and `day` <= ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$date, $finish]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    public function add_schedule_entry($day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room)
    {
        $sql = 'INSERT INTO schedule_entry(`day`, hour_start, hour_finish,id_course, id_trainer, id_training_room) VALUES(?,?,?,?,?,?)';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$day, $hour_start, $hour_finish, $id_course, $id_trainer, $id_training_room]);
    }
}