import React, { Component } from 'react';
import {ClassCard} from './ClassCard';
import {SingletonService} from "../services/SingletonService";

export class Classes extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : [] /*[
                {
                    image : require("./images/fit-dumbell.svg"),
                    courseName : "Body Combat",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
                {
                    image : require("./images/fit-cycling.svg"),
                    courseName : "Cycling program",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
                {
                    image : require("./images/fit-yoga.svg"),
                    courseName : "Yoga programs",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
                {
                    image : require("./images/fit-boxing.svg"),
                    courseName : "Boxing fitness",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
                {
                    image : require("./images/fit-swimming.svg"),
                    courseName : "Swimming program",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
                {
                    image : require("./images/fit-massage.svg"),
                    courseName : "Massage",
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                },
        ]*/
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
          <div id="fh5co-programs-section">
            <div className="container">
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
        </div>
        );
    };
}