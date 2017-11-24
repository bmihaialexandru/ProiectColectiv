import React, { Component } from 'react';
import {TrainerCard} from './TrainerCard';

import {_reloadJs} from '../js/reloadJs';

export class Trainers extends Component {

	constructor(props){
        super(props);
        this.state = {
            list : [
                {
                    imageUrl : require("./images/trainer-1.jpg"),
					name : "Badila Mihai",
					domain : "Body trainer",
					numberOfFeedbacks: 21,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-2.jpg"),
					name : "Bica Denisa",
					domain : "Boxing, ACF instructor",
					numberOfFeedbacks: 11,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-3.jpg"),
					name : "Strimbei Codrin",
					domain : "HIIT insturctor",
					numberOfFeedbacks: 3,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-4.jpg"),
					name : "Carausu Catrinel",
					domain : "TRX instructor",
					numberOfFeedbacks: 23,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-5.jpg"),
					name : "Alexa Sabina",
					domain : "Pilates instructor",
					numberOfFeedbacks: 13,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-6.jpg"),
					name : "Bocios Titus",
					domain : "Cross-fit instructor",
					numberOfFeedbacks: 10,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-7.jpg"),
					name : "Bodea Nicolae",
					domain : "Strongman instructor",
					numberOfFeedbacks: 23,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
				},
				{
                    imageUrl : require("./images/trainer-8.jpg"),
					name : "Baciu Cristian",
					domain : "Yoga instructor",
					numberOfFeedbacks: 5,
                    description : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. "
                }
        ]}
    };

  render() {
	  _reloadJs();
        return (
            <div id="fh5co-team-section" className="fh5co-lightgray-section">
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="heading-section text-center animate-box">
							<h2>Meet Our Trainers</h2>
							<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						</div>
					</div>
				</div>
				<div className="row text-center">
					
					{this.state.list.map( x => 
							<TrainerCard 
								imageUrl={x.imageUrl}
								name={x.name}
								domain={x.domain}
								numberOfFeedbacks={x.numberOfFeedbacks}
								description={x.description}
							/>
					)}
					
				</div>
			</div>
		</div>
        );
    }
}