import React, { Component } from 'react'
import { Link ,Redirect } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import logoMini from '../../../assets/img/logo-mini.png'
import face1 from '../../../assets/images/faces/dummy.png'
import {Button} from 'reactstrap'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';

export default class Navbar extends Component {
	constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            token: JSON.parse(localStorage.getItem("token")),
            navigate: false,
            redirectToHome:false
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

    SwitchUser = () => {
         if (this.state.user) {
            const formData = new FormData();
             var token = this.state.token
            var app_url = APIURL+"buyer/switch-to-seller"
            axios
                .post(app_url, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    localStorage.setItem("userData", JSON.stringify(response.data.user));
                    localStorage.setItem("user_type", JSON.stringify(response.data.user.switch_user_type));
                   this.setState({
                        redirectToHome:true
                    })
                })
                .catch((error) => {
                    this.setState({
                        // errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }
    toggle(){
		this.setState({
			portrait:!this.state.portrait
		})
	}	
    render() {
        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }

        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        if (this.state.redirectToHome) {
            return <Redirect to="/seller" push={true} />;
        }
		const {user_type} = this.state
		return (
			<>
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
									<li className="active"><Link to="/">Home</Link></li>
									<li><Link to="/Listing">Property</Link></li>
									{!this.state.disableWishList ? <li><Link to="/buyer/wishlist">Wishlist</Link></li> : ""}
									<li><a href="/cms/about-us">About Us</a></li>
									<li><Link to="/contact">Contact Us</Link></li>
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
			</>
		)
	}
}
