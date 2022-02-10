import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import { Button, Spinner } from 'reactstrap'
import Select from 'react-select'
import { Redirect } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loader: false,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            userInfo: {
                name: "",
                LastName: "",
                email: "",
                phone: "",
                state: "",
                language: "",
                stateId: "",
                image: "",
                address: "",
                streetName: "",
                streetNumber: "",
                City: "",
                Zip: "",
            },
            phone: "",
            countryId: "",
            countries_name: [],
            countrySelected: {},
            languages: [],
            Countries: [],
            States: [],
            state_name: [],
            state: "",
            name: "",
            LastName: "",
            image: "",
            selectType: "",
            msg: "",
            errMsg: {},
            scsMsg: "",
            country_id: "",
            selectedLanguages: [],
            Loader: true,
            toggle: false
        }
        this.handlephone = this.handlephone.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getProfileInfo()
        this.getCountries()
        this.getLanguages()
        setTimeout(() => {
            this.setState({
                Loader: false
            })
        }, 500);
    }

    //form handler

    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({ userInfo });
        console.log(userInfo)
    };


    //profile information
    getProfileInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.state.user.id);
            var token = this.state.token
            var app_url = APIURL + "buyer/edit-profile"
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
                            LastName: info.last_name,
                            email: info.email,
                            phone: info.phone,
                            streetNumber: info.street_number === "null" ? "" : info.street_number,
                            streetName: info.street_name === "null" ? "" : info.street_name,
                            City: info.city === "null" ? "" : info.city,
                            Zip: info.zip_code === "null" ? "" : info.zip_code,
                            // address: info.address,
                            introduction: info.introduction,
                            license_number: info.license_number
                        },
                        phone: info.phone,
                        profile_image: response.data.data.profile_image,
                        Lang_id: response.data.data.language,
                        countryId: response.data.data.country,
                        language: response.data.data.language,
                        state: response.data.data.state
                    })
                    this.handleCountryState(this.state.countryId)
                    console.log("sssssssss", this.state.language)
                })
                .catch((error) => {
                    this.setState({
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
                // this.setState({
                //     languages: response.data.languages
                // })

                console.log(this.state.languages)
            })
    }

    handleLanguages = (selectedLanguages) => {
        this.setState({ selectedLanguages });
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

    handlephone(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ phone: e.target.value })
        }
    }

    //    update  profile submit handler

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        this.setState({ Loader: true })
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('name', this.state.userInfo.name);
        formData.append('last_name', this.state.userInfo.LastName);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.userInfo.email);
        formData.append('state', this.state.state);
        formData.append('country', this.state.countryId);
        formData.append('profile_image', this.state.image);
        formData.append('language', JSON.stringify(this.state.selectedLanguages));
        formData.append('street_number', this.state.userInfo.streetNumber);
        formData.append('street_name', this.state.userInfo.streetName);
        formData.append('city', this.state.userInfo.City);
        formData.append('zip_code', this.state.userInfo.Zip);
        formData.append('license_number', this.state.userInfo.license_number);
        formData.append('introduction', this.state.userInfo.introduction);
        formData.append('id', user.id);
        formData.append('user_type', user.user_type);
        axios
            .post(APIURL + "buyer/update-profile", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    errMsg: {},
                    Loader: false
                }, () => {
                    this.UpdateSuccessfully(this.state.scsMsg)
                })
                this.getProfileInfo()
                setTimeout(() => {
                    this.setState({ scsMsg: "" })
                    // window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.log("errr", error.response.data.error)
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
    toggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    toggleFunChild(value) {
        this.setState({
            toggle: value
        })
    }
    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.user_type !== "Buyer") {
            return <Redirect to="/permission" />;
        }
        return (
            <>
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
                    {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                    <div className="blue-skin dashboard">
                        <div id="main-wrapper">
                            <Navbar data={{ profile_image: this.state.profile_image }} />
                            <div className="clearfix"></div>
                            <Header />
                            <section className="bg-light">
                                <div className="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="filter_search_opt">
                                                <a href="javascript:void(0);" onClick={() => this.toggle()} >Dashboard Navigation<i class="ml-2 ti-menu"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-12">
                                            <Sidebar
                                                activePage="profile"
                                                toggleFunChild={this.toggleFunChild.bind(this)}
                                                toggle={this.state.toggle}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <div className="dashboard-wraper">
                                                <div className="form-submit">
                                                    <h4>My Profile</h4>
                                                    <div className="submit-section">
                                                        <div className="row">

                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label> First Name <strong className="text-danger" >*</strong></label>
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
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label> Surname <strong className="text-danger" >*</strong></label>
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="LastName"
                                                                    placeholder="Surname"
                                                                    value={this.state.userInfo.LastName}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.last_name}</span>
                                                            </div>

                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Email Address <strong className="text-danger" >*</strong></label>
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
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Profile Image</label>
                                                                <input
                                                                    type="file"
                                                                    onChange={this.handleChangeLogo}
                                                                    className="form-control"
                                                                    id="fileinput"
                                                                    style={{ lineHeight: "2.1" }}

                                                                />
                                                                <span style={{ color: "#485d94" }}> (Only png, jpg, jpeg format and size upto 2 MB is allowed)</span><br />

                                                                <span className="text-danger">{this.state.errMsg.profile_image}</span>
                                                            </div>

                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Language</label>
                                                                <Select
                                                                    isMulti
                                                                    placeholder="Select Language"
                                                                    value={this.state.selectedLanguages}
                                                                    onChange={this.handleLanguages}
                                                                    options={this.state.languages}
                                                                />
                                                                {/* <select className="form-control" autoFocus={true} value={this.state.Lang_id} onChange={(e) => this.handleLanguages(e.target.value)} >
                                                                    <option value="">Select</option>
                                                                        {this.state.Languages.map((option) => (
                                                                            <option value={option.value}>{option.label}</option>
                                                                        ))}
                                                                    </select> */}
                                                                <span className="text-danger">{this.state.errMsg.language}</span>                                                    </div>
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Country</label>
                                                                <select className="form-control" autoFocus={true} value={this.state.countryId} onChange={(e) => this.handleCountry(e.target.value)} >
                                                                    <option value="">Select-Country</option>
                                                                    {this.state.Countries.map((option) => (
                                                                        <option value={option.value}>{option.label}</option>
                                                                    ))}
                                                                </select>
                                                                <span className="text-danger">{this.state.errMsg.country}</span>
                                                            </div>

                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>State</label>
                                                                <select className="form-control" autoFocus={true} value={this.state.state} onChange={(e) => this.handleState(e.target.value)} >
                                                                    <option value="" >Select-State</option>
                                                                    {this.state.States.map((option) => (
                                                                        <option value={option.value}>{option.label}</option>
                                                                    ))}
                                                                </select>

                                                                <span className="text-danger">{this.state.errMsg.state}</span>
                                                            </div>
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>City</label>
                                                                <input
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
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Street Number</label>
                                                                <input
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
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Street Name</label>
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="streetName"
                                                                    placeholder="Street Name"
                                                                    value={this.state.userInfo.streetName}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.street_number}</span>
                                                            </div>
                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Zip</label>
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="number"
                                                                    name="Zip"
                                                                    placeholder="Zip"
                                                                    value={this.state.userInfo.Zip}
                                                                    onChange={this.onChangehandler}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.zip_code}</span>

                                                            </div>

                                                            <div className="form-group col-md-6 col-sm-6 col-12">
                                                                <label>Phone Number <strong className="text-danger" >*</strong></label>
                                                                <input
                                                                    className="form-control"
                                                                    name="phone"
                                                                    placeholder="Phone Number"
                                                                    value={this.state.phone}
                                                                    // onChange={this.handlephone()}
                                                                    onChange={this.handlephone}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.phone}</span>
                                                            </div>
                                                            {/* <div className='text-success'>{this.state.scsMsg}</div> */}
                                                            <div className=" col-md-12">
                                                                <Button
                                                                    color="btn btn-theme-light-2 rounded"

                                                                    onClick={() => this.onSubmitHandler()}
                                                                >Update</Button>
                                                            </div>
                                                        </div>
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
            </>
        )
    }
}
