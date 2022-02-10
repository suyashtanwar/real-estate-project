import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import { Button, Input ,Spinner } from 'reactstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            userInfo: {
                name: "",
                lastName:"",
                email: "",
                phone: "",
                state: "",
                language: "",
                stateId: "",
                image: "",
                address: "",
                streetName:"",
                streetNumber:"",
                City:"",
                Zip:"",
            },
            countryId: "",
            countries_name: [],
            countrySelected: {},
            languages:[],
            Countries: [],
            States: [],
            state_name: [],
            state: "",
            name: "",
            image: "",
            selectType: "",
            msg: "",
            errMsg: {},
            scsMsg: "",
            country_id: "",
            profile_image: "",
            selectedLanguages:[],
            Loader:true,
            activeSide:false
        }
        
        this.handlephone = this.handlephone.bind(this)
    }

    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    //form handler

    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({
            userInfo,
            errMsg: ""
        });
        console.log(userInfo)
    };


    //profile information
    getProfileInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.state.user.id);
            var token = this.state.token
            var app_url = APIURL+"seller/edit-profile"
            axios
                .post(app_url, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    let list = response.data.data.language_data;
                    let selectedLanguages = []
                    for (var c = 0; c < list.length; c++) {
                        selectedLanguages.push({ "value": list[c].value, "label": list[c].label })
                    }
                    this.setState({
                        selectedLanguages: selectedLanguages
                    })

                    this.setState({
                        name: response.data.data.name,
                        userInfo: {
                            name: info.name,
                            lastName: info.last_name,
                            email: info.email,
                            phone: info.phone,
                            streetNumber: info.street_number === "null" ? "" :info.street_number,
                            streetName: info.street_name === "null" ? "" :info.street_name,
                            City: info.city  === "null" ? "" : info.city,
                            Zip: info.zip_code === "null" ? "" :info.zip_code,
                            // address: info.address,
                            // introduction: info.introduction,
                            // license_number: info.license_number
                        },
                        phone: info.phone,
                        profile_image: response.data.data.profile_image,
                        // email: response.data.data.email,
                        selectedOptions: JSON.stringify(response.data.data.language),
                        countryId: response.data.data.country,
                        language: response.data.data.language,
                        state: response.data.data.state
                    })
                    this.handleCountryState(this.state.countryId)
                    console.log("sssssssss", this.state.userInfo.City)
                })
                .catch((error) => {
                    this.setState({
                        // errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }
    //    get languages

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
        this.setState({ selectedLanguages });
    }
  
handlephone(e){
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({phone: e.target.value})
    }
}

    getCountries() {
        axios
            .get(APIURL + "countries")
            .then((response) => {
                let countries_name = response.data.countries;
                const CountryNames = [];
                for (var c = 1; c < countries_name.length; c++) {
                    CountryNames.push({ value: countries_name[c].id, label: countries_name[c].name })
                }
                this.setState({
                    Countries: CountryNames,
                })
                console.log(this.state.Countries)
            })
    }

    handleCountry(e) {
        this.setState({
            countryId: e
        }, () => {
            console.log(this.state.countryId)
            this.handleCountryState(e)
        })
    };

    // get states
    handleCountryState = (id) => {
        axios
            .post(APIURL + "states", {
                country_id: id,
            })
            .then((response) => {
                console.log(response.data)
                let state_name = response.data.states;
                const stateNames = [];
                for (var c = 0; c < state_name.length; c++) {
                    stateNames.push({ value: state_name[c].id, label: state_name[c].name })
                }
                this.setState({
                    States: stateNames,
                })
            })
            .catch((error) => {
                this.setState({

                })
            });
    };

    // handle states
    handleState(e) {
        this.setState({
            state: e
        })
    }
    //profile image change handler
    handleChangeLogo = (e) => {
        this.setState({
            image: e.target.files[0]
        })
        console.log(this.state.image)
    }

    //    update  profile submit handler

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token

        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('name', this.state.userInfo.name);
        formData.append('last_name', this.state.userInfo.lastName);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.userInfo.email);
        formData.append('state', this.state.state);
        formData.append('country', this.state.countryId);
        formData.append('profile_image', this.state.image);
        formData.append('street_number', this.state.userInfo.streetNumber);
        formData.append('street_name', this.state.userInfo.streetName);
        formData.append('city', this.state.userInfo.City);
        formData.append('zip_code', this.state.userInfo.Zip);
        formData.append('language', JSON.stringify(this.state.selectedLanguages));
        formData.append('address', this.state.userInfo.address);
        formData.append('id', user.id);
        formData.append('user_type', user.user_type);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/update-profile", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    errMsg: {},
                    scsMsg:response.data.message
                }, () => {
                    this.UpdateSuccessfully(this.state.scsMsg)
                    setTimeout(() => {
                        this.setState({
                            scsMsg:""
                        })
                        window.location.reload();
                    }, 3000);
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };

    UpdateSuccessfully = (e) => toast.success(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored"
        })

    componentDidMount() {
        window.scrollTo(0,0);
        this.getProfileInfo()
        this.getCountries()
        this.getLanguages()
        setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
    }
   
    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if(this.state.user_type !== "Seller"){
            return <Redirect to="/permission" />;
        }
        return (
            <>
               <div className="container-scroller  resido-admin">
               {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}             
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
                <Navbar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}
                data={{ profile_image: this.state.profile_image }} 
        
                 />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar ideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}
                        data={{ profile_image: this.state.profile_image }} 
                        activePage="profile"
                        toggle={this.state.toggle}
                         />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                 <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">MY PROFILE</h4>   
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">

                                            <div className="card">
                                                <div className="card-body">
                                                    {/* <h4 className="card-title">Seller Profile </h4> */}
                                                    {/* <p className="card-description"> Seller</p> */}
                                                    <form className="forms-sample">
                                                        <div className="row">
                                                            <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleInputName1">First Name <strong className="text-danger" >*</strong></label>
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="name"
                                                                        placeholder="First Name"
                                                                        value={this.state.userInfo.name}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.name}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleInputName1">Surname <strong className="text-danger" >*</strong></label>
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="lastName"
                                                                        placeholder="Surname"
                                                                        value={this.state.userInfo.lastName}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.last_name}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleInputEmail3">Email Address <strong className="text-danger" >*</strong></label>
                                                                    <input
                                                                        className="form-control"
                                                                        required=""
                                                                        disabled
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email Address"
                                                                        value={this.state.userInfo.email}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                                                </div>

                                                            
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label>Profile Image</label>
                                                                    <div className="">
                                                                        <Input
                                                                            type="file"
                                                                            onChange={this.handleChangeLogo}
                                                                            className="form-control"
                                                                            id="fileinput"
                                                                            style={{ height: "100%" }}
                                                                        />
                                                                    <span style={{color:"#485d94"}}> (Only png, jpg, jpeg format and size upto 2 MB is allowed)</span><br />
                                                                        <span className="text-danger">{this.state.errMsg.profile_image}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label>Language</label>
                                                                    <div className="">
                                                                    <Select
                                                                        isMulti
                                                                        placeholder="Select Language"
                                                                        value={this.state.selectedLanguages}
                                                                        onChange={this.handleLanguages}
                                                                        options={this.state.languages}
                                                                    />
                                                                        {/* <select className="form-control" value={this.state.Lang_id} onChange={(e) => this.handleLanguages(e.target.value)} >
                                                                            <option value="">Select</option>
                                                                            {this.state.Languages.map((option) => (
                                                                                <option value={option.value}>{option.label}</option>
                                                                            ))}
                                                                        </select> */}
                                                                        <span className="text-danger">{this.state.errMsg.language}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleInputCity1">Country </label>
                                                                    <select className="form-control" value={this.state.countryId} onChange={(e) => this.handleCountry(e.target.value)} >
                                                                        <option value="">Country</option>
                                                                        {this.state.Countries.map((option) => (
                                                                            <option value={option.value}>{option.label}</option>
                                                                        ))}
                                                                    </select>


                                                                    <span className="text-danger">{this.state.errMsg.country}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleInputCity1">State</label>
                                                                    <select className="form-control" value={this.state.state} onChange={(e) => this.handleState(e.target.value)} >
                                                                        <option value="" >State</option>
                                                                        {this.state.States.map((option) => (
                                                                            <option value={option.value}>{option.label}</option>
                                                                        ))}
                                                                    </select>

                                                                    <span className="text-danger">{this.state.errMsg.state}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleTextarea1">City</label>
                                                                    <input
                                                                        rows="1"
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="City"
                                                                        placeholder="City"
                                                                        value={this.state.userInfo.City}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    
                                                                    <span className="text-danger">{this.state.errMsg.city}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleTextarea1">Street Number</label>
                                                                    <textarea
                                                                        rows="4"
                                                                        className="form-control"
                                                                        required=""
                                                                        type="number"
                                                                        name="streetNumber"
                                                                        placeholder="Street Number"
                                                                        value={this.state.userInfo.streetNumber}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    
                                                                    <span className="text-danger">{this.state.errMsg.street_number}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleTextarea1">Street Name</label>
                                                                    <input
                                                                        rows="4"
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="streetName"
                                                                        placeholder="Street Name"
                                                                        value={this.state.userInfo.streetName}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.street_name}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleTextarea1">Zip code</label>
                                                                    <input
                                                                        rows="4"
                                                                        className="form-control"
                                                                        required=""
                                                                        type="text"
                                                                        name="Zip"
                                                                        placeholder="Zip code"
                                                                        value={this.state.userInfo.Zip}
                                                                        onChange={this.onChangehandler}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.zip_code}</span>
                                                                </div>
                                                                <div className="form-group col-lg-6 col-12 col-sm-6">
                                                                    <label htmlFor="exampleSelectGender">Phone Number<strong className="text-danger" >*</strong></label>
                                                                    <input
                                                                        className="form-control"
                                                                        name="phone"
                                                                        placeholder="Phone Number"
                                                                        value={this.state.phone}
                                                                        onChange={this.handlephone}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.phone}</span>
                                                            </div>
                                                        </div>
                                                        {/* <div className='text-danger mb-2'>{this.state.scsMsg}</div> */}
                                                        <Button
                                                            color="info"
                                                            className="mr-2"
                                                            onClick={() => this.onSubmitHandler()}
                                                        >Update</Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="footer">
                                <div className="container-fluid clearfix">
                                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © website.com 2021</span>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
