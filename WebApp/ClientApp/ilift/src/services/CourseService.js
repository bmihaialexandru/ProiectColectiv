import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {Course} from "../model/Course";

export class CourseService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    /* Functia asta trebuie apelata asa:
        1) ne definim un <input type="file" onChange={(e) => this.photo = e.target.files[0];} />
        2) in acel input se poate alege fisierul
        3) se va apela functia ceva de genul add_new_course(this.photo, name, description)
     */

    add_new_course(photo, name, description) {
        let data = new FormData();

        data.append("photo", photo);
        data.append("name", name);
        data.append("description", description);
        data.append("token", localStorage.getItem("token"));

        return fetch(this.server + "/interface/add_course.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        }).then(result=> {
            return result.json();
        }).then(result => {
            return CourseService._get_result_simple(result)
        });
    }

    /*
    * edit_trainer function
    * vezi ce am scris mai sus ca sa vezi cum se apeleaza
     */
    edit_course(id, photo, name, description) {
        let data = new FormData();

        data.append("photo", photo);
        data.append("name", name);
        data.append("description", description);
        data.append("id", id);
        data.append("token", localStorage.getItem("token"));

        return fetch(this.server + "/interface/edit_course.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        }).then(result=> {
            return result.json();
        }).then(result => {
            return CourseService._get_result_simple(result)
        });
    }

    delete_trainer(id) {
        return fetch(this.server + "/interface/delete_course.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return CourseService._get_result_simple(result);
        });
    }

    get_course(id) {
        return fetch(this.server + "/interface/get_course.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return CourseService._get_course_from_result(result);
        });
    }

    get_all_courses() {
        return fetch(this.server + "/interface/get_all_courses.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        }).then(result => {
            return result.json();
        }).then(result => {
            return CourseService._get_course_list_from_result(result);
        });
    }


    static _get_course_from_result(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            return new Course(result["course"]["id"],
                result["course"]["name"],
                result["course"]["description"],
                ServiceCredentials.SERVER_PATH+result["course"]["url_photo"].slice(2), // io trimit de la servar si cu .. si mi-e lene sa schimb ...
                result["course"]["number_of_feedbacks"]);
            } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_course_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            return result["courses"].map((course) => new Course(course["id"],
                course["name"],
                course["description"],
                ServiceCredentials.SERVER_PATH+course["url_photo"].slice(2), // io trimit de la servar si cu .. si mi-e lene sa schimb ...
                course["number_of_feedbacks"])
            );

        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_result_simple(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
            }
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}