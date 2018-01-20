export class ScheduleEntry {
    constructor(week_day, id, day, hour_start, hour_finish, id_course, id_trainer, id_training_room, course_name, trainer_name, room_name, icon_path) {
        this.week_day = week_day;
        this.id = id;
        this.day = day;
        this.hour_start = hour_start;
        this.hour_finish = hour_finish;
        this.id_course = id_course;
        this.id_trainer = id_trainer;
        this.id_training_room = id_training_room;
        this.course_name = course_name;
        this.trainer_name = trainer_name;
        this.room_name = room_name;
        this.icon_path = icon_path;
    }
}