import React, { Component } from 'react';

export class ClassCard extends Component {

    render() {
        const image = this.props.image;
        const courseName = this.props.courseName;
        const description = this.props.description;

        return (
            <div className="col-md-4 col-sm-6">
                <div className="program animate-box">
                    <img src={image} alt=""/>
                    <h3>{courseName}</h3>
                    <p>{description}</p>
                    <span><a href="#" className="btn btn-default">Join Now</a></span>
                </div>
            </div>
    );
}
}

