import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export class FeedbackCard extends Component {

    render() {
        const author = this.props.author;
        const rating = this.props.rating;
        const description = this.props.description;

        return (
        <div className="col-md-4 col-sm-6">
            <div className="program program-schedule">
            <div>
                <StarRatingComponent 
                    name="rate" 
                    starCount={5}
                    value={rating}
                    editing={false}
                />
            </div>
            <div style={{display: "inline", fontWeight: "Bold"}} >
                {author} said : 
            </div>
            <div>
                <div name="" id="" cols="30" rows="7" placeholder="Message" style={{display: "inline"}}>{description}</div>
            </div>
            </div>
        </div>
    );
}
}
