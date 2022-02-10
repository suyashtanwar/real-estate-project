import React, { Component } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Footer from '../GlobalComponents/Footer'
import axios from "axios";
import { APIURL } from '../../components/constants/common';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap'

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: JSON.parse(localStorage.getItem("token")),
			user: JSON.parse(localStorage.getItem("userData")),
			user_type: JSON.parse(localStorage.getItem("user_type")),
			userInfo: {
				name: "",
				email: "",
				contact: "",
				message: ""
			},
			errMsg: "",
			scsMsg: "",
			Loader: true,
			auth:false
		}
	}

	onChangehandler = (e, key) => {
		const { userInfo } = this.state;
		userInfo[e.target.name] = e.target.value;
		this.setState({
			userInfo,
			errMsg: ""
		});
		console.log(userInfo)
	}

	sendEnquiry = () => {
		if (!this.state.user) {
			this.setState({
				auth:true
			})
		}
		var token = this.state.token
		const formData = new FormData();
		formData.append('name', this.state.userInfo.name);
		formData.append('email', this.state.userInfo.email);
		formData.append('contact', this.state.userInfo.contact);
		formData.append('message', this.state.userInfo.message);
		
		this.setState({ Loader: true });
		axios
			.post(APIURL + "send-contact-us", formData, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then((response) => {
				this.setState({
					Loader: false,
					scsMsg: response.data.message
				});
				setTimeout(() => {
					this.setState({
						scsMsg: ""
					})
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				this.setState({
					errMsg: error.response.data.error,
					Loader: false
				})
			});
	};

	componentDidMount() {
		window.scrollTo(0,0);
		setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
	}

	render() {
		if (this.state.auth) {
			return <Redirect to="/signin" />;
		}
		return (
			<div className="resido-front">
				{this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
				<div className="blue-skin dashboard">
					<div id="main-wrapper">
						<Navbar />
						<div className="clearfix"></div>
						<Header />
						<section className="bg-light">
							<div className="container">
								<div className="row">
									<div className="col-lg-7 col-md-7 col-sm-12 col-12">

										<div className="row">
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														required=""
														type="text"
														name="name"
														placeholder="Name"
														value={this.state.userInfo.name}
														onChange={this.onChangehandler}
													/>
													<span className="text-danger">{this.state.errMsg.name}</span>
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Email Address</label>
													<input
														className="form-control"
														required=""
														type="email"
														name="email"
														placeholder="Email Address"
														value={this.state.userInfo.email}
														onChange={this.onChangehandler}
													/>
													<span className="text-danger">{this.state.errMsg.email}</span>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label>Contact</label>
											<input
												className="form-control"
												required=""
												type="number"
												name="contact"
												placeholder="Contact"
												value={this.state.userInfo.contact}
												onChange={this.onChangehandler}
											/>
											<span className="text-danger">{this.state.errMsg.contact}</span>
										</div>

										<div className="form-group">
											<label>Message</label>
											<textarea
												className="form-control"
												required=""
												type="textarea"
												name="message"
												placeholder="Message"
												value={this.state.userInfo.message}
												onChange={this.onChangehandler}
											/>
											<span className="text-danger">{this.state.errMsg.message}</span>
										</div>
										<div className='text-danger'>{this.state.scsMsg}</div>
										<div className="form-group">
											<button onClick={() => this.sendEnquiry()} className="btn btn-theme-light-2 rounded" >Submit Request</button>
										</div>

									</div>

									<div className="col-lg-5 col-md-5 col-sm-12 col-12">
										<div className="contact-info">
											<h2>Get In Touch</h2>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

											<div className="cn-info-detail">
												<div className="cn-info-icon">
													<i className="ti-home"></i>
												</div>
												<div className="cn-info-content text-break ms-sm-2">
													<h4 className="cn-info-title">Reach Us</h4>
													Lorem Ipsum is <br />simply dummy text of the printing<br />

												</div>
											</div>

											<div className="cn-info-detail">
												<div className="cn-info-icon">
													<i className="ti-email"></i>
												</div>
												<div className="cn-info-content text-break ms-sm-2">
													<h4 className="cn-info-title">Drop A Mail</h4>
													mailto:contactus@enquirymail.com
												</div>
											</div>

											<div className="cn-info-detail">
												<div className="cn-info-icon">
													<i className="ti-mobile"></i>
												</div>
												<div className="cn-info-content text-break ms-sm-2">
													<h4 className="cn-info-title">Call Us</h4>
													+91 - XXXXXXXXXX
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</section>
						<Footer />
					</div>
				</div>
			</div>
		)
	}
}
