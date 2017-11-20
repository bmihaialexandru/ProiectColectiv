import React, { Component } from 'react';

export class ScheduleCard extends Component {

    render() {

        const imageUrl = this.props.imageUrl;
        const courseName = this.props.name;
        const instructorName = this.props.instructorName;
        const time = this.props.time;

        return (
            <div className="col-md-3 col-sm-6">
                <div className="program program-schedule">
                    <img src={require({imageUrl})} alt="Cycling"/>
                    <small>{time}</small>
                    <h3>{courseName}</h3>
                    <span>{instructorName}</span>
                </div>
            </div>
    );
}
}
