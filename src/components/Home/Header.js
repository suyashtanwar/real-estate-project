import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { Link, Redirect } from 'react-router-dom';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			address: '',
			lat: "",
			long: "",
			info: [],
			static:[
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
				{name:"Where To Say? Where To Say? Where To Say?"},
			]
		}
	}
	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng =>
				this.setState({
					lat: latLng.lat,
					long: latLng.lng,
					address: address
				}))
			.catch(error => console.error('Error', error));
	};

	render() {
		if (this.state.lat!="") {
            return <Redirect to={"/listing?search="+this.state.address+"&lat="+this.state.lat+"&lng="+this.state.long} />;
        }
		return (
			<>
				<div className="image-cover hero-banner" style={{ backgroundImage: `url(${"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"})` }} data-overlay="6">
					<div className="container">

						<h1 className="big-header-capt mb-0">Find Your Property</h1>
						<p className="text-center mb-5">From as low as $10 per day with limited time offer</p>

						<div className="full-search-2 eclip-search italian-search hero-search-radius shadow col-md-8 m-auto col-12">
							<div className="hero-search-content">
								<div className="row">
									<div className="col-lg-9 col-md-9 col-sm-9 col-8">
										<div className="form-group">
											<div className="input-with-icon">
												<i className="ti-location-pin"></i>
												<PlacesAutocomplete
													value={this.state.address}
													onChange={this.handleChange}
													onSelect={this.handleSelect}
												>
													{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
														<div>
															<input

																{...getInputProps({
																	placeholder: 'Search Places',
																	className: 'location-search-input form-control',
																})}
															/>
															<div className="autocomplete-dropdown-container">
																{/* {loading && <div>Loading...</div>} */}
																{suggestions.map(suggestion => {
																	const className = suggestion.active
																		? 'suggestion-item--active'
																		: 'suggestion-item';
																	// inline style for demonstration purpose
																	const style = suggestion.active
																		? { backgroundColor: '#fafafa', cursor: 'pointer' }
																		: { backgroundColor: '#ffffff', cursor: 'pointer' };
																	return (
																		<div
																			{...getSuggestionItemProps(suggestion, {
																				className,
																				style,
																			})}
																		>
																			<span>{suggestion.description} </span>
																		</div>
																	);
																})}
															</div>
														</div>
													)}
												</PlacesAutocomplete>
											</div>
										</div>
									</div>
									<div style={{ display: "none" }}>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-3 col-4">
										<div className="form-group">
												<Link
												className="btn search-btn"
												 to={{
												pathname: '/listing',
												search: '?search='+this.state.address,
												}}> Search </Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
