import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {ScheduleEntry} from "../model/ScheduleEntry";
import {Icon} from "../model/Icon"

export class ScheduleService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    get_schedule_for_week(date) {
        return fetch(this.server + "/interface/get_week_schedule.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "date="+date
        }).then(result => {
            return result.json();
        }).then(result => {
            return ScheduleService._get_schedule_for_result(result);
        });
    }

    add_schedule_entry(token, type, start_day, end_day, hour_start, hour_finish, id_course, id_trainer, id_training_room, id_icon) {
        /*
        $type=$_POST['type'];
        $start_day=$_POST['start_day'];
        $end_day=$_POST['end_day'];
        $hour_start=$_POST['hour_start'];
        $hour_finish=$_POST['hour_finish'];
        $id_course=$_POST['id_course'];
        $id_trainer=$_POST['id_trainer'];
        $id_training_room=$_POST['id_training_room'];
         */

        return fetch(this.server + "/interface/add_schedule_entry.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&type="+type+"&start_day="+start_day+"&end_day="+end_day+"&hour_start="+hour_start+"&hour_finish="+hour_finish+"&id_course="+id_course+"&id_trainer="+id_trainer+"&id_icon="+id_icon+"&id_training_room="+id_training_room

        }).then(result => {
            return result.json();
        }).then(result => {
            return ScheduleService._get_result_simple(result);
        })
    }

    delete_schedule_entry(token, id_entry) {
        return fetch(this.server + "/interface/delete_schedule_entry.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&id="+id_entry
        }).then(result => {
            return result.json();
        }).then(result => {
            return ScheduleService._get_result_simple(result);
        })
    }

    edit_schedule_entry(token, id, day, hour_start, hour_finish, id_course, id_trainer, id_training_room) {
        /*
        $id = $_POST['id'];
        $day=$_POST['day'];
        $hour_start=$_POST['hour_start'];
        $hour_finish=$_POST['hour_finish'];
        $id_course=$_POST['id_course'];
        $id_trainer=$_POST['id_trainer'];
        $id_training_room=$_POST['id_training_room'];
        $security_token = $_POST['token'];
         */
        return fetch(this.server + "/interface/edit_schedule_entry.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&id="+id+"&day="+day+"&hour_start="+hour_start+"&hour_finish="+hour_finish+"&id_course="+id_course+"&id_trainer="+id_trainer+"&id_training_room="+id_training_room
        }).then(result => {
            return result.json();
        }).then(result => {
            return ScheduleService._get_result_simple(result);
        })


    }

    get_icons() {
        return fetch(this.server + "/interface/get_icons.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: ""
        }).then(result => {
            return result.json();
        }).then(result => {
            return ScheduleService._get_icons_for_result(result);
        })
    }

    static _get_icons_for_result(result) {
        console.log("ICONS:" + JSON.stringify(result))
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            let arr = result["icons"].map((icon) => new Icon(icon['id_icon'], ServiceCredentials.SERVER_PATH + icon['path_to_icon']));
            return arr;

        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }


    static _get_schedule_for_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            let arr = [];
            for(let key in result["schedule"]) {
                var dict = {};
                dict[key] = result["schedule"][key].map((sched) => new ScheduleEntry(key,
                    sched["id"],
                    sched["day"],
                    sched["hour_start"],
                    sched["hour_finish"],
                    sched["id_course"],
                    sched["id_trainer"],
                    sched["id_training_room"],
                    sched["course_name"],
                    sched["trainer_name"],
                    sched["room_name"],
                    this.server + sched["path_to_icon"]
                ));
                arr.push(dict);
            }

            return arr;

        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_result_simple(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0 && result["answer"].localeCompare("Warning") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            if(result["answer"].localeCompare("Warning") === 0)
            {
                alert(result["reason"]);
            }

            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}