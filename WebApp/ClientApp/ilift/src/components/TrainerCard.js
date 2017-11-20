import React, { Component } from 'react';

export class TrainerCard extends Component {

    render() {

        const imageUrl = this.props.imageUrl;
        const name = this.props.name;
        const domain = this.props.domain;
        const description = this.props.description;
        const numberOfFeedbacks = this.props.numberOfFeedbacks;

        return (
        <div className="col-md-4 col-sm-6">
            <div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require({imageUrl}) + ')'}}>
                <div className="overlay-section">
                    <div className="desc">
                        <h3>{name}</h3>
                        <span>{domain}</span>
                        <p>{description}</p>
                        <p className="fh5co-social-icons">
                            <span className="comment"><a href="" style={{color: 'white'}}><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>{numberOfFeedbacks}</a></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
}