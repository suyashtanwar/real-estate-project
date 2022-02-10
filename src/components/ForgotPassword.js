import React, { Component } from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Spinner ,    Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { APIURL } from '../components/constants/common';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            scsMsg: "",
            errMsg: "",
            redirect: false
        };
    }
    handleUserName = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "password/reset", {
                email: this.state.email,
            })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    isLoading:false,
                    scsMsg: response.data.message
                });
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);
                setTimeout(() => this.setState({ redirect: true }), 4000);
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    isLoading: false,
                    errMsg: error.response.data,
                })
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/signin" />;
        }
        return (
            <div className="resido-front">
                {/* {this.state.isLoading ? <div className="loader"> <Spinner type="grow" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""} */}
                <div id="main-wrapper">
                    <div className="header header-light head-shadow">
                        <div className="container">
                            <nav id="navigation" className="navigation navigation-landscape">
                                <div className="nav-header">
                                    <a className="nav-brand" href="#">
                                        <img src={logo} className="logo" alt="" />
                                    </a>
                                    <div className="nav-toggle"></div>
                                </div>
                                <div className="nav-menus-wrapper" style={{ transitionProperty: "none" }}>
                                    <ul className="nav-menu">
                                    <li ><Link to="/">Home</Link></li>
									<li ><Link to="/Listing">Property</Link></li>
									<li><Link to="/buyer/wishlist">Wishlist</Link></li>
									<li><a href="/cms/about-us">About Us</a></li>
									<li><Link to="/contact">Contact Us</Link></li>
                                    </ul>

                                    <ul className="nav-menu nav-menu-social align-to-right">
                                        <li>
                                            <Link to="/signup" className="text-success">
                                                <i className="fas fa-user-circle mr-2"></i>Sign Up</Link>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="gray-simple">
                        <div className="login-pop-form col-12 col-lg-5 m-auto py-5" role="document">
                            <div className="" id="registermodal">
                                <div className="submit-page login-pop-form">
                                    <div className="card-body">
                                        <h2 className="mb-4">Forgot Password</h2>
                                        {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                            {this.state.scsMsg}
                                        </div> : ""}
                                        <div className="login-form">
                                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                                <div className="form-group">
                                                    <label>Email Address <sup className="text-danger fw-medium f-14">*</sup></label>
                                                    <div className="input-with-icon">
                                                        <input
                                                            className="form-control"
                                                            required=""
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Enter Address"
                                                            value={this.state.email}
                                                            onChange={this.handleUserName}
                                                        />

                                                        <i className="ti-user"></i>
                                                    </div>
                                                    <span className="text-danger">{this.state.errMsg.errors}</span>
                                                </div>


                                                <div className="form-group">
                                                    <Button
                                                        type="submit"
                                                        className="mt-4 btn btn-md full-width btn-theme-light-2 rounded"
                                                    >
                                                        Submit
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
                                        <div className="modal-divider"><span>Or </span></div>
                                        <div className="text-center">
                                            <p className="mt-3 fw-bold"><Link to="/signin" className="link" style={{ listStyleType: "none" }}>Go To Login</Link></p>
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
