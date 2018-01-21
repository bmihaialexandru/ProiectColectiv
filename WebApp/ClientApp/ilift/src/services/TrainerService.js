import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {Trainer} from "../model/Trainer";

import {NotificationManager} from "react-notifications";

export class TrainerService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    /* Functia asta trebuie apelata asa:
        1) ne definim un <input type="file" onChange={(e) => this.photo = e.target.files[0];} />
        2) in acel input se poate alege fisierul
        3) se va apela functia ceva de genul add_new_trainer(this.photo, name, description)
     */

    add_new_trainer(photo, name, description) {
        let data = new FormData();

        data.append("photo", photo);
        data.append("name", name);
        data.append("description", description);
        data.append("token", localStorage.getItem("token"));

        return fetch(this.server + "/interface/add_trainer.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        }).then(result=> {
            return result.json();
        }).then(result => {
            return TrainerService._get_result_simple(result)
        });
    }

    /*
    * edit_trainer function
    * vezi ce am scris mai sus ca sa vezi cum se apeleaza
     */
    edit_trainer(id, photo, name, description) {
        let data = new FormData();

        data.append("photo", photo);
        data.append("name", name);
        data.append("description", description);
        data.append("id", id);
        data.append("token", localStorage.getItem("token"));

        return fetch(this.server + "/interface/edit_trainer.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        }).then(result=> {
            return result.json();
        }).then(result => {
            return TrainerService._get_result_simple(result)
        });
    }

    delete_trainer(id) {
        return fetch(this.server + "/interface/delete_trainer.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return TrainerService._get_result_simple(result);
        });
    }

    get_trainer(id) {
        return fetch(this.server + "/interface/get_trainer.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return TrainerService._get_trainer_from_result(result);
        });
    }

    get_all_trainers() {
        return fetch(this.server + "/interface/get_all_trainers.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: ''
        }).then(result => {
            return result.json();
        }).then(result => {
            return TrainerService._get_trainer_list_from_result(result);
        });
    }


    static _get_trainer_from_result(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return new Trainer(result["trainer"]["id"],
                result["trainer"]["name"],
                result["trainer"]["description"],
                ServiceCredentials.SERVER_PATH+result["trainer"]["url_photo"].slice(2), // io trimit de la servar si cu .. si mi-e lene sa schimb ...
                result["trainer"]["number_of_feedbacks"]);
            } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_trainer_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return result["trainers"].map((trainer) => new Trainer(trainer["id"],
                trainer["name"],
                trainer["description"],
                ServiceCredentials.SERVER_PATH+trainer["url_photo"].slice(2), // io trimit de la servar si cu .. si mi-e lene sa schimb ...
                trainer["number_of_feedbacks"])
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