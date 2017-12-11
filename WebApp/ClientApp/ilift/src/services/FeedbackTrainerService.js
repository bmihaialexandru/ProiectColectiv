import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {FeedbackCourse} from "../model/FeedbackCourse";

export class FeedbackTrainerService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    add_new_feedback(stars, message, trainer_id) {
        return fetch(this.server + "/interface/add_trainer_feedback.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&stars="+stars+"&message="+message+"&trainer_id="+trainer_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackTrainerService._get_result_simple(result);
        });
    }


    delete_feedback(id) {
        return fetch(this.server + "/interface/delete_trainer_feedback.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackTrainerService._get_result_simple(result);
        });
    }

    get_all_feedbacks(id) {
        return fetch(this.server + "/interface/get_feedback_trainer.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return FeedbackTrainerService._get_feedback_course_list_from_result(result);
        });
    }



    static _get_feedback_course_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            return result["feedbacks"].map((feedback) => new FeedbackCourse(feedback["id"],
                feedback["stars"],
                feedback["message"],
                feedback["course_id"],
                feedback["user_id"],
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
                alert(result["reason"]);
                return null;
            }
            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}