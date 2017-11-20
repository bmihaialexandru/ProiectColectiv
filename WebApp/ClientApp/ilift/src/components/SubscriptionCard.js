import React, { Component } from 'react';

export class SubscriptionCard extends Component {

    render() {

        const imageUrl = this.props.imageUrl;
        const subscriptionName = this.props.name;
        const price = this.props.price;
        const description = this.props.description;

        return (
            <div className="col-md-3 animate-box">
                <div className="price-box animate-box">
                    <h2 className="pricing-plan">{subscriptionName}</h2>
                    <div className="price"><sup className="currency">$</sup>{price}<small>/month</small></div>
                    <p>{description}</p>
                    <ul className="classes">
                        <li>15 Cardio Classes</li>
                        <li className="color">10 Swimming Lesson</li>
                        <li>10 Yoga Classes</li>
                        <li className="color">20 Aerobics</li>
                        <li>10 Zumba Classes</li>
                        <li className="color">5 Massage</li>
                        <li>10 Body Building</li>
                    </ul> 
        {/* aici va trebui sa punem in loc de 'ul' dinamic lista de chestii incluse dar so far lasam asa*/}
                    <a href="#" className="btn btn-default">Select Plan</a>
                </div>
            </div>
    );
}
}