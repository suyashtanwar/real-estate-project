import React, { Component } from 'react'
import axios from 'axios';
import logo from '../../assets/img/logo.png'
import user from '../../assets/img/user.svg'
import { Link ,Redirect} from 'react-router-dom'
import { APIURL } from '../../components/constants/common';
import face1 from '../../assets/images/faces/dummy.png'

export default class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			token: JSON.parse(localStorage.getItem("token")),
			user: JSON.parse(localStorage.getItem("userData")),
			user_type: JSON.parse(localStorage.getItem("user_type")),
			navigate: false,
			disableWishList: false,
			profile_image: "",
			name: "",
			noRecords: false,
			portrait:false
		}
	}

	toggle(){
		this.setState({
			portrait:!this.state.portrait
		})
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



	goToProfile() {
		if (this.state.user) {
			if (this.state.user_type == "Agent") {
				window.location.href = "/agent";
			}
			else if (this.state.user_type == "Seller") {
				window.location.href = "/seller";
			}
			else if (this.state.user_type == "Admin") {
				window.location.href = "/Admin";
			}
			else if (this.state.user_type == "Buyer") {
				window.location.href = "/Buyer";
			}
			else {
				window.location.href = "/";
			}
		}
	}
	
	listenScrollEvent = e => {
		if (window.scrollY > 50) {
			this.setState({
				stickyheader: true
			})
		} else {
			this.setState({
				stickyheader: false
			})
		}
	}
	onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
		setTimeout(() => {
			window.location.reload();
		}, 500);
    };

	componentDidMount() {
		this.setState({
			slug:"about-us"
		})
		if (this.state.user) {
			if (this.state.user.user_type !== "Buyer") {
				this.setState({
					disableWishList: true
				})
			}
		}
		this.getProfileInfo()
		window.addEventListener('scroll', this.listenScrollEvent)
	}

	render() {
        if (this.state.navigate && !this.state.user) {
            return <Redirect to="/" push={true} />;
        }
		const { user_type } = this.state
		return (
			<div>
				<div className={this.state.stickyheader ? "header change-logo header-fixed" : "header change-logo"}>
					<div className="container">
						<nav id="navigation" className={this.state.portrait ? "navigation navigation-portrait":"navigation navigation-landscape"}>
							<div className="nav-header">
								<Link className="nav-brand static-logo" to="/"><img src={logo} className="logo" alt="" /></Link>
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
			</div>
		)
	}
}
