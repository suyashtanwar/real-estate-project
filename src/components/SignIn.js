import React, { Component } from 'react'
// import '../frontend_css/'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Spinner, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { APIURL, BASEURL } from '../components/constants/common';
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errMsgEmail: "",
            errMsgPwd: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsg: [],
            scsMsg: "",
            showPassword: false,
            modal: false,
            fullScrLoader: true,
            user: JSON.parse(localStorage.getItem("userData")),
            accountVerified: true,
            scsMsgResend: "",
            ActiveMsg: "",
            stylePath: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangehandler = (e) => {
        console.log(e)
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
        console.log(data)
    };

    handleUserName(e) {
        console.log(e)
        this.setState({
            userName: e
        })
        console.log(this.state.userName)
    }

    handlePassword(e) {
        console.log(e)
        this.setState({
            password: e
        })
        console.log(this.state.password)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                })
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user_type", JSON.stringify(response.data.user.user_type));
                this.setState({
                    redirect: true,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    accountVerified: error.response.data.accountVerified,
                    errMsg: error.response.data.error,
                })
                setTimeout(() => this.setState({ errMsg: "" }), 5000);
            });
    }

    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }


    resendActivationMail = () => {
        axios
            .post(APIURL + "resend/email", {
                email: this.state.email,
            })
            .then((response) => {
                this.setState({
                    scsMsgResend: response.data.message,
                    errMsg: ""
                })
            });
    }


    ActivationMsg = () => {
        const params = this.props.match.params
        // console.log(params.id)
        if (params.token) {
            axios
                .get(APIURL + "email/verify/" + params.token)
                .then((response) => {

                    this.setState({
                        ActivationMsg: response.data.message
                    })
                    setTimeout(() => this.setState({ ActivationMsg: false }), 4000);

                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.error,
                    })

                });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.ActivationMsg()
        setTimeout(() => this.setState({
            fullScrLoader: false
        }), 500);
    }

    toggle(){
		this.setState({
			portrait:!this.state.portrait
		})
	}
    render() {
        console.log(this.props)
        const { user } = this.state;
        if (this.state.redirect) {
            return <Redirect to="/checkuser" />;
        }
        return (
            <div className="resido-front">
                {this.state.fullScrLoader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
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
                        <div className="login-pop-form col-12 col-lg-5 m-auto py-5" role="document">
                            <div className="" id="registermodal">
                                <div className="submit-page login-pop-form">
                                    <div className="card-body">
                                        <h2 className="mb-4">Log In</h2>
                                        {this.state.errMsg.message ?
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errMsg.message}<br />
                                                {this.state.accountVerified ? "" :
                                                    <a className="text-secondary font-weight-bold " onClick={this.resendActivationMail} href="javascript:;">Resend Verification Link</a>
                                                }
                                            </div> : ""
                                        }
                                        {/* blocking Message */}
                                        {this.state.errMsg.block_account ?
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errMsg.block_account}
                                            </div> : ""
                                        }
                                        {/* success msg */}
                                        {this.state.scsMsgResend ?
                                            <div className="alert alert-success" role="alert">
                                                {this.state.scsMsgResend}
                                            </div> : ""
                                        }

                                        {/* activtion msg */}
                                        {this.state.ActivationMsg ?
                                            <div className="alert alert-success" role="alert">
                                                {this.state.ActivationMsg}
                                            </div> : ""
                                        }
                                        {/* <span className="text-danger"></span> */}
                                        <div className="login-form">
                                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                                <div className="form-group">
                                                    <label>Email Address <strong className="text-danger" >*</strong></label>
                                                    <div className="input-with-icon">
                                                        <input
                                                            autoFocus={true}
                                                            className="form-control"
                                                            required=""
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Email Address "
                                                            value={this.state.email}
                                                            onChange={this.onChangehandler}
                                                        />
                                                        <i className="ti-user"></i>
                                                    </div>
                                                    <span className="text-danger">{this.state.errMsg.email}</span>

                                                </div>

                                                <div className="form-group">
                                                    <label>Password <strong className="text-danger" >*</strong></label>
                                                    <div className="position-relative">
                                                        <div className="input-with-icon">
                                                            <input
                                                                className="form-control"
                                                                type={this.state.showPassword ? "text" : "password"}
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                                value={this.state.password}
                                                                onChange={this.onChangehandler}
                                                            />
                                                            <i className="ti-unlock"></i>
                                                        </div>
                                                        {this.state.showPassword ?
                                                            <span href="" className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                                            :
                                                            <span href="" className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                                        }
                                                    </div>
                                                    <span className="text-danger">{this.state.errMsg.password}</span>

                                                </div>
                                                <div className="form-group">
                                                   
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-md full-width btn-theme-light-2 rounded mt-4"
                                                    >
                                                        Login
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
                                            <p className="mt-3 fw-bold"><Link to="/forgot/password" className="link">Forgot password?</Link></p>
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
