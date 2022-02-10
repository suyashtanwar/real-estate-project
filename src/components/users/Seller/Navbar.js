import React, { Component } from 'react'
import logo from '../../../assets/img/logo.png'
import logoMini from '../../../assets/img/logo-mini.png'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'
import { Button, Modal, ModalFooter } from 'reactstrap'
import { APIURL, BASEURL } from '../../../components/constants/common';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            sidebarClass: "sidebar-icon-only",
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            navigate: false,
            profile_image: "",
            openSidebar: false,
            redirectToHome: false,
            switchModal: false,
           
        }
    }

    componentDidMount() {
        this.getProfileInfo()
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
                        profile_image: response.data.data.url_path,
                        name: response.data.data.name
                    })
                    console.log("bjsbvjx", this.state.profile_image)
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
    goToHome() {
        window.location.href = "/";
    }
    SwitchModalOpen = () => {
        this.setState({
            switchModal: !this.state.switchModal,
        })
    }
    ModalClose = () => {
        this.setState({
            switchModal: !this.state.switchModal,
            checked: !this.state.checked
        })
    }

    SwitchUser = () => {
        if (this.state.user) {
            const formData = new FormData();
            var token = this.state.token
            var app_url = APIURL + "seller/switch-to-buyer"
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
                        redirectToHome: true
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
    resSidebar = () => {
        this.setState({
            activeSide:!this.state.activeSide
        },()=>{
            this.props.sideMenu(this.state.activeSide)
        })
    }

    render() {
        const { openSidebar, closeSidebar, redirectToHome } = this.state
        const { user, name } = this.state
        // if(this.state.user_type !== "Seller"){
        //     return <Redirect to="/permission" />;
        // }
        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }

        if (redirectToHome) {
            return <Redirect to="/buyer" push={true} />;
        }

        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        return (
            <>
                <div className="d-none" >
                    <Sidebar
                        // res_Active="hjdgsgdshgd"
                    />
                </div>
                <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <button className="navbar-brand brand-logo" ><img src={logo} alt="logo" /></button>
                        <Link className="navbar-brand brand-logo-mini" to="#"><img src={logoMini} alt="logo" /></Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-stretch">
                        <div className="mt-3">
                            {openSidebar ?
                                <span className=" navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                                    <span onClick={() => this.Sidebar()} className="fas fa-bars"></span>
                                </span>
                                :
                                <span className=" navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                                    <span onClick={() => this.Sidebar()} className="fas fa-bars"></span>
                                </span>
                            }
                        </div>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item nav-logout  d-lg-block ">
                                <a className="nav-link ">
                                    <Button size='sm' className='btn btn-info btn-rounded' onClick={() => this.SwitchModalOpen()}>Switch To Buyer</Button>
                                    <i data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout" onClick={() => this.onLogoutHandler()} className="mdi mdi-power">  </i>
                                </a>
                            </li>
                            <li className="nav-item nav-logout d-lg-block">
                                <a className="nav-link" href="#" onClick={() => this.onLogoutHandler()} >
                                    <strong>Logout</strong>
                                    <i data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout" onClick={() => this.onLogoutHandler()} className="mdi mdi-power">  </i>
                                </a>
                            </li>
                        </ul>
                        <button onClick={() => this.resSidebar()} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <span className="fas fa-bars"></span>
                        </button>
                    </div>
                    <Modal className="resido-admin" size="md" isOpen={this.state.switchModal} toggle={() => this.ModalClose()} autoFocus={false}>
                        <div className="card">
                            <div className="card-body text-center">
                                Please confirm if you want to switch your profile and become property buyer.
                            </div>
                        </div>
                        <ModalFooter>
                            <div className="d-flex justify-content-between w-100">
                                <Button color="success" onClick={() => this.SwitchUser()}>Confirm</Button>
                                <Button color="danger" onClick={() => this.ModalClose()}>Cancel </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </nav>
            </>
        )
    }
}
