import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { APIURL } from '../constants/common';
import bad from '../../assets/img/bed.svg'
import bath from '../../assets/img/bathtub.svg'
import move from '../../assets/img/move.svg'
import Button from '@restart/ui/esm/Button';
import NumberFormat from 'react-number-format';

export default class ExplorePlaces extends Component {
	constructor() {
		super();

		this.state = {
			user: JSON.parse(localStorage.getItem("userData")),
			token: JSON.parse(localStorage.getItem("token")),
			PropertyList: [],
			wishlist: false,
			page: 0,
			id: "",
			redirect: false,
			limit: 3
		}
	}
	s
	componentDidMount() {
		this.getPropertyList()
	}
	onLoadMore() {
		this.setState({
			limit: this.state.limit + 3
		});
	}

	getPropertyList() {
		var token = this.state.token
		axios
			.get(APIURL + "get-latest-properties", {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then((response) => {
				console.log("get-latest-properties", response.data.data)
				this.setState({
					PropertyList: response.data.data
				})
			})
			.catch(error => {
				// alert(error)
			})
	}

	addToWishlist = (e, idx, status) => {
		if (!this.state.user) {
			this.setState({
				redirect: true
			})
			return false
		}
		var token = this.state.token
		const { userInfo, user } = this.state;
		const formData = new FormData();
		formData.append('user_id', user.id);
		formData.append('property_id', e.id);
		axios
			.post(APIURL + "buyer/property-wishlist-add", formData, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then((response) => {
				let propertyData = this.state.PropertyList
				console.log(propertyData[idx].wishlist, status, idx)
				propertyData[idx].wishlist = status

				this.setState({
					PropertyList: propertyData
				})
			})
			.catch((error) => {
				this.setState({
					errMsg: error.response.data.error,
					Loader: false
				})
			});
	};

	goToProperty() {
		this.setState({
			goToProperty: true
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/signin" />;
		}
		if (this.state.goToProperty) {
			return <Redirect to="/Listing" />;
		}
		return (
			<div>
				<section>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-7 col-md-10 text-center">
								<div className="sec-heading center">
									<h2>Latest Properties</h2>
								</div>
							</div>
						</div>
						<div className="row">
							{this.state.PropertyList.length > 0 ? this.state.PropertyList.slice(0, this.state.limit).map((item, i) => (
								<div key={i} className="col-lg-4 col-md-6 col-sm-12">
									{item.property_detail.map((sItem, idx) => (
										<div>
											<div className="property-listing property-2">
												<div className="listing-img-wrapper">
													<div className="list-img-slide">
														<div className="click">
															{item.propertyProfileImage.length > 0 && item.propertyProfileImage.map((Img, index) => (
																<Link to={"/viewproperty/details/" + item.id} className="prt-view">
																	<div key={idx}><a href="#"><img src={Img.url_path} className="img-fluid mx-auto" alt="" /></a>
																	</div>
																</Link>
															))}
															{
																item.wishlist ?

																	<span  className="wishlist-heart"><i className="fas fa-heart text-success"></i></span>
																	:
																	<span  className="wishlist-heart"><i className="far fa-heart text-success"></i></span>
															}
														</div>
													</div>
												</div>
												<Link to={"/viewproperty/details/" + item.id} className="prt-view">
													<div className="listing-detail-wrapper">
														<div className="listing-short-detail-wrap">
															<div className="listing-short-detail">
																{/* <span className="property-type">For Rent</span> */}
																<h4 className="listing-name verified ms-1">{item.name}</h4>
																<div className="footer-first mt-1">
																	<div className="foot-location">
																		<i className="ti-location-pin mr-1 fs-5"></i>{sItem.apt_number === "null" ? "NA" : sItem.apt_number}, {sItem.street_name === "null" ? "NA" : sItem.street_name}, {sItem.city === "null" ? "NA" : sItem.city}
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="price-features-wrapper">
														<div className="list-fx-features">
															<div className="listing-card-info-icon">
																<div className="inc-fleat-icon"><img src={bad} width="13" alt="" /></div>{sItem.number_of_bedrooms ? sItem.number_of_bedrooms : "NA"} Beds
															</div>
															<div className="listing-card-info-icon">
																<div className="inc-fleat-icon"><img src={bath} width="13" alt="" /></div>{sItem.number_of_bathrooms ? sItem.number_of_bathrooms : "NA"} Bath
															</div>
															<div className="listing-card-info-icon">
																<div className="inc-fleat-icon"><img src={move} width="13" alt="" /></div>{sItem.lot_size ? sItem.lot_size : "NA"} sqft
															</div>
														</div>
													</div>

													<div className="listing-detail-footer">
														<div className="listing-short-detail-flex">
															<h6 className="listing-card-info-price">
																<NumberFormat
																	value={sItem.listing_price}
																	className="foo"
																	displayType={'text'}
																	thousandSeparator={true}
																	prefix={'$'}
																	renderText={(value, props) => <div {...props}>{value}</div>}
																/>
															</h6>
														</div>
														<div className="footer-flex">
														</div>
													</div>
												</Link>
											</div>

										</div>
									))}
								</div>
							)) :
								<table>
									<tbody>
										<tr>
											<td colSpan="3" className="text-center">
												No Property Available
											</td>
										</tr>
									</tbody>
								</table>
							}
						</div>
						{
							this.state.PropertyList.length === this.state.limit ?
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 text-center">
										<Button className="btn btn-theme-light-2 rounded">No More Properties Available</Button>
									</div>
								</div>
								:
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 text-center">
										<Button onClick={() => this.goToProperty()} className="btn btn-theme-light-2 rounded">Browse More Properties</Button>
									</div>
								</div>
						}
					</div>
				</section>
			</div>
		)
	}
}
