import {SingletonService} from "../services/SingletonService";
import {Test} from "./Test";

export class CoursesTests {

    constructor() {
        this.result_list = [];
    }

    async run_all() {
        await this.run_get_all_tests();
    }

    async run_get_all_tests() {
        await SingletonService.CourseService.get_all_courses().then((result) => {
            if(result !== null)
            {
                this.result_list.push(new Test("Get all courses integration test", "passed"));
            }
            else
            {
                this.result_list.push(new Test("Get all courses integration test", "failed"));
            }
        })
    }
}