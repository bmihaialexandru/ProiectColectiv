import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {User} from "../model/User";
import * as alertify from "alertifyjs";
import {NotificationManager} from "react-notifications";

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

      get_all_users() {
        return fetch(this.server + "/interface/get_users.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        }).then(result => {
            return result.json();
        }).then(result => {
            return UserService._get_user_list_from_result(result);
        });
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

    delete_user(id) {
        return fetch(this.server + "/interface/delete_user.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return UserService._get_result_simple(result);
        });
    }

    get_user_byId(id) {
        return fetch(this.server + "/interface/get_user_byId.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return UserService._get_user_from_result(result);
        });
    }

    edit_user(id, name, phone, email, password){
        let data = new FormData();

        console.log(id);
        data.append("name", name);
        data.append("phone", phone);
        data.append("id", id);
        data.append("email", email);
        data.append("password", password);
        data.append("token", localStorage.getItem("token"));


        return fetch(this.server + "/interface/edit_user.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        }).then(result=> {
            return result.json();
        }).then(result => {
            return UserService._get_result_simple(result)
        });
    }

    change_password(oldPassword, newPassword){
        return fetch(this.server + "/interface/change_password.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username="+localStorage.getItem("username")+"&old_password="+oldPassword+"&new_password="+newPassword+"&token="+localStorage.getItem("token")
        }).then(result=> {
            return result.json();
        }).then(result => {
            return UserService._get_token_from_result(result)
        });
    }

    static _get_token_from_result(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                // TODO: do this preetier maybe :D
                NotificationManager.error(result["reason"], "Error");
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
                NotificationManager.error(result["reason"], "Error");
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
                NotificationManager.error(result["reason"], "Error");
                return null;
            }

            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

    static _get_user_list_from_result(result){
        
        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            return result["users"].map((user) => new User(user["id"],
                user["name"],
                user["phone_number"],
                user["email"],
            ));

        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

}