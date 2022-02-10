import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Sidebar from './Sidebar'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import Navbar from './Navbar'
import {Spinner , Button} from "reactstrap"
// import { Helmet } from "react-helmet";

export default class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            navigate: false,
            userInfo: {
                current_password: "",
                password: "",
                confirm_password: "",
            },
            errMsg: "",
            scsMsg: "",
            currShowPassword: false,
            newShowPassword: false,
            confirmShowPassword: false,
            Loader:true,
            activeSide:false
        }
    }

    currShowPassword() {
        this.setState({
            currShowPassword: !this.state.currShowPassword
        })
    }
    newShowPassword() {
        this.setState({
            newShowPassword: !this.state.newShowPassword
        })
    }
    confirmShowPassword() {
        this.setState({
            confirmShowPassword: !this.state.confirmShowPassword
        })
    }

    //form handler
    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({ userInfo });
        console.log(userInfo)
    };


    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };

    onSubmitHandler = (e) => {
        var token = this.state.token
        const { userInfo, user } = this.state;
        userInfo['email'] = user.email;
        this.setState({ Loader: true });
        axios
            .post(APIURL + "change-password/update", this.state.userInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    scsMsg: response.data.message,
                });
                setTimeout(() => this.setState({ 
                    scsMsg: "" ,
                    current_password: "",
                    password: "",
                    confirm_password: "",
                }), 3000)
            })

            .catch((error) => {
                console.log(error.response.data.error)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
                setTimeout(() => this.setState({ 
                    errMsg: "",
                    current_password: "",
                    password: "",
                    confirm_password: "",
                 }), 3000)
            });
    };
 sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }
    componentDidMount() {
        window.scrollTo(0,0);
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
        return (
            <>
            <div className="container-scroller resido-admin">
            {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                    <Navbar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}/>
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                        sideMenu={this.sideMenu.bind(this)}
                        activeSide={this.state.activeSide}
                         activePage="change_password" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Change Password</h4>
                                </div>
                                <div className="row"> 
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body">
                                                {this.state.scsMsg ? <div className="alert alert-success" role="alert"> {this.state.scsMsg} </div> : ""}
                                                {/* messgae err */}
                                                {this.state.errMsg.message ? <div className="alert alert-danger" role="alert">  {this.state.errMsg.message}   </div> : ""}

                                                <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group ">
                                                        <label htmlFor="exampleInputName1">Current Password</label>
                                                        <div className="position-relative">
                                                            <input
                                                                autoFocus={true}
                                                                className="form-control"
                                                                required=""
                                                                type={this.state.currShowPassword ? "text" : "password"}
                                                                name="current_password"
                                                                placeholder="Current Password"
                                                                value={this.state.current_password}
                                                                onChange={this.onChangehandler}
                                                            />
                                                            {this.state.currShowPassword ?
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.currShowPassword()} className="fas fa-eye-slash"></i> </span>
                                                                :
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.currShowPassword()} className="fas fa-eye"></i> </span>
                                                            }
                                                        </div>
                                                        <span className="text-danger">{this.state.errMsg.current_password}</span>
                                                    </div>
                                                    <div className="form-group ">
                                                        <label htmlFor="exampleInputName1">New Password</label>
                                                        <div className="position-relative">
                                                            <input
                                                                className="form-control"
                                                                required=""
                                                                type={this.state.newShowPassword ? "text" : "password"}
                                                                name="password"
                                                                placeholder="New Password"
                                                                value={this.state.password}
                                                                onChange={this.onChangehandler}
                                                            />
                                                            {this.state.newShowPassword ?
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.newShowPassword()} className="fas fa-eye-slash"></i> </span>
                                                                :
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.newShowPassword()} className="fas fa-eye"></i> </span>
                                                            }
                                                        </div>
                                                        <span className="text-danger">{this.state.errMsg.password}</span>
                                                    </div>
                                                    <div className="form-group ">
                                                        <label htmlFor="exampleInputName1">Confirm Password</label>
                                                        <div className="position-relative">
                                                            <input
                                                                className="form-control"
                                                                required=""
                                                                type={this.state.confirmShowPassword ? "text" : "password"}
                                                                name="confirm_password"
                                                                placeholder="Confirm Password"
                                                                value={this.state.confirm_password}
                                                                onChange={this.onChangehandler}
                                                            />
                                                            {this.state.confirmShowPassword ?
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.confirmShowPassword()} className="fas fa-eye-slash"></i> </span>
                                                                :
                                                                <span className="ad-fa-eye-pass"> <i onClick={() => this.confirmShowPassword()} className="fas fa-eye"></i> </span>
                                                            }
                                                        </div>
                                                        <span className="text-danger">{this.state.errMsg.confirm_password}</span>
                                                    </div>
                                                </div>
                                                </div >
                                                <div>
                                                        <Button color="info" onClick={() => this.onSubmitHandler()}  >Submit</Button>
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
