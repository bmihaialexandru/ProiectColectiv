import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';

export class UserService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    login(username, password) {
        fetch(this.server + "/interface/login.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username="+username+"&password="+password
        }).then(result=> {return result.json();}).then(result => UserService._get_token_from_result(result));
    }

    static _get_token_from_result(result) {
        try {

            let token = "";
            if(result["answer"].localeCompare("Success") !== 0)
            {
                // TODO: do this preetier maybe :D
                alert("Username and password incorrect!");
                return;
            }

            token = result["token"];
            // put token somewhere -> where ?
            alert(token);
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}