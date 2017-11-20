import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Trainers} from '../components/Trainers';
import {SubscriptionTypes} from '../components/SubscriptionTypes';
import {News} from '../components/News';
import {Footer} from '../components/Footer';

export class ContactPage extends Component {
  render() {
    return (
      <div id="fh5co-wrapper">
      <div id="fh5co-page">

      <Header/>

      <div className="fh5co-parallax back-3" data-stellar-background-ratio="0.5">
			<div className="overlay"></div>
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
						<div className="fh5co-intro fh5co-table-cell animate-box">
							<h1 className="text-center">Contact Us</h1>
							<p>And some other message</p>
						</div>
					</div>
				</div>
			</div>
		  </div>


      <div id="fh5co-contact">
			<div className="container">
				<form action="#">
					<div className="row">
						<div className="col-md-6 animate-box">
							<h3 className="section-title">Our Address</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							<ul className="contact-info">
								<li><i className="icon-location-pin"></i>198 West 21th Street, Suite 721 New York NY 10016</li>
								<li><i className="icon-phone2"></i>+ 1235 2355 98</li>
								<li><i className="icon-mail"></i><a href="#">info@yoursite.com</a></li>
								<li><i className="icon-globe2"></i><a href="#">www.yoursite.com</a></li>
							</ul>
						</div>
						<div className="col-md-6 animate-box">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Name"/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Email"/>
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group">
										<textarea name="" className="form-control" id="" cols="30" rows="7" placeholder="Message"></textarea>
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group">
										<input type="submit" value="Send Message" className="btn btn-primary"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

    <div id="map" class="fh5co-map contact-map"></div>

      <Footer/>

      </div>
      </div>
    );
  }
}