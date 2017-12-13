import React, { Component } from 'react';
import {Test} from "./Test";
import {CoursesTests} from "./CoursesTests";


export class RunAllTests extends Component {
    constructor(props) {
        super(props);

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