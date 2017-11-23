import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {_reloadJs} from '../js/reloadJs';

export class Trainers extends Component {


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
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-1.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Badila Mihai</h3>
									<span>Body Trainer</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
									<p className="fh5co-social-icons">
										<span className="comment"><Link to={{ pathname: '/feedback', state: {entityName: "Badila Mihai", entityType: "trainer"} }}><i className="icon-bubble22"></i>21</Link></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage:'url(' + require('./images/trainer-2.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Bica Denisa</h3>
									<span>Boxing, ACF instructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href=""><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>11</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-3.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Strimbei Codrin</h3>
									<span>HIIT insturctor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href=""><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>25</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-4.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Carausu Catrinel</h3>
									<span>TRX, Swimming intructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href=""><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>18</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-5.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Alexa Sabina</h3>
									<span>Pilates, Zumba instructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href=""><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>5</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-6.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Bocioc Titus</h3>
									<span>Cross-fit instructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href="" style={{color: 'white'}}><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>21</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-7.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Bodea Nicolae</h3>
									<span>Strongman instructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href="" style={{color: 'white'}}><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>21</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="team-section-grid animate-box" style={{backgroundImage: 'url(' + require('./images/trainer-8.jpg') + ')'}}>
							<div className="overlay-section">
								<div className="desc">
									<h3>Baciu Cristian</h3>
									<span>Yoga instructor</span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p className="fh5co-social-icons">
										<span className="comment"><a href="" style={{color: 'white'}}><i className="icon-bubble22" onClick={() => alert("this is feedback")}></i>21</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        );
    }
}