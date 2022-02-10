import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import { Button ,Spinner } from 'reactstrap'
import { Redirect } from 'react-router'

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: localStorage.getItem("user_type"),
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
            Loader:true
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
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
                this.setState({ Loader: false  })
                this.setState({
                    scsMsg: response.data.message,
                })
                setTimeout(()=>{
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
                setTimeout(()=>{
                    window.location.reload();
                }, 3000);
            });
    };
    toggle(){
        this.setState({
            toggle:!this.state.toggle
        })
    }

    toggleFunChild(value){
        this.setState({
            toggle:value
        })
    }
    render() {
         if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        return (
            <>
               <div className="resido-front">
               {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
              <div className="blue-skin dashboard">
                        <div id="main-wrapper">
                            <Navbar />
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
                                            activePage="changepassword"  
                                            toggleFunChild={this.toggleFunChild.bind(this)}
                                            toggle={this.state.toggle}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <div className="dashboard-wraper">

                                                <div className="form-submit">
                                                    <h4>Change Password</h4>
                                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert"> {this.state.scsMsg} </div> : ""}
                                                    {/* messgae err */}
                                                    {this.state.errMsg.message ? <div className="alert alert-danger" role="alert">  {this.state.errMsg.message}   </div> : ""}
                                                    <div className="submit-section mt-3">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6" >
                                                                <div className="form-group col-lg-12 col-md-12">
                                                                    <label>Current Password</label>
                                                                    <div className="position-relative">
                                                                        <input
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

                                                                <div className="form-group col-lg-12 col-md-12">
                                                                    <label>New Password</label>
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

                                                                <div className="form-group col-lg-12 col-md-12">
                                                                    <label>Confirm Password</label>
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
                                                                <div className=" col-lg-12 col-md-12">
                                                                    <Button
                                                                        color="primary"
                                                                        className="btn btn-theme-light-2 rounded"
                                                                        onClick={() => this.onSubmitHandler()}
                                                                    >Save Changes</Button>
                                                                </div>
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

