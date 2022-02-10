import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import face1 from '../../../assets/images/faces/dummy.png'
import { APIURL } from '../../../components/constants/common';
import { Modal, Spinner, ModalBody, ModalHeader, ModalFooter, Collapse, Button } from 'reactstrap';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: localStorage.getItem("user_type"),
            navigate: false,
            profile_image: "",
            NoImage: false,
            ActiveIcon: true,
            activetabb: true,
            activetab: false,
            DocMenuIcon: true,
            DocSubMenu: true,
            activeDocIcon: false,
            checked: false,
            redirectToHome: false,
            switch: false,
            switchModal: false,
            toggle: false
        }
    }

    activetab = () => {
        this.setState({
            activetab: !this.state.activetab
        })
    }
    activetabb = () => {
        this.setState({
            activetabb: !this.state.activetabb,
            ActiveIcon: !this.state.ActiveIcon
        })
    }

    activeDocIcon = () => {
        this.setState({
            activeDocIcon: !this.state.activeDocIcon
        })
    }
    DocSubMenu = () => {
        this.setState({
            DocSubMenu: !this.state.DocSubMenu,
            DocMenuIcon: !this.state.DocMenuIcon
        })
    }

    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };

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
                        name: response.data.data.fullName,
                        NoImage: true
                    })
                    console.log("bjsbvjx", this.state.profile_image)
                })
                .catch((error) => {
                    this.setState({
                        Loader: false
                    })
                });
        }
    }


    handleSwitchUser = () => {
        this.setState({
            checked: !this.state.checked
        }, () => {
            setTimeout(() => {
                if (this.state.checked) {
                    this.SwitchModalOpen()
                }
            }, 500);

        })
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
            var app_url = APIURL + "buyer/switch-to-seller"
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

    toggle = () => {
        this.props.toggleFunChild(false)
    }

    componentDidMount() {
        this.getProfileInfo()
    }

    render() {
        const { user, name, activetab } = this.state
        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }

        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        if (this.state.redirectToHome) {
            return <Redirect to="/seller" push={true} />;
        }
        return (
            <div>
                <div className={this.state.toggle ? "simple-sidebar sm-sidebar" : this.props.toggle ? "simple-sidebar sm-sidebar d-block " : "simple-sidebar sm-sidebar"} id="filter_search">
                    <div class="search-sidebar_header">
                        <h4 class="ssh_heading">Close Filter</h4>
                        <button onClick={() => this.toggle()} class="w3-bar-item w3-button w3-large"><i class="ti-close"></i></button>
                    </div>
                    <div className="sidebar-widgets">
                        <div className="dashboard-navbar">
                            <div className="d-user-avater">
                                {
                                    this.state.NoImage &&
                                    <img src={this.state.profile_image !== "" ? this.state.profile_image : face1} alt="profile" />
                                }
                                <h4>{name}</h4>
                            </div>
                            <div className="buy-sell-switch">
                                <span className=''>Buy</span>
                                <div className="form-check form-switch p-0">
                                    <input
                                        className="form-check-input mx-2"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        checked={this.state.checked}
                                        onClick={() => this.handleSwitchUser()}
                                    />
                                </div>
                                <span>Sell</span>
                            </div>
                            <div className="d-navigation">
                                <ul>
                                    <li className={this.props.activePage === "dashboard" ? "active" : ""}><Link to="/buyer"><i className="ti-dashboard"></i>Dashboard</Link></li>

                                    <li className={this.props.activePage === "wishlist" ? "active" : ""}><Link to="/buyer/wishlist"><i className="ti-heart"></i>Wishlist</Link></li>
                                    <li
                                        className={this.props.activePage === "contact_enquiry" || this.props.activePage === "take_tour" ? "nav-item active" : "nav-item"}
                                        onMouseOver={() => this.activetab()}
                                        onMouseOut={() => this.activetab()}
                                        onClick={() => this.activetabb()}
                                    >
                                        <Link id="Property" className="nav-link w-100" to="#">
                                            <i className="far fa-building"></i>Property Enquiry
                                            {this.state.ActiveIcon ? <i className="fas fa-chevron-up menu-icon ml-5 mt-1 float-end"></i> : <i className="fas fa-chevron-down menu-icon mt-1 float-end"></i>}
                                        </Link>
                                        <Collapse className="ml-3" isOpen={this.state.activetabb}>
                                            <Link id="Enquiry" className={this.props.activePage === "contact_enquiry" ? "nav-link active" : "nav-link"} to="/agent/enquiry">
                                                <li className={this.props.activePage === "enquiry" ? "active" : "p-0"}><Link to="/buyer/contact/enquiry"><i className="far fa-address-book"></i>Contact Agent Enquiry</Link></li>
                                            </Link>
                                            <Link id="Enquiry" className={this.props.activePage === "take_tour" ? "nav-link active" : "nav-link"} to="/agent/enquiry/tour">
                                                <li className={this.props.activePage === "taketour" ? "active" : "p-0"}><Link to="/buyer/taketour/enquiry"><i className="fas fa-handshake"></i>Take A Tour Enquiry</Link></li>
                                            </Link>
                                        </Collapse>
                                    </li>
                                    <li className={this.props.activePage === "profile" ? "active" : ""}><Link to="/buyer/Profile"><i className="ti-user"></i>My Profile</Link></li>
                                    <li className={this.props.activePage === "changepassword" ? "active" : ""}><Link to="/buyer/changepassword"><i className="ti-unlock"></i>Change Password</Link></li>
                                    <li
                                        className={this.props.activePage === "buyerAgentContract" || this.props.activePage === "buyerPurchase" ? "nav-item active" : "nav-item"}
                                        onMouseOver={() => this.activeDocIcon()}
                                        onMouseOut={() => this.activeDocIcon()}
                                        onClick={() => this.DocSubMenu()}
                                    >
                                        <Link id="Property" className="nav-link w-100" to="#">
                                            <i className="far fa-building"></i>Contract Form
                                            {this.state.DocMenuIcon ? <i className="fas fa-chevron-up menu-icon ml-5 mt-1 float-end"></i> : <i className="fas fa-chevron-down menu-icon mt-1 float-end"></i>}
                                        </Link>
                                        <Collapse className="ml-3" isOpen={this.state.DocSubMenu}>
                                            <Link id="Enquiry" className={this.props.activePage === "buyerAgentContract" ? "nav-link active" : "nav-link"} to="/buyer/contract/list">
                                                <li className={this.props.activePage === "enquiry" ? "active" : "p-0"}><span ><i className="far fa-address-book"></i>Buyer-Agent Contract</span></li>
                                            </Link>
                                            <Link id="Enquiry" className={this.props.activePage === "buyerPurchase" ? "nav-link active" : "nav-link"} to="/buyer/purchase/contract/list">
                                                <li className={this.props.activePage === "taketour" ? "active" : "p-0"}><span><i className="fas fa-handshake"></i>Buyer Purchase</span></li>
                                            </Link>
                                        </Collapse>
                                    </li>
                                    <li className={this.props.activePage === "logout" ? "active" : ""}><Link to="#" onClick={() => this.onLogoutHandler()}><i className="ti-power-off"></i>Log Out</Link></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal className="resido-admin" size="md" isOpen={this.state.switchModal} toggle={() => this.ModalClose()} autoFocus={false}>
                    <div className="card">
                        <div className="card-body text-center">
                            Please confirm if you want to switch your profile and become property seller.
                        </div>
                    </div>
                    <ModalFooter>
                        <div className="d-flex justify-content-between w-100">
                            <Button color="success" onClick={() => this.SwitchUser()}>Confirm</Button>
                            <Button color="danger" onClick={() => this.ModalClose()}>Cancel </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
