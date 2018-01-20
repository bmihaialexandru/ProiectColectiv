import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ScheduleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            image: this.props.image,
            courseName: this.props.name,
            instructorName: this.props.instructorName,
            time: this.props.time,
            isSubscribed: this.props.isSubscribed
        }
    }
	render() {
        const image = this.props.image;
        const button = localStorage.username ? this.state.isSubscribed ? 
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
                    <small>{this.state.time}</small>
                    <h3>{this.state.courseName}</h3>
                    <span>{this.state.instructorName}</span>
                    <span style={{paddingTop: "20px", display: "block"}}>
                        {button}
                    </span>
                </div>
            </div>
        );
    }

    _subscribeToClass = () => {
        this.setState({isSubscribed: true});
    }

    _unSubscribeToClass = () => {
        this.setState({isSubscribed: false});
    }
}
