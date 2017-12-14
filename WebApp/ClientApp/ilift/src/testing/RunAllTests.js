import React, { Component } from 'react';
import {Test} from "./Test";
import {CoursesTests} from "./CoursesTests";
import {FeedbackCourseTests} from "./FeedbackCourseTests";
import {FeedbackTrainerTests} from "./FeedbackTrainerTests";
import {ServiceCredentials} from "../services/ServiceCredentials";
import {ScheduleTests} from "./ScheduleTests";
import {PackageTests} from "./PackageTests";

export class RunAllTests extends Component {
    constructor(props) {
        super(props);

        this.server = ServiceCredentials.SERVER_PATH;
        this.state = {
            integration_tests : [],
            unit_tests: []
        };

        let course_test = new CoursesTests();
        course_test.run_all().then((result) => {
            console.log(course_test.result_list);
            this.setState({integration_tests: this.state.integration_tests.concat(course_test.result_list) });
            console.log(this.state.integration_tests);
        });

        let feedbackCourse_test = new FeedbackCourseTests();
        feedbackCourse_test.run_all().then((result) => {
            console.log(feedbackCourse_test.result_list);
            this.setState({integration_tests: this.state.integration_tests.concat(feedbackCourse_test.result_list) });
            console.log(this.state.integration_tests);
         });
    
        let feedbackTrainer_test = new FeedbackTrainerTests();
        feedbackTrainer_test.run_all().then((result) => {
        console.log(feedbackTrainer_test.result_list);
        this.setState({integration_tests: this.state.integration_tests.concat(feedbackTrainer_test.result_list) });
        console.log(this.state.integration_tests);
        });

        let package_test = new PackageTests();
        package_test.run_all().then((result) => {
        console.log(package_test.result_list);
        this.setState({integration_tests: this.state.integration_tests.concat(package_test.result_list) });
        console.log(this.state.integration_tests);
        });

        let schedule_test = new ScheduleTests();
        schedule_test.run_all().then((result) => {
            this.setState({integration_tests: this.state.integration_tests.concat(schedule_test.result_list) });
        });

        //add more integration tests above this


        // get unit tests result

        fetch(this.server + "/testing/run_all_tests.php", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(result => {
            return result.json();
        }).then(result => {
            this.setState({unit_tests: result.map((element) => new Test(element["name"], element["result"]))});
        });


    }

    render() {

        return (
            <div align={"center"}>
                <h1> Integration Tests </h1> <br/> <br/> <br/>
                <table border={1}>
            {
                this.state.integration_tests.map( (test) => {
                    if(test.result.localeCompare("passed") === 0)
                    {
                        return <tr bgcolor={"#d9ffcc"}><td>{test.name}</td><td>{test.result}</td></tr>;
                    }
                    else
                    {
                        return <tr bgcolor={"#ffcccc"}><td>{test.name}</td><td>{test.result}</td></tr>;
                    }
                }
                )
            }
                </table>
                <br/> <br/> <br/>
                <h1> Unit Tests </h1> <br/> <br/> <br/>
                <table border={1}>
                {
                    this.state.unit_tests.map( (test) => {
                            if(test.result.localeCompare("passed") === 0)
                            {
                                return <tr bgcolor={"#d9ffcc"}><td>{test.name}</td><td>{test.result}</td></tr>;
                            }
                            else
                            {
                                return <tr bgcolor={"#ffcccc"}><td>{test.name}</td><td>{test.result}</td></tr>;
                            }
                        }
                    )
                }


                </table>
            </div>
        );
    }
}