import React, { Component } from 'react'
import logo from '../assets/img/logo.png'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
// import Button from '@restart/ui/esm/Button'
import { APIURL } from '../components/constants/common';
import { Spinner, Button } from 'reactstrap';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const options = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
];


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                language: "",
                introduction: "",
                license_number: "",
                password: "",
                c_password: "",
                address: "",
                city: "",
                street_name: "",
                street_number: "",
                zip_code: "",
                image: "",
                username: ""
            },
            image: "",
            ImageName: "",
            licenceImage: "",
            languages: [],
            selectecdLanguages: [],
            countrycode: "",
            countryId: "",
            countries: [0],
            States: [],
            stateId: "",
            user_type_id: 0,
            user_Type: "",
            selectType: "",
            msg: "",
            errMsg: {},
            scsMsg: "",
            user_types: [],
            redirect: false,
            isLoading: false,
            fullscrLoader: true,
            showPassword: false,
            Cofirm_showPassword: false,

        }
    }


    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData, errMsg: "" });
        console.log(signupData)
    };

    handleUserType = (e) => {
        this.setState({
            user_type_id: e
        })
    }

    //get language
    getLanguages() {
        axios
            .get(APIURL + "languages")
            .then((response) => {
                let languages = response.data.languages;
                for (var c = 0; c < languages.length; c++) {
                    this.state.languages.push({ value: languages[c].id, label: languages[c].name })
                }


                console.log(this.state.languages)
            })
    }


    handleLanguages = (selectedLanguages) => {
        this.setState({
            selectedLanguages: selectedLanguages
        });
    }

    getCountries() {
        axios
            .get(APIURL + "countries")
            .then((response) => {
                this.setState({
                    countries: response.data.countries
                })
            })
    }

    handleCountry(e) {
        this.setState({
            countryId: e
        }, () => {
            this.handleCountryState()
        })
        console.log(this.state.countryId)
    }

    handleCountryState = () => {
        console.log(this.state.countryId)
        axios
            .post(APIURL + "states", {
                country_id: this.state.countryId,
            })
            .then((response) => {
                console.log(response.data.states)
                this.setState({
                    States: response.data.states
                });
            })
            .catch((error) => {
                this.setState({
                    // isLoading: false,
                    // errMsg: error.response.data.error,
                })
                setTimeout(() => this.setState({ errMsg: "" }), 3000);
            });
    };


    handleState(e) {
        this.setState({
            stateId: e
        }, () => {
            this.handleCountryState()
        })
        console.log("stateId", this.state.stateId)
    }
    handleLicenceImage = (e) => {
        this.setState({
            licenceImage: e.target.files[0]
        })
        console.log(this.state.licenceImage)
    }
    handleUploadDoc = (e) => {
        this.setState({
            image: e.target.files[0],
            ImageName: e.target.files[0].name
        })

    }

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        // console.log(JSON.stringify(this.state.selectedOptions))
        e.preventDefault()
        const { signupData } = this.state;
        const user_type = parseInt(this.state.user_type_id) === 0 ? "buyer" : parseInt(this.state.user_type_id) === 1 ? "agent" : "seller"

        const formData = new FormData();
        formData.append('user_type', user_type);
        formData.append('username', this.state.signupData.username);
        formData.append('name', this.state.signupData.name);
        formData.append('last_name', this.state.signupData.last_name);
        formData.append('phone', this.state.signupData.phone);
        formData.append('email', this.state.signupData.email);
        formData.append('state', this.state.stateId);
        formData.append('country', this.state.countryId);
        formData.append('license_file_upload', this.state.image);
        formData.append('language', JSON.stringify(this.state.selectedLanguages) ? JSON.stringify(this.state.selectedLanguages) : "");
        formData.append('street_number', this.state.signupData.street_number);
        formData.append('street_name', this.state.signupData.street_name);
        formData.append('city', this.state.signupData.city ? this.state.signupData.city : "");
        formData.append('zip_code', this.state.signupData.zip_code ? this.state.signupData.zip_code : "");
        formData.append('password', this.state.signupData.password);
        formData.append('c_password', this.state.signupData.c_password);
        formData.append('license_number', this.state.signupData.license_number);
        formData.append('introduction', this.state.signupData.introduction);

        const success = this.props.location;
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "register", formData)
            .then((response) => {
                // console.log("register", response.data.accountVerified)
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false
                }, () => {
                    // this.SignUpSuccess(this.state.scsMsg)
                })
                localStorage.setItem("accountVerified", response.data.accountVerified);
                setTimeout(() => this.setState({
                    redirect: true
                }), 5000);
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    redirect: false,
                    errMsg: error.response.data.error,
                })

            });
    };
    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    Cofirm_showPassword() {
        this.setState({
            Cofirm_showPassword: !this.state.Cofirm_showPassword
        })
    }
    SignUpSuccess = (text) => toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored",
        onclick: this.redirect
    })
    componentDidMount() {
        window.scrollTo(0, 0);
        setTimeout(() => this.setState({ fullscrLoader: "" }), 500);
        this.getCountries();
        this.getLanguages();
        this.handleCountry(231);

    }
    toggle(){
		this.setState({
			portrait:!this.state.portrait
		})
	}
    render() {
        console.log(this.props)
        if (this.state.redirect) {
            return <Redirect to="/signin" push={true} />;
        }
        return (
            <div className="resido-front">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {this.state.fullscrLoader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                <div id="main-wrapper">
                    <div className="header header-light head-shadow">
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
									<li ><Link to="/Listing">Property</Link></li>
									{!this.state.disableWishList ? <li><Link to="/buyer/wishlist">Wishlist</Link></li> : ""}
									<li><a href="/cms/about-us">About Us</a></li>
									<li><Link to="/contact">Contact Us</Link></li>
								</ul>
								<ul className="nav-menu nav-menu-social align-to-right">
									<li className="d-none"><Link to=""><i className="far fa-heart mr-2 text-success"></i>Wishlist</Link></li>
									{this.state.user ?
										<li className="dropdown bg-transparent">
											<a className="dropdown-toggle text-success " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
											{/* {
                                        this.state.noRecords &&
                                        <img  className='mr-1 rounded-circle' width={30} height={30} src={this.state.profile_image !== "" ? this.state.profile_image : face1} alt="profile" />
                                    } */}
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

                    <div className="gray-simple">
                        <div className="col-12 col-lg-7 m-auto py-5 signupForm" role="document" >
                            <div className="" id="registermodal">
                                <div className="submit-page login-pop-form">
                                    <div className="card-body">
                                        <h2 className="mb-4" style={{ margin: "0px" }}>Sign Up</h2>
                                        {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                            {this.state.scsMsg}
                                        </div> : ""}
                                        <div className="row mt-3 mb-3">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="mb-3 d-flex justify-content-around select-arrow">
                                                    <div className="input-with-icon">
                                                        <select className="form-control" id="dropdown" onChange={(e) => this.handleUserType(e.target.value)} >
                                                            <option value="0"  >As a Buyer</option>
                                                            <option value="1"  >As a Agent</option>
                                                            <option value="2"  >As a Seller</option>
                                                        </select>
                                                        <span className="text-danger">{this.state.errMsg.user_type}</span>
                                                        <i className="ti-briefcase"></i>
                                                    </div>
                                                    <i className="fas fa-chevron-down"></i>
                                                    <span className="text-danger">{this.state.errMsg.user_type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="login-form">
                                            <form onSubmit={(e) => this.onSubmitHandler(e)}>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>First Name <strong className="text-danger" >*</strong></label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    autoFocus={true}
                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="First Name"
                                                                    value={this.state.signupData.name}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <i className="ti-user"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Surname <strong className="text-danger" ></strong></label>
                                                            <div className="input-with-icon">
                                                                <input

                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="last_name"
                                                                    placeholder="Surname"
                                                                    value={this.state.signupData.last_name}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <i className="ti-user"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.last_name}</span>
                                                        </div>
                                                    </div>
                                                    {parseInt(this.state.user_type_id) === 1 ?
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label> User Name <strong className="text-danger" ></strong></label>

                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="User Name"
                                                                        value={this.state.signupData.username}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <i className="fas fa-address-card"></i>
                                                                </div>
                                                                <span className="text-danger">{this.state.errMsg.username}</span>
                                                            </div>
                                                        </div>
                                                        : ""}
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Email Address<strong className="text-danger" >*</strong></label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder="Email Address"
                                                                    value={this.state.signupData.email}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <i className="ti-email"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.email}</span>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Country <strong className="text-danger" ></strong></label>
                                                            <div className="input-with-icon">
                                                                <select className="form-control" id="dropdown" onChange={(e) => this.handleCountry(e.target.value)}  >
                                                                    <option  >Select Country</option>
                                                                    {this.state.countries.length > 0 ?
                                                                        this.state.countries.map((item, idx) => (
                                                                            <option value={item.id} selected={item.id === 231}  >{item.name}</option>
                                                                        )) :
                                                                        <span></span>
                                                                    }
                                                                </select>
                                                                <i className="fas fa-globe-asia"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.country}</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>State </label>
                                                            <div className="input-with-icon">
                                                                <select className="form-control" id="dropdown" onChange={(e) => this.handleState(e.target.value)}  >
                                                                    <option>Select State</option>
                                                                    {this.state.States.length > 0 ?
                                                                        this.state.States.map((item, idx) => (
                                                                            <option value={item.id} >{item.name}</option>
                                                                        )) :
                                                                        <span></span>
                                                                    }
                                                                </select>
                                                                <i className="fas fa-city"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.state}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">

                                                            <label> City </label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    name="city"
                                                                    onkeypress="return isNumberKey(event)"
                                                                    placeholder="City"
                                                                    value={this.state.signupData.city}
                                                                    onChange={this.onChangehandler}
                                                                />

                                                                <i className="fas fa-city"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.city}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Street Number</label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="number"
                                                                    name="street_number"
                                                                    placeholder="Street Number"
                                                                    value={this.state.signupData.street_number}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <i className="fas fa-road"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.street_number}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Street Name</label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="street_name"
                                                                    placeholder="Street Name"
                                                                    value={this.state.signupData.street_name}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <i className="fas fa-road"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.street_name}</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">

                                                            <label> Zip </label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="number"
                                                                    min="0"
                                                                    name="zip_code"
                                                                    onkeypress="return isNumberKey(event)"
                                                                    placeholder="Zip"
                                                                    value={this.state.signupData.zip_code}
                                                                    onChange={this.onChangehandler}
                                                                />

                                                                <i className="fas fa-mail-bulk"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.zip_code}</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">

                                                            <label> Phone Number <strong className="text-danger" >*</strong></label>
                                                            <div className="input-with-icon">
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="number"
                                                                    min="0"
                                                                    name="phone"
                                                                    onkeypress="return isNumberKey(event)"
                                                                    placeholder="Phone Number"
                                                                    value={this.state.signupData.phone}
                                                                    onChange={this.onChangehandler}
                                                                />

                                                                <i className="lni-phone-handset"></i>
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.phone}</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12">
                                                        <div className="form-group">
                                                            <label> Language <strong className="text-danger" ></strong></label>
                                                            <div className="input-with-icon">
                                                                <Select
                                                                    isMulti
                                                                    placeholder="Select Language"
                                                                    value={this.state.selectedLanguages}
                                                                    onChange={this.handleLanguages}
                                                                    options={this.state.languages}
                                                                />


                                                                {/* <i className="fas fa-language"></i> */}
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.language}</span>
                                                        </div>
                                                    </div>

                                                    {parseInt(this.state.user_type_id) === 1 ?
                                                        <div className="col-lg-12 col-md-6">
                                                            <div className="form-group">
                                                                <label> License Image<strong className="text-danger"></strong></label>
                                                                <div className='mt-2 mb-2' style={{ color: "blue" }} >{this.state.ImageName}</div>
                                                                <div className="">
                                                                    <div className="license-uplode">
                                                                        <input
                                                                            type="file"
                                                                            onChange={this.handleUploadDoc}
                                                                            className="form-control "
                                                                            id="fileinput"
                                                                            style={{ lineHeight: "2.1" }}
                                                                        />
                                                                        <label htmlFor="fileinput"> <i className="fas fa-plus-circle mr-2"></i> License Upload</label>                                                                    </div>
                                                                    {/* <i className="fas fa-address-card"></i> */}
                                                                    <span style={{ color: "#485d94" }}> (Only png, jpg, jpeg format and size upto 2 MB is allowed)</span><br />

                                                                </div>
                                                                <span className="text-danger">{this.state.errMsg.license_number}</span>
                                                            </div>
                                                        </div>
                                                        : ""}
                                                    {parseInt(this.state.user_type_id) === 1 ?
                                                        <div className="col-lg-12 col-md-6">
                                                            <div className="form-group">
                                                                <label> License Number <strong className="text-danger" ></strong></label>

                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type="number"
                                                                        min="0"
                                                                        name="license_number"
                                                                        placeholder="License number"
                                                                        value={this.state.signupData.license_number}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <i className="fas fa-address-card"></i>
                                                                </div>
                                                                <span className="text-danger">{this.state.errMsg.license_number}</span>
                                                            </div>
                                                        </div>
                                                        : ""}
                                                    {
                                                        parseInt(this.state.user_type_id) === 1 ?
                                                            <div className="col-lg-12 col-md-6">
                                                                <div className="form-group">
                                                                    <label> Introduction <strong className="text-danger" ></strong></label>

                                                                    <div className="input-with-icon">
                                                                        <textarea
                                                                            className="form-control"
                                                                            required=""
                                                                            type="textarea"
                                                                            name="introduction"
                                                                            placeholder="Introduction"
                                                                            value={this.state.signupData.introduction}
                                                                            onChange={this.onChangehandler}
                                                                        >
                                                                        </textarea>
                                                                        <span className="text-danger">{this.state.errMsg.introduction}</span>

                                                                        <i className="fas fa-info info-sp"></i>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.introduction}</span>

                                                                </div>
                                                            </div>
                                                            : ""
                                                    }
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label> Password <strong className="text-danger" >*</strong></label>

                                                            <div className="position-relative">
                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type={this.state.showPassword ? "text" : "password"}
                                                                        name="password"
                                                                        placeholder="Password"
                                                                        value={this.state.signupData.password}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <i className="ti-unlock"></i>
                                                                </div>
                                                                {this.state.showPassword ?
                                                                    <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                    :
                                                                    <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                                                }
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.password}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label> Confirm Password <strong className="text-danger" >*</strong></label>
                                                            <div className="position-relative">
                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type={this.state.Cofirm_showPassword ? "text" : "password"}
                                                                        name="c_password"
                                                                        placeholder="Confirm Password"
                                                                        value={this.state.signupData.c_password}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <i className="ti-unlock"></i>
                                                                </div>
                                                                {this.state.Cofirm_showPassword ?
                                                                    <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                    :
                                                                    <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye"></i> </span>
                                                                }
                                                            </div>
                                                            <span className="text-danger">{this.state.errMsg.c_password}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Button
                                                        type="submit"
                                                        // onSubmit={() => this.onSubmitHandler()}
                                                        className="btn btn-md full-width btn-theme-light-2 rounded mt-4"
                                                    >
                                                        Sign Up
                                                        {this.state.isLoading ? (
                                                            <span
                                                                className="spinner-border spinner-border-sm ml-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="text-center">
                                            <p className="mt-3 fw-bold">
                                                <i className="ti-user mr-1"></i>
                                                Already Have An Account?
                                                <Link to="/signin" className="link ms-2">Go For LogIn</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
