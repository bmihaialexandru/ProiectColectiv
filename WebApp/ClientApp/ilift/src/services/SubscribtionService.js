import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {Subscribtion} from "../model/Subscribtion";

import {NotificationManager} from "react-notifications";

export class SubscribtionService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }


    get_my_subscribtions() {
        return fetch(this.server + "/interface/get_my_subscribtions.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        }).then(result => {
            return result.json();
        }).then(result => {
            return SubscribtionService._get_subscribtion_list_from_result(result);
        });
    }

    add_subscribtion(token, id_entry) {
        return fetch(this.server + "/interface/add_subscribtion.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&id_entry="+id_entry
        }).then(result => {
            return result.json();
        }).then(result => {
            return SubscribtionService._get_result_simple(result);
        })
    }

    delete_subscribtion(token, id_entry) {
        return fetch(this.server + "/interface/delete_subscribtion.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&id_entry="+id_entry
        }).then(result => {
            return result.json();
        }).then(result => {
            return SubscribtionService._get_result_simple(result);
        })
    }


    static _get_subscribtion_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return result["subscribtions"].map((subs) => new Subscribtion(subs["id_user"],
                subs["id_schentry"])
            );

        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_result_simple(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0 && result["answer"].localeCompare("Warning") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            if(result["answer"].localeCompare("Warning") === 0)
            {
                NotificationManager.error(result["reason"], "Error");
            }

            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}