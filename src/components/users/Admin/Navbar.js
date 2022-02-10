import React, { Component } from 'react'
import logo from '../../../assets/img/logo.png'
import logoMini from '../../../assets/img/logo-mini.png'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'
import { APIURL, BASEURL } from '../../../components/constants/common';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            sidebarClass: "sidebar-icon-only",
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: localStorage.getItem("user_type"),
            navigate: false,
            profile_image: "",
            openSidebar: false,
            // user:false
            activeSide:false
        }
    }

    componentDidMount() {
    }
    goToHome() {
        window.location.href = "/";
    }

    getProfileInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.state.user.id);
            var token = this.state.token
            var app_url = APIURL + "admin/edit-profile"
            axios
                .post(app_url, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    this.setState({
                        profile_image: response.data.data.url_path,
                        name: response.data.data.name
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

    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };
    onHover = () =>
        this.setState({
            showIcons: true
        });
    onNotHover = () =>
        this.setState({
            showIcons: false
        });

    Sidebar = () => {
        if (document.body.classList.contains(this.state.sidebarClass)) {
            document.body.classList.remove('sidebar-icon-only');
            return false
        }
        if (!document.body.classList.contains(this.state.sidebarClass)) {
            document.body.classList.add('sidebar-icon-only');
            return false
        }
    }

    resSidebar = () => {
        this.setState({
            activeSide:!this.state.activeSide
        },()=>{
            this.props.sideMenu(this.state.activeSide)
        })
    }

    render() {
        console.log("props data s",this.props)
        const { openSidebar, closeSidebar } = this.state
        const { user, name } = this.state
        if (!this.state.user) {
            // alert("please log in")
            return <Redirect to="/signin" />;
        }
        if (!this.state.user.user_type === "Admin") {
            return <Redirect to="/" push={true} />;
        }

        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }

        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }

        return (
            <>
                <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <button className="navbar-brand brand-logo" ><img src={logo} alt="logo" /></button>
                        <Link className="navbar-brand brand-logo-mini" to="#" ><img src={logoMini} alt="logo" /></Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-stretch">
                        <div className="mt-3">
                                <span onClick={() => this.Sidebar()} className=" navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                                    <span className="fas fa-bars"></span>
                                </span>
                        </div>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item nav-profile dropdown">

                            </li>
                            <li className="nav-item nav-logout d-lg-block mr-3">
                                <a className="nav-link" href="#" onClick={() => this.onLogoutHandler()} style={{ width: "50px" }}>
                                    <strong>Logout</strong>
                                    <i data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout" onClick={() => this.onLogoutHandler()} className="mdi mdi-power ml-2">  </i>
                                </a>
                            </li>
                        </ul>
                        <button onClick={() => this.resSidebar()} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <span className="fas fa-bars"></span>
                        </button>
                    </div>
                </nav>
            </>
        )
    }
}
