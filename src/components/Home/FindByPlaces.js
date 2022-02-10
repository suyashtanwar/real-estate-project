import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'

export default class FindByPlaces extends Component {
    render() {
        return (
            <div>
                <section className="bg-light">
					<div className="container">

						<div className="row justify-content-center">
							<div className="col-lg-7 col-md-10 text-center">
								<div className="sec-heading center">
									<h2>Find By Locations</h2>
									<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
								</div>
							</div>
						</div>

						<div className="row">

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">San Francisco, California</h4>
											<span>12 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">Dunao, California</h4>
											<span>142 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">Liverpool, London</h4>
											<span>17 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">San Francisco, New York</h4>
											<span>72 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">New Orleans, Louisiana</h4>
											<span>102 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="location-property-wrap">
									<div className="location-property-thumb">
										<a href="listings-list-with-sidebar.html"><img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" /></a>
									</div>
									<div className="location-property-content">
										<div className="lp-content-flex">
											<h4 className="lp-content-title">Los Angeles</h4>
											<span>95 Properties</span>
										</div>
										<div className="lp-content-right">
											<a href="listings-list-with-sidebar.html" className="lp-property-view"><i className="ti-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 text-center">
								<a href="listings-list-with-sidebar.html" className="btn btn-theme-light rounded">Browse More Locations</a>
							</div>
						</div>
					</div>
				</section>
            </div>
        )
    }
}
