import React, { Component } from 'react';
import {SingletonService} from "../services/SingletonService";
import {SubscriptionCard} from "./SubscriptionCard";

export class SubscriptionTypes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list : []
		}
	}

	componentDidMount() {
		SingletonService.PackageService.get_all_packages()
		.then((response) => {
			console.log(response);
			this.setState({list: response});
		})
	}

  render() {
	  console.log(this.state);
        return (
            <div id="fh5co-pricing-section" className="fh5co-pricing fh5co-lightgray-section">
			<div className="container">
				<div className="row">
					<div className="className=">
						<div className="heading-section text-center animate-box">
							<h2>Pricing Plan</h2>
							<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="pricing">
					{
						this.state.list.map(packag => {
							console.log(packag);
							return (
								<SubscriptionCard
									id={packag.id}
									packageName={packag.package_name}
									pricing={packag.pricing}
									description={packag.description}
									days={packag.days}
									courses={packag.courses}
									isRenew={packag.isRenew}
									isSubscribed={packag.isSubscribed}
								/>
							);
						})
					}
				</div>
				</div>
			</div>
		</div>
        );
    }
}