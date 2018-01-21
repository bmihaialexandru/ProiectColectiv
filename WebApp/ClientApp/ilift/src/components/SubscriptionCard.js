import React, { Component } from 'react';
import {SingletonService} from "../services/SingletonService";
import {NotificationManager} from "react-notifications"

export class SubscriptionCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            subscriptionName: this.props.packageName,
            price: this.props.pricing,
            description: this.props.description,
            days: this.props.days,
            courses: this.props.courses,
            expirationDate: this.props.expirationDate,
            isRenew: this.props.isRenew,
            isSubscribed: this.props.isSubscribed,
            isLoggedIn: localStorage.getItem("token") !== null
        }
    }

    render() {
        const buttonText = this.state.isRenew ?  "Renew" : "Subscribe";
        return (
            <div className="col-md-12 col-lg-12 col-sm-12 animate-box">
            <div className="price-box animate-box">
                <h2 className="pricing-plan">{this.state.subscriptionName}</h2>
                <div className="price"><sup className="currency">RON</sup>{this.state.price}<small>/month</small></div>
                {this.state.expirationDate ? <p>Active until: {this.state.expirationDate}</p> : <p>{this.state.days} days</p>}
                <p>{this.state.description}</p>
                <ul className="classes">
                    {
                        this.state.courses.map((course, index) => {
                            return index % 2 === 0 ? <li>{course.number_subscribtions} {course.name}(s)</li> : 
                            <li className="color">{course.number_subscribtions} {course.name}(s)</li>
                        })
                    }
                </ul>
                { ( !this.state.isSubscribed || this.props.isRenew ) && this.state.isLoggedIn &&
                    <button className="btn btn-default" onClick={() => {this._subscribeToPackage();}}>{buttonText}</button>
                }
            </div>
        </div>
    );
}

    _subscribeToPackage(){
        SingletonService.PackageService.subscribe_for_new_package(this.state.id)
        .then((response) => {
            if(response != null) {
                NotificationManager.success("You subscribed successfully.")
            }

        });
    }

}