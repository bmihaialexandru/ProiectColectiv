import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class CoursesTests {

    constructor() {
        this.id = 8888888;
        this.deleteId= 9999999;
        this.result_list = [];
        localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoxLCJ0aW1lc3RhbXAiOjE1MTMwOTc1MTV9.9e74zJ7MYzTSKHPudpizfEgC2sUvjut8Fn_gj64Z5w6V3bZBP9SJfvguigKr9CSCLKaJMSuA6pQL6i6H1BfUfQ");
    }

    async run_all() {
        await this.run_get_all();
        await this.run_get();
        await this.run_edit();
        await this.run_delete();
    }

    async run_get_all() {
        await SingletonService.PackageService.get_all_packages().then((result) => {
            if(result !== null)
            {
                this.result_list.push(new Test("Get all packages", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Get all packages", "failed"));
            }
        })
    }

    async run_get(){
        await SingletonService.CourseService.get_course(this.id).then((result) => {
            if(result !== null) this.result_list.push(new Test("Get one course", "passed"));
            else this.result_list.push(new Test("Get one course", "failed"));
        })
    }

    async run_edit() {
        await SingletonService.CourseService.edit_course(this.id, "test.jpeg", "test", "test").then((result) => {
                    if(result.localeCompare("Success")===0)  this.result_list.push(new Test("Edit course", "passed"));
                    else this.result_list.push(new Test("Edit course", "failed"));
                })        
            }
    async run_delete(){
         await SingletonService.CourseService.delete_trainer(this.deleteId).then((result) => {
                if(result.localeCompare("Success")===0) this.result_list.push(new Test("Delete course", "passed"));
                else this.result_list.push(new Test("Delete course", "failed"));
            }) 
        }
    }