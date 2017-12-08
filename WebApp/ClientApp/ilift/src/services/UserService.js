import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {User} from "../model/User";

export class UserService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    login(username, password) {
        return fetch(this.server + "/interface/login.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username="+username+"&password="+password
        }).then(result=> {
            return result.json();
        }).then(result => {
            return UserService._get_token_from_result(result)
        });
    }

    get_current_user(token) {
        return fetch(this.server + "/interface/get_my_user.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token
        }).then(result => {
            return result.json();
        }).then(result => {
            return UserService._get_user_from_result(result);
        })
    }

    register(token, username, password, phone, email) {
        return fetch(this.server + "/interface/register.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&username="+username+"&password="+password+"&phone="+phone+"&email="+email
        }).then(result => {
            return result.json();
        }).then(result => {
            return UserService._get_result_simple(result);
        })
    }

    static _get_token_from_result(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                // TODO: do this preetier maybe :D
                alert(result["reason"]);
                return null;
            }
            return result["token"];
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_user_from_result(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            return new User(result["user"]["id"], result["user"]["name"], result["user"]["phone_number"], result["user"]["email"], result["user"]["user_type"], result["user"]["pass_changed"]);
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