import React, { Component } from 'react'

export default class HowItWorks extends Component {
    render() {
        return (
            <div>
                <section>
					<div className="container">

						<div className="row justify-content-center">
							<div className="col-lg-7 col-md-10 text-center">
								<div className="sec-heading center">
									<h2>How It Works?</h2>
									<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features-item">
									<div className="icon-features-wrap"><div className="middle-icon-large-features-box f-light-success"><i className="ti-receipt text-success"></i></div></div>
									<div className="middle-icon-features-content">
										<h4>Evaluate Property</h4>
										<p>There are many variations of passages of Lorem Ipsum available, but the majority have Ipsum available.</p>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features-item">
									<div className="icon-features-wrap"><div className="middle-icon-large-features-box f-light-warning"><i className="ti-user text-warning"></i></div></div>
									<div className="middle-icon-features-content">
										<h4>Meet Your Agent</h4>
										<p>There are many variations of passages of Lorem Ipsum available, but the majority have Ipsum available.</p>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features-item remove">
									<div className="icon-features-wrap"><div className="middle-icon-large-features-box f-light-blue"><i className="ti-shield text-blue"></i></div></div>
									<div className="middle-icon-features-content">
										<h4>Close The Deal</h4>
										<p>There are many variations of passages of Lorem Ipsum available, but the majority have Ipsum available.</p>
									</div>
								</div>
							</div>
						</div>

					</div>
				</section>
            </div>
        )
    }
}
