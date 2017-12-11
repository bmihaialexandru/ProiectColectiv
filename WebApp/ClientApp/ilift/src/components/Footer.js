import React, { Component } from 'react';
import '../template/css/animate.css';
import '../template/css/bootstrap.css';
import '../template/css/custom-style.css';
import '../template/css/style.css';
import '../template/css/superfish.css';

export class Footer extends Component {

    render() {
        return (
            <footer>
			<div id="footer">
				<div className="container">
					<div className="row">
						<div className="col-md-4 animate-box">
							<h3 className="section-title">About Us</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.</p>
						</div>

						<div className="col-md-4 animate-box">
							<h3 className="section-title">Our Address</h3>
							<ul className="contact-info">
								<li><i className="icon-map-marker"></i>198 West 21th Street, Suite 721 New York NY 10016</li>
								<li><i className="icon-phone"></i>+ 1235 2355 98</li>
								<li><i className="icon-envelope"></i><a href="#">info@oursite.com</a></li>
								<li><i className="icon-globe2"></i><a href="#">www.oursite.com</a></li>
							</ul>
						</div>
						<div className="col-md-4 animate-box">
							<h3 className="section-title">Drop us a line, like it's hot</h3>
							<form className="contact-form">
								<div className="form-group">
									<label className="sr-only">Name</label>
									<input type="name" className="form-control" id="name" placeholder="Name"/>
								</div>
								<div className="form-group">
									<label className="sr-only">Email</label>
									<input type="email" className="form-control" id="email" placeholder="Email"/>
								</div>
								<div className="form-group">
									<label className="sr-only">Message</label>
									<textarea className="form-control" id="message" rows="7" placeholder="Message"></textarea>
								</div>
								<div className="form-group">
									<input type="submit" id="btn-submit" className="btn btn-send-message btn-md" value="Send Message"/>
								</div>
							</form>
						</div>
					</div>
					<div className="row copy-right">
						<div className="col-md-6 col-md-offset-3 text-center">
							{/* <p className="fh5co-social-icons">
								<a href="#"><i className="icon-twitter2"></i></a>
								<a href="#"><i className="icon-facebook2"></i></a>
								<a href="#"><i className="icon-instagram"></i></a>
								<a href="#"><i className="icon-dribbble2"></i></a>
								<a href="#"><i className="icon-youtube"></i></a>
							</p> */}
							<p>Copyright 2017 932/Brilliant. All Rights Reserved. <br/>Made with <i className="icon-heart3"></i> by <a href="http://freehtml5.co/" target="_blank">932/brilliant</a></p>
						</div>
					</div>
				</div>
			</div>
		</footer>
        );
    }
}