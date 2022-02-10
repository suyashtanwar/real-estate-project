import React, { Component } from 'react'

export default class News extends Component {
    render() {
        return (
            <div>
                <section>
					<div className="container">

						<div className="row justify-content-center">
							<div className="col-lg-7 col-md-10 text-center">
								<div className="sec-heading center">
									<h2>News By Resido</h2>
									<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
								</div>
							</div>
						</div>

						<div className="row">

							<div className="col-lg-4 col-md-6">
								<div className="blog-wrap-grid">

									<div className="blog-thumb">
										<a href="blog-detail.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>

									<div className="blog-info">
										<span className="post-date"><i className="ti-calendar"></i>30 july 2018</span>
									</div>

									<div className="blog-body">
										<h4 className="bl-title"><a href="blog-detail.html">Why people choose listio for own properties</a></h4>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. </p>
										<a href="blo-detail.html" className="bl-continue">Continue</a>
									</div>

								</div>
							</div>

							<div className="col-lg-4 col-md-6">
								<div className="blog-wrap-grid">

									<div className="blog-thumb">
										<a href="blog-detail.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>

									<div className="blog-info">
										<span className="post-date"><i className="ti-calendar"></i>10 August 2018</span>
									</div>

									<div className="blog-body">
										<h4 className="bl-title"><a href="blog-detail.html">List of benifits and impressive listeo services</a></h4>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. </p>
										<a href="blo-detail.html" className="bl-continue">Continue</a>
									</div>

								</div>
							</div>

							<div className="col-lg-4 col-md-6">
								<div className="blog-wrap-grid">

									<div className="blog-thumb">
										<a href="blog-detail.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>

									<div className="blog-info">
										<span className="post-date"><i className="ti-calendar"></i>30 Sep 2018</span>
									</div>

									<div className="blog-body">
										<h4 className="bl-title"><a href="blog-detail.html">What people says about listio properties</a></h4>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. </p>
										<a href="blo-detail.html" className="bl-continue">Continue</a>
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
