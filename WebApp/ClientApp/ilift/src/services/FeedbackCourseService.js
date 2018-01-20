import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {FeedbackCourse} from "../model/FeedbackCourse";
import {NotificationManager} from "react-notifications";

export class FeedbackCourseService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    add_new_feedback(stars, message, course_id) {
        return fetch(this.server + "/interface/add_feedback.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&stars="+stars+"&message="+message+"&course_id="+course_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackCourseService._get_result_simple(result);
        });
    }


    delete_feedback(id) {
        return fetch(this.server + "/interface/delete_feedback.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackCourseService._get_result_simple(result);
        });
    }

    get_all_feedbacks(id) {
        return fetch(this.server + "/interface/get_feedbacks.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackCourseService._get_feedback_course_list_from_result(result);
        });
    }

    get_actualy_all_feedbacks(){
        return fetch(this.server + "/interface/get_all_courses_feedback.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackCourseService._get_feedback_course_list_from_result(result);
        });
    }


    static _get_feedback_course_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return result["feedbacks"].map((feedback) => new FeedbackCourse(feedback["id"],
                feedback["stars"],
                feedback["message"],
                feedback["user_id"],
                feedback["course_id"],
                feedback["username"]
                )
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
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}