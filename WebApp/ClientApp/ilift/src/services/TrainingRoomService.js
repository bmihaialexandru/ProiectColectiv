import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {TrainingRoom} from "../model/TrainingRoom";

export class TrainingRoomService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }


    get_all_rooms() {
        return fetch(this.server + "/interface/get_rooms.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        }).then(result => {
            return result.json();
        }).then(result => {
            return TrainingRoomService._get_training_room_list_from_result(result);
        });
    }

    add_training_room(token, name, max_capacity) {
        return fetch(this.server + "/interface/add_room.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+token+"&name="+name+"&max_capacity="+max_capacity
        }).then(result => {
            return result.json();
        }).then(result => {
            return TrainingRoomService._get_result_simple(result);
        })
    }


    static _get_training_room_list_from_result(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                alert(result["reason"]);
                return null;
            }
            return result["rooms"].map((room) => new TrainingRoom(room["id_training_room"],
                room["max_capacity"],
                room["name"]
            ));

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