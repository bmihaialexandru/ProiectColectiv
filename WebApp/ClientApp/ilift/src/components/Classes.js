import React, { Component } from 'react';
import {ClassCard} from './ClassCard';
import {SingletonService} from "../services/SingletonService";

export class Classes extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : []
        };

        SingletonService.CourseService.get_all_courses().then((result) => {
            if(result === null)
            {
                return;
            }
           this.setState({list: result});
        });
    };

    render() {
        return (
            <div className="container animate-box">
                {this.state.list.map( x => 
                        <ClassCard
                            id = {x.id}
                            image={x.image}
                            courseName={x.courseName}
                            description={x.description}
                            numberOfFeedbacks = {x.numberOfFeedbacks}
                        />
                )}
            </div>
        );
    };
}