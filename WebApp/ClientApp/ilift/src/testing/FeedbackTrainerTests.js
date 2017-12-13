import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class  FeedbackTrainerTests{

    constructor() {
        this.id = 8888888;
        this.deleteId= 9999999;
        this.result_list = [];
        localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoxLCJ0aW1lc3RhbXAiOjE1MTMwOTc1MTV9.9e74zJ7MYzTSKHPudpizfEgC2sUvjut8Fn_gj64Z5w6V3bZBP9SJfvguigKr9CSCLKaJMSuA6pQL6i6H1BfUfQ");
    }

    async run_all() {
        await this.run_get_all();
        await this.run_add();
        await this.run_delete();
    }

    async run_get_all() {
        await SingletonService.FeedbackTrainerService.get_all_feedbacks(this.id).then((result) => {
            if(result !== null)
            {
                this.result_list.push(new Test("Get all feedbacks for trainers integration test", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Get all feedbacks for trainers integration test", "failed"));
            }
        })
    }

    async run_add() {
        await SingletonService.FeedbackTrainerService.add_new_feedback(4,"bravo",this.id).then((result) => {
                    if(result.localeCompare("Success")===0)  this.result_list.push(new Test("Add feedback for trainers", "passed"));
                    else this.result_list.push(new Test("Add feedback for trainers", "failed"));
                })        
            }
    async run_delete(){
         await SingletonService.FeedbackTrainerService.delete_feedback(this.deleteId).then((result) => {
                if(result.localeCompare("Success")===0) this.result_list.push(new Test("Delete feedback for trainers", "passed"));
                else this.result_list.push(new Test("Delete feedback for trainers", "failed"));
            }) 
        }
    }