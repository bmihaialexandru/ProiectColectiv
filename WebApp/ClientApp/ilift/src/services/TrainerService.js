import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {User} from "../model/User";

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