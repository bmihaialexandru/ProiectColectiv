import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class FeedbackCourseTests {

    constructor() {
        this.result_list = [];
        localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoxLCJ0aW1lc3RhbXAiOjE1MTMwOTc1MTV9.9e74zJ7MYzTSKHPudpizfEgC2sUvjut8Fn_gj64Z5w6V3bZBP9SJfvguigKr9CSCLKaJMSuA6pQL6i6H1BfUfQ");
    }

    async run_all() {
        await this.run_get_all_feedbacks();
    }

    async run_get_all_feedbacks() {
        let id = 3;
        await SingletonService.FeedbackCourseService.get_all_feedbacks(id).then((result) => {
            if(result !== null)
            {
                this.result_list.push(new Test("Get all feedbacks integration test", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Get all feedbacks integration test", "failed"));
            }
        })
    }

    async run_add() {
        
    }
}