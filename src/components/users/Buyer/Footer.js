import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <section className="theme-bg call-to-act-wrap">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="call-to-act">
									<div className="call-to-act-head">
										<h3>Want to Become a Real Estate Agent?</h3>
										<span>We'll help you to border your career and borderth.</span>
									</div>
									<Link to="/signup" className="btn btn-call-to-act">SignUp Today</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<footer className="dark-footer skin-dark-footer">
					<div>
						<div className="container">
							<div className="row">

								<div className="col-lg-4 col-md-4 col-12">
									<div className="footer-widget">
									<img src={logo} className="img-footer" alt="" />
										<div className="footer-add">
											<p>Collins Street West, Victoria 8007, Australia.</p>
											<p>+1 246-345-0695</p>
											<p>info@example.com</p>
										</div>

									</div>
								</div>
								<div className="col-lg-2 col-md-6 col-12">
									<div className="footer-widget">
										<h4 className="widget-title">My Account</h4>
										<ul className="footer-menu">
											<li><Link to="/checkuser">My Profile</Link></li>
											<li><Link to="/buyer/wishlist">WishList</Link></li>
										</ul>
									</div>
								</div>
								<div className="col-lg-3 col-md-4 col-12">
									<div className="footer-widget">
										<h4 className="widget-title">Navigations</h4>
										<ul className="footer-menu">
											<li><Link to="/About">About Us</Link></li>
											<li><Link to="/contact">Contact Us</Link></li>
											<li><Link to="/Listing">Property</Link></li>
											{/* <li><Link to="#">Checkout</Link></li> */}
											
											{/* <li><Link to="#">Enquiry</Link></li> */}
										</ul>
									</div>
								</div>
								<div className="col-lg-3 col-md-4 col-12">
									<div className="footer-widget">
										<h4 className="widget-title">Connect</h4>
										<ul className="footer-menu">
											<li><a href="#"><i className="fab fa-facebook mr-2"></i>Facebook</a></li>
											<li><a href="#"><i className="fab fa-twitter mr-2"></i>Twitter</a></li>
											<li><a href="#"><i className="fab fa-instagram mr-2"></i>Instagram</a></li>
											<li><a href="#"><i className="fab fa-linkedin mr-2"></i>Linkdin</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="footer-bottom">
						<div className="container">
							<div className="row align-items-center">

								<div className="col-lg-6 col-md-6">
									<p className="mb-0">© 2021 Resido. Designd By <a href="https://themezhub.com">Themez Hub</a> All Rights Reserved</p>
								</div>

								<div className="col-lg-6 col-md-6 text-right">
									<ul className="footer-bottom-social float-end">
										<li><a href="#"><i className="ti-facebook"></i></a></li>
										<li><a href="#"><i className="ti-twitter"></i></a></li>
										<li><a href="#"><i className="ti-instagram"></i></a></li>
										<li><a href="#"><i className="ti-linkedin"></i></a></li>
									</ul>
								</div>

							</div>
						</div>
					</div>
				</footer>
            </div>
        )
    }
}
