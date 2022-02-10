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
			auth: false,
			slug: "",
			cmsData: [],
			Loader: true
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

	getCms = () => {
		window.scrollTo(0, 0);
		this.setState({
			slug: "about-us"
		})
		var token = this.state.token
		const formData = new FormData();
		formData.append('url_key', this.props.match.params.slug);
		axios
			.post(APIURL + "cms/" + this.props.match.params.slug, formData)
			.then((response) => {
				console.log("response.data.data", response.data.data)
				this.setState({
					cmsData: response.data.data
				});
			})
			.catch((error) => {
				// this.setState({
				// 	errMsg: error.response.data.error,
				// })
			});
	};

	componentDidMount() {
		this.getCms()
		window.scrollTo(0, 0);
		setTimeout(() => {
			this.setState({
				Loader: false
			})
		}, 500);
	}

	render() {
		const { cmsData } = this.state
		console.log("slug", this.props)

		return (
			<div className="resido-front">
				{this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
				<div className="blue-skin dashboard">
					<div id="main-wrapper">
						<Navbar slug={this.props.match.params.slug} />
						<div className="clearfix"></div>
						<div className="page-title h-auto py-3">
							<div className="container">
								<div className="row">
									<div className="col-lg-12 col-md-12">
										<h2 className="ipt-title">{cmsData.page_title}</h2>
									</div>
								</div>
							</div>
						</div>
						<section>
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-12 col-md-12">
										<div className="story-wrap explore-content">
											<h2>{cmsData.page_title}</h2>
											<p style={{ whiteSpace: "break-spaces" }}>
												<span
													dangerouslySetInnerHTML={{ __html: cmsData.content }}
												></span>
											</p>
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
