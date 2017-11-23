import React, { Component } from 'react';
import '../template/css/animate.css';
import '../template/css/bootstrap.css';
import '../template/css/custom-style.css';
import '../template/css/style.css';
import '../template/css/superfish.css';

export class FooterAdmin extends Component {

    render() {
        return (
            <footer>
			<div id="footer">
				<div className="container">
					<div className="row copy-right">
						<div className="col-md-6 col-md-offset-3 text-center">
							<p className="fh5co-social-icons">
								<a href="#"><i className="icon-twitter2"></i></a>
								<a href="#"><i className="icon-facebook2"></i></a>
								<a href="#"><i className="icon-instagram"></i></a>
								<a href="#"><i className="icon-dribbble2"></i></a>
								<a href="#"><i className="icon-youtube"></i></a>
							</p>
							<p>Copyright 2017 932/Brilliant. All Rights Reserved. <br/>Made with <i className="icon-heart3"></i> by <a href="http://freehtml5.co/" target="_blank">932/brilliant</a></p>
						</div>
					</div>
				</div>
			</div>
		</footer>
        );
    }
}