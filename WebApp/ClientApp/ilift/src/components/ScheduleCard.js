import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {SingletonService} from "../services/SingletonService";

export class ScheduleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.id, 
            image: this.props.image,
            courseName: this.props.name,
            instructorName: this.props.instructorName,
            time: this.props.time,
            isSubscribed: this.props.isSubscribed,
            idCourse: this.props.idCourse,
            idTrainer: this.props.idTrainer,
        }
    }

	render() {
        const image = this.props.image;
        const button = localStorage.username ? this.props.isSubscribed ? 
            <button className="btn btn-default" onClick={this._unSubscribeToClass}>
                <img style={{marginBottom: "0"}} src={require("./images/accept_icon.svg.png")}/>{"Subscribed"}
            </button> :
            <button className="btn btn-default" onClick={this._subscribeToClass}>
                {"Subscribe"}
            </button> : <div/>;

        return (
            <div className="col-md-3 col-sm-6">
                <div className="program program-schedule">
                    <img src={image} alt="Cycling"/>
                    <small>{this.props.time}</small>
                    <h3>{this.props.name}</h3>
                    <span>{this.props.instructorName}</span>
                    <span style={{paddingTop: "20px", display: "block"}}>
                        {button}
                    </span>
                </div>
            </div>
        );
    }

    _subscribeToClass = () => {
        SingletonService.SubscribtionService.add_subscribtion(localStorage.getItem("token"), this.props.id)
            .then((response) => {
                if(response)
                    window.location.reload();
            });
    }

    _unSubscribeToClass = () => {
        SingletonService.SubscribtionService.delete_subscribtion(localStorage.getItem("token"), this.props.id)
            .then((response) => {
                window.location.reload();
            });
    }
}
