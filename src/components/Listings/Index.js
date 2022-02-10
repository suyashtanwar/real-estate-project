import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import face1 from '../../assets/images/faces/dummy.png'
import { Link, Redirect } from 'react-router-dom'
import Map from "./Map/index"
import axios from 'axios';
import { APIURL } from '../constants/common';
import { Button, Input, Spinner } from 'reactstrap'
import bad from '../../assets/img/bed.svg'
import bath from '../../assets/img/bathtub.svg'
import move from '../../assets/img/move.svg'
import Pagination from "react-js-pagination";
import queryString from 'query-string'
import NumberFormat from 'react-number-format';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "under_review", "label": "Under Review" }, { 'value': "accept", "label": "Accepted" }, { 'value': "unverify", "label": "Not Verified" }],
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: localStorage.getItem("user_type"),
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            navigate: false,
            Loader: true,
            PropertyList: [],
            search: "",
            hoaFree: "",
            featureTypeId: "",
            totalBathRooms: "",
            totalBedRooms: "",
            cooling: "",
            heating: "",
            flooring: "",
            fireplace: "",
            swimmingPool: "",
            minPrice: "",
            maxPrice: "",
            finished: "",
            filter: "",
            scrolling: true,
            disableWishList: false,
            lat: 0,
            lng: 0,
            profile_image: "",
            name: "",
            noRecords: false,
            Data: [
                {
                    id: "",
                    title: "Think Company",
                    website: "www.google.com",
                    image:
                        "http://thinkcompany.fi/wp-content/uploads/2014/05/hkithinkco04-1024x702.jpg",
                    address: [
                        {
                            id: "",
                            country: "Finland",
                            city: "Helsinki",
                            street: "Yliopistonkatu 4",
                            postcode: "00101",
                            lat: "60.169787",
                            lng: "24.948776"
                        }
                    ]
                },
            ]
        }
    }

    getProfileInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.state.user.id);
            var token = this.state.token
            var app_url = APIURL + "agent/edit-profile"
            axios
                .post(app_url, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    this.setState({
                        profile_image: info.url_path,
                        name: info.fullName,
                        noRecords: true
                    })
                    this.handleCountryState(this.state.countryId)
                    console.log("sssssssss", this.state.profile_image)
                })
                .catch((error) => {
                    this.setState({
                        // errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }

    onLoadMore() {
        this.setState({
            limit: this.state.limit + 5
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getPropertyList()
            }
        );
    }

    handleMinPrice = (e) => {
        console.log(e)
        this.setState({
            minPrice: e
        })
    }

    handleMaxPrice = (e) => {
        console.log(e)
        this.setState({
            maxPrice: e
        })
    }

    handleListingPrice = (e) => {
        this.setState({ listingPrice: !this.state.e })
    }
    handleHoa = (e) => {
        this.setState({
            hoaFree: e
        })
    }
    handleFlooring = () => {
        this.setState({
            flooring: !this.state.flooring
        })
    }

    handleFeatureType = (e) => {
        console.log(e)
        this.setState({
            featureTypeId: e
        })
    }
    handleTotalBedrooms = (e) => {
        console.log(e)
        this.setState({
            totalBedRooms: e
        })
    }

    handleTotalBathRooms = (e) => {
        this.setState({
            totalBathRooms: e
        })
    }
    handleFullBath = () => {
        this.setState({
            fullBath: !this.state.fullBath
        })
    }
    handleHalfBath = (e) => {
        this.setState({
            halfBath: !this.state.halfBath
        })
    }
    handleCooling = () => {
        this.setState({
            cooling: !this.state.cooling
        })
    }
    handleHeating = (e) => {
        this.setState({
            heating: e
        })
    }
    handleParkingSpace = () => {
        this.setState({
            parkingSpace: !this.state.parkingSpace
        })
    }

    handleWalkout = () => {
        this.setState({
            walkout: !this.state.walkout
        })
    }
    handleStoryHouse = () => {
        this.setState({
            storiesOfHouse: !this.state.storiesOfHouse
        })
    }
    handleFinished = () => {
        this.setState({
            finished: !this.state.finished
        })
    }

    handleFlooring = () => {
        this.setState({
            flooring: !this.state.flooring
        })
    }
    handleFirePlace = () => {
        this.setState({
            fireplace: !this.state.fireplace
        })
    }
    handlePool = () => {
        this.setState({
            swimmingPool: !this.state.swimmingPool
        })
    }

    handleSearch = (e) => {
        this.setState({
            search: e
        }, () => {
            if (this.state.search === "") {
                this.getPropertyList()
            }
        })
        console.log(this.state.search)
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng =>{

                this.setState({
                    lat: latLng.lat,
                    lng:latLng.lng,
                    address: address
                })}
                )
            .catch(error =>
                console.error('Error', error)
            );

        this.getPropertyList()
    };

    getPropertyList = () => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('lat', this.state.lat ? this.state.lat : 0);
        formData.append('long', this.state.lng ? this.state.lng : 0);
        formData.append('zoom', this.state.zoom ?  this.state.zoom  : 12);
        formData.append('search', '');
        formData.append('searchFilter', this.state.filter);
        formData.append('min_price', this.state.minPrice);
        formData.append('max_price', this.state.maxPrice);
        formData.append('property_type', this.state.featureTypeId);
        formData.append('bathroom', this.state.totalBathRooms ? this.state.totalBathRooms : "");
        formData.append('bedroom', this.state.totalBedRooms ? this.state.totalBedRooms : "");
        formData.append('heating', this.state.heating);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "get-search-property", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    PropertyList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page
                })
                let Mapdata = [];
                this.state.PropertyList.map((item, idx) => {
                    item.property_detail.map((result, index) => {
                        Mapdata.push({
                            id: result.id,
                            country: result.country_name,
                            city: result.city,
                            street: result.state_name,
                            postcode: result.zip,
                            lat: result.lat,
                            lng: result.long
                        });
                    });
                })
               /* this.state.PropertyList.slice(0, 1).map((item, idx) => {
                    item.property_detail.map((result, index) => {
                       
                        this.setState({
                            lat: result.lat,
                            lng: result.long
                        })
                    });
                })*/
                this.setState({
                    Data: [
                        {
                            address: Mapdata
                        },
                    ],
                    Loader: false,
                })
            })
            .catch((error) => {
                this.setState({
                    Loader: false
                })
            });
    };
    handleFilter = (e) => {
        this.setState({
            filter: e,
        }, () => {

            this.getPropertyList()
        })
    }
    CancelFilter = () => {
        this.setState({
            search: "",
            hoaFree: "",
            featureTypeId: "",
            totalBathRooms: "",
            totalBedRooms: "",
            cooling: "",
            heating: "",
            flooring: "",
            fireplace: "",
            swimmingPool: "",
            minPrice: "",
            maxPrice: "",
            finished: "",
            parkingSpace: ""
        }, () => {
            this.getPropertyList()
        })
    }

    listenScrollEvent = e => {
        // if(this.state.PropertyList.length < 2)
        // {
        //     this.setState({
        //         scrolling:false
        //     })
        //     return false
        // }
        // if(this.state.scrolling){
        if (window.scrollY > 83) {
            this.setState({
                stickyheader: true
            })
        } else {
            this.setState({
                stickyheader: false
            })
        }
        // }
    }
    loadMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };
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
    removeToWishlist = (wishlist_id) => {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('wishlist_id', wishlist_id);
        axios
            .post(APIURL + "buyer/property-wishlist-remove", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
        this.getPropertyList()
    };
    goToProfile() {
        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }
        if (this.state.user) {
            if (this.state.user.user_type == "Agent") {
                window.location.href = "/agent";
            }
            else if (this.state.user.user_type == "Seller") {
                window.location.href = "/seller";
            }
            else if (this.state.user.user_type == "Admin") {
                window.location.href = "/Admin";
            }
            else {
                window.location.href = "/Buyer";
            }
        }
    }

    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };

    componentDidMount() {
        this.getProfileInfo()
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        window.addEventListener('scroll', this.listenScrollEvent)

        if (this.state.user) {
            if (this.state.user.user_type !== "Buyer") {
                this.setState({
                    disableWishList: true
                })
            }
        }
        let query = new URLSearchParams(this.props.location.search)
        const value = queryString.parse(this.props.location.search)

        console.log("lng " + value.lng)
        console.log("lat " + value.lat)
        if (value.search) {
            this.setState({
                search: value.search,
                lat: value.lat,
                lng: value.lng
            }, () => {
                this.getPropertyList();
            })
        }
        else {
            // this.getPropertyList();
        }
    }

    getMapChange(data){
       if(data[0].lat!=0)
       {
              this.setState({
                lat: data[0].lat,
                lng:data[0].lng,
                zoom:data[0].zoom
            }, () => {
                this.getPropertyList();
            })
       }
       
    
    }

	toggle(){
		this.setState({
			portrait:!this.state.portrait
		})
	}

    render() {

        if (this.state.redirect) {
            return <Redirect to="/signin" />;
        }

        let query = new URLSearchParams(this.props.location.search);

        return (
            <div className="resido-front">
                <div className="blue-skin">
                    <div id="main-wrapper">
                        <div className={this.state.stickyheader ? "header header-light head-border header-fixed" : "header header-light head-border"}>
                            <div className="container">
                            <nav id="navigation" className={this.state.portrait ? "navigation navigation-portrait":"navigation navigation-landscape"}>
							<div className="nav-header">
								{/* <Link className="nav-brand static-logo" to="/"><img src={logo} className="logo" alt="" /></Link> */}
								<Link className="nav-brand fixed-logo" to="/"><img src={logo} className="logo" alt="" /></Link>
								<div onClick={() => this.toggle()} className="nav-toggle"></div>
							</div>
							<div className={this.state.portrait ? "nav-menus-wrapper-open nav-menus-wrapper": "nav-menus-wrapper"} style={{ transitionProperty: this.state.portrait ? "left" : "none" }}>
								<span class="nav-menus-wrapper-close-button" onClick={() => this.toggle()}>✕</span>
								<ul className="nav-menu">
									<li ><Link to="/">Home</Link></li>
									<li className="active"><Link to="/Listing">Property</Link></li>
									{!this.state.disableWishList ? <li><Link to="/buyer/wishlist">Wishlist</Link></li> : ""}
									<li><a href="/cms/about-us">About Us</a></li>
									<li><Link to="/contact">Contact Us</Link></li>
								</ul>
								<ul className="nav-menu nav-menu-social align-to-right">
									<li className="d-none"><Link to=""><i className="far fa-heart mr-2 text-success"></i>Wishlist</Link></li>
									{this.state.user ?
										<li className="dropdown bg-transparent">
											<a className="dropdown-toggle text-success " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
											{
                                        this.state.noRecords &&
                                        <img  className='mr-1 rounded-circle' width={30} height={30} src={this.state.profile_image !== "" ? this.state.profile_image : face1} alt="profile" />
                                    }
												<span className='text-success' >{this.state.name}</span>
											</a>
											<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
												<li><Link className="dropdown-item" onClick={() => this.goToProfile()} ><i className="far fa-user mr-2 "></i>Profile</Link></li>
												<li><Link className="dropdown-item" onClick={() => this.onLogoutHandler()} to="/"><i className="fas fa-sign-out-alt mr-2"></i>Logout</Link></li>
											</ul>
										</li> :
										<li className=""> <Link to="/signin" ><i className="far fa-user-circle mr-2 text-success"></i>Sign In</Link> </li>
									}
									<li className="">
										{this.state.user ?
											""
											:
											<Link to="/signup" ><i className="far fa-user-circle mr-2 text-success"></i>Sign Up</Link>
										}
									</li>
								</ul>
							</div>
							{
								this.state.portrait ? 
								<div className='nav-overlay-panel'></div>
								:""
							}
						</nav>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="home-map-banner half-map">

                            <div className="fs-left-map-box" style={{ height: "300px" }}>
                                <div className="home-map fl-wrap">
                                    <div className="hm-map-container fw-map">
                                        <Map
                                            Data={this.state.Data}
                                            latlng={{
                                                lat: parseFloat(this.state.lat),
                                                lng: parseFloat(this.state.lng)
                                            }}
                                            getPropertyList={this.getPropertyList.bind(this)}
                                            getMapChange={this.getMapChange.bind(this)}
                                            stickyheader={this.state.stickyheader} />
                                    </div>
                                </div>
                            </div>

                            <div className="fs-inner-container">
                                <div className="fs-content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="_mp_filter mb-3 flex-wrap">
                                                <div className="_mp_filter_first">
                                                    <h4>Search</h4>
                                                    <div className="input-group">
                                                        <PlacesAutocomplete
                                                            value={this.state.address}
                                                            onChange={this.handleChange}
                                                            onSelect={this.handleSelect}
                                                        >
                                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                <div className="input-group">
                                                                    <input

                                                                        {...getInputProps({
                                                                            placeholder: 'Search Places',
                                                                            className: 'location-search-input form-control',
                                                                        })}
                                                                    />
                                                                    <div style={{ zIndex: "10" }} className="autocomplete-dropdown-container">
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
                                                                    <div className="input-group-append">
                                                                        <Button onClick={() => this.getPropertyList()} type="submit" className="input-group-text"><i className="fas fa-search"></i></Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </PlacesAutocomplete>
                                                    </div>
                                                </div>

                                                <div className="col-lg-3 col-sm-4 me-3 col-12">
                                                    <div className="select-arrow">
                                                        <select className="form-control" value={this.state.filter} onChange={(e) => this.handleFilter(e.target.value)} >
                                                            <option>Sort by</option>
                                                            <option value="high_to_low" >Price (High to Low)</option>
                                                            <option value="low_to_high">Price (Low to High)</option>
                                                            <option value="latest" >Latest Property</option>
                                                        </select>
                                                        <i className="fas fa-chevron-down"></i>
                                                    </div>
                                                </div>
                                                <div className="_mp_filter_last ms-auto">
                                                    <a className="map_filter" data-bs-toggle="collapse" href="#filtermap" role="button" aria-expanded="false" aria-controls="filtermap"><i className="fa fa-sliders-h mr-2"></i>Filter</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 mt-4">
                                            <div className="collapse" id="filtermap">
                                                <div className="row">
                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputEmail3">Minimum price ($)</label>
                                                        <Input className="form-control" value={this.state.minPrice} placeholder="Minimum price" onChange={(e) => this.handleMinPrice(e.target.value)} />

                                                    </div>
                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputEmail3">Maximum price ($)</label>
                                                        <Input className="form-control" value={this.state.maxPrice} placeholder="Maximum price" onChange={(e) => this.handleMaxPrice(e.target.value)} />
                                                    </div>

                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputPassword4">Number of Bedrooms</label>
                                                        <div className="select-arrow">
                                                            <select className="form-control" value={this.state.totalBedRooms} onChange={(e) => this.handleTotalBedrooms(e.target.value)} >
                                                                <option value="" >Select</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                            </select>
                                                            <i class="fas fa-chevron-down"></i>
                                                        </div>    
                                                    </div>


                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputName1">Number of Bathrooms </label>
                                                        <div className="select-arrow">
                                                            <select className="form-control" value={this.state.totalBathRooms} onChange={(e) => this.handleTotalBathRooms(e.target.value)} >
                                                                <option value="" >Select</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                            </select>
                                                            <i class="fas fa-chevron-down"></i>
                                                        </div>    
                                                    </div>
                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputEmail3">Heating</label>
                                                        <div className="select-arrow">
                                                            <select className="form-control" value={this.state.heating} onChange={(e) => this.handleHeating(e.target.value)} >
                                                                <option value="">Select</option>
                                                                <option value="0" >Electric</option>
                                                                <option value="1">Nature Gas</option>
                                                                <option value="2" >Propane</option>
                                                            </select>
                                                            <i class="fas fa-chevron-down"></i>
                                                        </div>    
                                                    </div>
                                                    <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        <label htmlFor="exampleInputEmail3">Feature Type</label>
                                                        <div className="select-arrow">                
                                                            <select className="form-control" value={this.state.featureTypeId} onChange={(e) => this.handleFeatureType(e.target.value)} >
                                                                <option value="">Select</option>
                                                                <option value="0" >Condo</option>
                                                                <option value="1">Apartment</option>
                                                                <option value="2" >Single Family</option>
                                                                <option value="3">Townhouse</option>
                                                            </select>
                                                            <i class="fas fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="form-group col-12 col-lg-6 col-sm-6">
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                                                        <div className="elgio_filter">
                                                            <div className="elgio_ft_first">
                                                                <button className="btn elgio_reset d-none">
                                                                    {/* Reset<span className="reset_counter">0</span> */}
                                                                </button>
                                                            </div>
                                                            <div className="elgio_ft_last">
                                                                <Button data-bs-toggle="collapse" href="#filtermap" role="button" aria-expanded="false" aria-controls="filtermap" onClick={this.CancelFilter} className="btn elgio_cancel mr-2">Cancel</Button>
                                                                <button data-bs-toggle="collapse" href="#filtermap" role="button" aria-expanded="false" aria-controls="filtermap" onClick={this.getPropertyList} className="btn elgio_result mr-2">Apply</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row list-layout">
                                        {this.state.PropertyList.length > 0 ? this.state.PropertyList.slice(0, this.state.limit).map((item, i) => (
                                            <div key={i} className="col-lg-12 col-md-6 col-sm-6 col-12">
                                                <div className="property-listing property-1">
                                                    <div className="listing-img-wrapper">
                                                        {item.propertyProfileImage.length > 0 && item.propertyProfileImage.map((sItem, idx) => (
                                                            <Link to={"/viewproperty/details/" + item.id}>
                                                                <img src={sItem.url_path} className="img-fluid mx-auto" alt="" />
                                                            </Link>
                                                        ))}
                                                        {
                                                            item.wishlist ?
                                                                <span onClick={() => this.addToWishlist(item, i, false)} className="wishlist-heart"><i className="fas fa-heart text-success"></i></span>
                                                                :
                                                                <span onClick={() => this.addToWishlist(item, i, true)} className="wishlist-heart"><i className="far fa-heart text-success"></i></span>
                                                        }
                                                    </div>

                                                    {item.property_detail.length > 0 && item.property_detail.map((sItem, idx) => (
                                                        <div className="listing-content">
                                                            <div>
                                                                <Link to={"/viewproperty/details/" + item.id}>
                                                                    <div className="listing-detail-wrapper-box">
                                                                        <div className="listing-detail-wrapper">
                                                                            <div className="listing-short-detail">
                                                                                <h4 className="listing-name ms-1">
                                                                                    {item.name}
                                                                                </h4>
                                                                                <div className="listing-locate">
                                                                                    <span className="listing-location"><i className="ti-location-pin"></i>{sItem.street_number}, {sItem.street_name}, {sItem.city === "null" ? "NA" : sItem.city}</span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                    <div className="price-features-wrapper">
                                                                        <div className="list-fx-features">
                                                                            <div className="listing-card-info-icon">
                                                                                <div className="inc-fleat-icon"><img src={bad} width="13" alt="" /></div>{sItem.number_of_bedrooms} Beds
                                                                            </div>
                                                                            <div className="listing-card-info-icon">
                                                                                <div className="inc-fleat-icon"><img src={bath} width="13" alt="" /></div>{sItem.number_of_bathrooms} Bath
                                                                            </div>
                                                                            <div className="listing-card-info-icon">
                                                                                <div className="inc-fleat-icon"><img src={move} width="13" alt="" /></div>{sItem.lot_size} sqft
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="listing-footer-wrapper">
                                                                        <div className="list-price">
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
                                                                        <div className="listing-detail-btn">
                                                                            {/* <Link to={"/viewproperty/details/" + item.id} className="more-btn">View</Link> */}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))
                                                    }
                                                </div>
                                                {/* </Link> */}
                                            </div>
                                        )) :
                                            <tr>
                                                <td colSpan="3" className="text-center">
                                                    No Property Available
                                                </td>
                                            </tr>
                                        }
                                        <div className="d-flex justify-content-center">
                                            {this.state.totalItemsCount > 0 &&
                                                <div className="pagination-rounded">
                                                    <Pagination
                                                        activePage={this.state.activePage}
                                                        itemsCountPerPage={this.state.limit}
                                                        totalItemsCount={this.state.totalItemsCount}
                                                        pageRangeDisplayed={5}
                                                        onChange={this.handlePageChange.bind(this)}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}
