import React, { Component } from 'react';

export class SubscriptionCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            subscriptionName: this.props.subscriptionName,
            price: this.props.price,
            description: this.props.description,
            endDate: this.props.endDate,
            startDate: this.props.startDate
        }
    }

    render() {
        return (
            <div className="col-lg-15 animate-box">
            <div className="price-box animate-box">
                <h2 className="pricing-plan">{this.state.subscriptionName}</h2>
                <div className="price"><sup className="currency">$</sup>{this.state.price}<small>/month</small></div>
                <p>{this.state.startDate} - {this.state.endDate}</p>
                <p>{this.state.description}</p>
                <ul className="classes">
                    <li>15 Cardio Classes</li>
                    <li className="color">10 Swimming Lesson</li>
                    <li>10 Yoga Classes</li>
                    <li className="color">20 Aerobics</li>
                    <li>10 Zumba Classes</li>
                    <li className="color">5 Massage</li>
                    <li>10 Body Building</li>
                </ul>
                <a href="#" className="btn btn-default">Renew</a>
            </div>
        </div>
    );
}
}