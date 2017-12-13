import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ClassCard extends Component {

    render() {
        const image = this.props.image;
        const courseName = this.props.courseName;
        const description = this.props.description;
        const numberOfFeedbacks = this.props.numberOfFeedbacks;
        const id = this.props.id;

        return (
            <div className="col-md-4 col-sm-6">
                <div className="program program-schedule">
                    <img src={image} alt=""/>
                    <h3>{courseName}</h3>
                    <p>{description}</p>
                    <p className="fh5co-social-icons">
                    <span className="comment">
                        <Link to={{ pathname: '/feedback', state: {id: id, entityName: courseName, entityType: "course"} }}>
                        <i className="icon-bubble22"></i>
                            {numberOfFeedbacks}
                        </Link>
                    </span>
                </p>
                </div>
            </div>
    );
}
}

