import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class ScheduleTests {

    constructor() {
        this.result_list = [];
        localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoxLCJ0aW1lc3RhbXAiOjE1MTMwOTc1MTV9.9e74zJ7MYzTSKHPudpizfEgC2sUvjut8Fn_gj64Z5w6V3bZBP9SJfvguigKr9CSCLKaJMSuA6pQL6i6H1BfUfQ");
    }

    async run_all() {
        await this.run_get_schedule();
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
        let date = "2018-01-07";

        await SingletonService.ScheduleService.add_schedule_entry(localStorage.getItem("token"), "weekly", "2020-10-08", "2020-12-08", "15:00", "18:00", 2, 1, 1).then((result) => {
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


}