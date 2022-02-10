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
            userInfo: {
                email: "",
                password: "",
                password_confirmation: ""
            },
            errMsg: "",
            showPassword: false,
            Cofirm_showPassword: false,
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
    };



    onSubmitHandler = (e) => {
        e.preventDefault()
        const params = this.props.match.params;
        this.setState({ Loader: true });
        axios
            .post(APIURL + "password/reset/update", {
                token: params.token,
                email: this.state.userInfo.email,
                password: this.state.userInfo.password,
                password_confirmation: this.state.userInfo.password_confirmation,
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    scsMsg: response.data.message,
                });
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);
                setTimeout(() => this.setState({ redirect: true }), 4000);
            })
            .catch((error) => {
                console.log(error.response.data.error)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
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

    render() {
        console.log(this.props)
        if (this.state.redirect) {
            return <Redirect to="/signin" />;
        }
        return (
            <div>
                <div id="main-wrapper" className="resido-front">
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
                                        <h2 className="mb-4">Reset Password</h2>
                                        {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                            {this.state.scsMsg}
                                        </div> : ""}
                                        <div className="login-form">
                                            <form onSubmit={(e) => this.onSubmitHandler(e)}>
                                                <div className="form-group">
                                                    <label>Email Address <strong className="text-danger" >*</strong></label>
                                                    <div className="input-with-icon">
                                                        <input
                                                            className="form-control"
                                                            required=""
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email Address"
                                                            value={this.state.email}
                                                            onChange={this.onChangehandler}
                                                        />
                                                        <span className="text-danger">{this.state.errMsg.email}</span>
                                                        <i className="ti-user"></i>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>New Password <strong className="text-danger" >*</strong></label>
                                                    <div className="position-relative">
                                                        <div className="input-with-icon">
                                                            <input
                                                                className="form-control"
                                                                required=""
                                                                type={this.state.showPassword ? "text" : "password"}
                                                                name="password"
                                                                placeholder="New Password"
                                                                value={this.state.password}
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
                                                <div className="form-group">
                                                    <label>Confirm Password <strong className="text-danger" >*</strong></label>
                                                    <div className="position-relative">
                                                        <div className="input-with-icon">
                                                            <input
                                                                className="form-control"
                                                                required=""
                                                                type={this.state.Cofirm_showPassword ? "text" : "password"}
                                                                name="password_confirmation"
                                                                placeholder="Confirm Password"
                                                                value={this.state.password_confirmation}
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
                                                    <span className="text-danger">{this.state.errMsg.password_confirmation}</span>
                                                </div>


                                                <div className="form-group">
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-md full-width btn-theme-light-2 rounded mt-4"
                                                    >
                                                        Submit
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
