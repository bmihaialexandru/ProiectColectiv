import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class ScheduleTests {

    constructor() {
        this.result_list = [];
        localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoxLCJ0aW1lc3RhbXAiOjE1MTMwOTc1MTV9.9e74zJ7MYzTSKHPudpizfEgC2sUvjut8Fn_gj64Z5w6V3bZBP9SJfvguigKr9CSCLKaJMSuA6pQL6i6H1BfUfQ");
    }

    async run_all() {
        await this.run_get_schedule();
        await this.run_add_schedule();
        await this.run_edit_schedule();
        await this.run_delete_schedule();
    }

    async run_get_schedule() {
        let date = "2018-01-07";
        console.log(date);
        await SingletonService.ScheduleService.get_schedule_for_week(date).then((result) => {
            if(result !== null)
            {
                console.log("Get schedule for week integration test returned: " + result);
                this.result_list.push(new Test("Get schedule for week integration test", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Get schedule for week integration test", "failed"));
            }
        })
    }

    async run_add_schedule() {
        await SingletonService.ScheduleService.add_schedule_entry(localStorage.getItem("token"), "monthly", "2020-10-08", "2020-10-09", "15:00", "18:00", 8888888, 8888888, 8888888).then((result) => {
            if(result !== null)
            {
                console.log("Get schedule for week integration test returned: " + result);
                this.result_list.push(new Test("Add schedule integration test", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Add schedule integration test", "failed"));
            }
        });
    }

    async run_edit_schedule() {
        //token, id, day, hour_start, hour_finish, id_course, id_trainer, id_training_room
        await SingletonService.ScheduleService.get_schedule_for_week("2020-10-08").then(async (result) => {
            let id = -1;
            console.log(result);
            for(let key in result) {
                for(let key2 in result[key]) {
                    if (result[key].hasOwnProperty(key2) && result[key][key2][0] !== undefined) {
                        id = result[key][key2][0].id;
                    }
                }
            }
            if(id === -1)
            {
                this.result_list.push(new Test("Edit schedule integration test", "failed"));
                return;
            }
            await SingletonService.ScheduleService.edit_schedule_entry(localStorage.getItem("token"), id, "2020-10-08", "19:00", "20:00", 8888888, 8888888, 8888888).then((result) => {
                if(result !== null)
                {
                    this.result_list.push(new Test("Edit schedule integration test", "passed"));
                }
                else
                {
                    this.result_list.push(new Test("Edit schedule integration test", "failed"));
                }
            });

        });
    }

    async run_delete_schedule() {
        await SingletonService.ScheduleService.get_schedule_for_week("2020-10-08").then(async (result) => {
            let id = -1;
            for(let key in result) {
                for(let key2 in result[key]) {
                    if (result[key].hasOwnProperty(key2) && result[key][key2][0] !== undefined) {
                        id = result[key][key2][0].id;
                    }
                }
            }
            if(id === -1)
            {
                this.result_list.push(new Test("Delete schedule integration test", "failed"));
                return;
            }
            await SingletonService.ScheduleService.delete_schedule_entry(localStorage.getItem("token"), id).then((result) => {
               if(result !== null)
               {
                   this.result_list.push(new Test("Delete schedule integration test", "passed"));
               }
               else
               {
                   this.result_list.push(new Test("Delete schedule integration test", "failed"));
               }
            });

        });
    }


}