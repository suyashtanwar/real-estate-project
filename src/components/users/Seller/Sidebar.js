import React, { Component } from 'react'
import face1 from '../../../assets/images/faces/dummy.png'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Tooltip, Collapse } from 'reactstrap';
import { APIURL, BASEURL } from '../../../components/constants/common';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: "",
            sidebarClass: "sidebar-icon-only",
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            profile_image: "",
            dashboard: false,
            myProfile: false,
            property: false,
            VerifiedProperty: false,
            enquiry: false,
            agentreq: false,
            changePass: false,
            reload: false,
            NoImage: false,
            EnquiryMenuIcon: true,
            EnquirySubMenu: true,
            activeEnqIcon: false,
            DocMenuIcon: true,
            DocSubMenu: true,
            activeDocIcon: false
            // user:false
        }
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
                        name: response.data.data.fullName,
                        NoImage: true
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

    dashboard = () => { this.setState({ dashboard: !this.state.dashboard }) }
    myProfile = () => { this.setState({ myProfile: !this.state.myProfile }) }
    property = () => { this.setState({ property: !this.state.property }) }
    VerifiedProperty = () => { this.setState({ VerifiedProperty: !this.state.VerifiedProperty }) }
    enquiry = () => { this.setState({ enquiry: !this.state.enquiry }) }
    agentreq = () => { this.setState({ agentreq: !this.state.agentreq }) }
    changePass = () => { this.setState({ changePass: !this.state.changePass }) }
    contract = () => { this.setState({ contract: !this.state.contract }) }

    activeEnqIcon = () => {
        this.setState({
            activeEnqIcon: !this.state.activeEnqIcon
        })
    }
    EnquirySubMenu = () => {
        this.setState({
            EnquirySubMenu: !this.state.EnquirySubMenu,
            EnquiryMenuIcon: !this.state.EnquiryMenuIcon
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
    handlehover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    componentDidMount() {
        this.getProfileInfo()
    }

    render() {
        const { user, name, activetab, activeDocIcon, activeEnqIcon } = this.state
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.user_type !== "Seller") {
            return <Redirect to="/permission" />;
        }
        return (
            <>
                <nav className={this.props.activeSide ? "sidebar sidebar-offcanvas active" : "sidebar sidebar-offcanvas"} id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                            <a href="#" className="nav-link">
                                <div className="nav-profile-image">
                                    {
                                        this.state.NoImage &&
                                        <img src={this.state.profile_image !== "" ? this.state.profile_image : face1} alt="profile" />
                                    }
                                    <span className="login-status online"></span>
                                </div>
                                <div className="nav-profile-text d-flex flex-column">
                                    <span className="font-weight-bold mb-2">{name}</span>
                                    <span className="text-secondary text-small st">Seller</span>
                                </div>
                                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                            </a>
                        </li>
                        <li
                            onMouseOver={() => this.dashboard()}
                            onMouseOut={() => this.dashboard()}
                            className={this.props.activePage === "dashboard" ?
                                this.state.dashboard ? "nav-item active hover-open" : "nav-item active" :
                                this.state.dashboard ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="dashboard" className="nav-link" to="/seller">
                                <span className="menu-title">Dashboard</span>
                                <i className="fas fa-home menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.property()}
                            onMouseOut={() => this.property()}
                            className={this.props.activePage === "property_list" ?
                                this.state.property ? "nav-item active hover-open" : "nav-item active" :
                                this.state.property ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="Property"
                                className="nav-link"
                                to="/seller/property"
                            >
                                <span className="menu-title">Property</span>
                                <i className="far fa-building menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.VerifiedProperty()}
                            onMouseOut={() => this.VerifiedProperty()}
                            className={this.props.activePage === "verified_property" ?
                                this.state.VerifiedProperty ? "nav-item active hover-open" : "nav-item active" :
                                this.state.VerifiedProperty ? "nav-item hover-open" : "nav-item"}
                        // className={this.props.activePage === "verified_property" ? "nav-item active" : "nav-item"}
                        >
                            <Link id="VerifiedProperty"
                                className="nav-link"
                                to="/seller/verified/property"
                            >
                                <span className="menu-title">Verified Property</span>
                                <i className="far fa-building menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            className={this.props.activePage === "Enquiry" ?
                                this.state.enquiry ? "nav-item active hover-open" : "nav-item active" :
                                this.state.enquiry ? "nav-item hover-open" : "nav-item"}
                            onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeEnqIcon()}
                            onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeEnqIcon()}
                            onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.EnquirySubMenu()}
                        >
                            <Link id="Property" className="nav-link" to="#">
                                <span className="menu-title "> Property Enquiry</span>
                                {activeEnqIcon ? this.state.EnquiryMenuIcon ? <i className="fas fa-chevron-up menu-icon"></i> : <i className="fas fa-chevron-down menu-icon"></i> : <i className="far fa-building menu-icon"></i>}

                                
                            </Link>
                            <Collapse className="" isOpen={this.state.EnquirySubMenu}>
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <Link id="Enquiry"
                                            className={this.props.activePage === "Enquiry" ? "nav-link active" : "nav-link"}
                                            to="/seller/enquiry">
                                            <span className="menu-title2">Take A Tour Enquiry</span>
                                            {/* <i id="Enquiry" className="fas fa-handshake menu-icon"></i> */}
                                           
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        {/* <li className={this.props.activePage === "Enquiry" ? "nav-item active" : "nav-item"}>
                            <Link id="Enquiry" className="nav-link" to="/seller/enquiry">
                                <span className="menu-title">Property Enquiry</span>
                                <i id="Enquiry" className="fas fa-book-reader menu-icon"></i>
                                {document.body.classList.contains(this.state.sidebarClass) ?
                                    <Tooltip placement="right" isOpen={this.state.enquiry} autohide={false} target="Enquiry" toggle={this.enquiry}>
                                        Enquiry
                                    </Tooltip> : ""}
                            </Link>
                        </li> */}
                        <li
                            onMouseOver={() => this.myProfile()}
                            onMouseOut={() => this.myProfile()}
                            className={this.props.activePage === "profile" ?
                                this.state.myProfile ? "nav-item active hover-open" : "nav-item active" :
                                this.state.myProfile ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="profile" className="nav-link" to="/seller/profile">
                                <span className="menu-title">My Profile</span>
                                <i className="fas fa-user-tie menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.changePass()}
                            onMouseOut={() => this.changePass()}
                            className={this.props.activePage === "change_password" ?
                                this.state.changePass ? "nav-item active hover-open" : "nav-item active" :
                                this.state.changePass ? "nav-item hover-open" : "nav-item"}
                        // className={this.props.activePage === "change_password" ? "nav-item active" : "nav-item"}
                        >
                            <Link id="Password" className="nav-link" to="/seller/changepassword">
                                <span className="menu-title">Change Password</span>
                                <i className="fas fa-key menu-icon"></i>
                               
                            </Link>
                        </li>
                        <li

                            className={
                                this.props.activePage === "AgentSellerContract" ||
                                    this.props.activePage === "SellerPurchase"
                                    ?
                                    this.state.contract ? "nav-item active hover-open" : "nav-item active" :
                                    this.state.contract ? "nav-item hover-open" : "nav-item"}
                         
                            onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? this.contract() : this.activeDocIcon()}
                            onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? this.contract() : this.activeDocIcon()}
                            onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.DocSubMenu()}
                        >
                            <Link id="Property" className="nav-link" to="#">
                                <span className="menu-title ">Contract Form</span>
                                {activeDocIcon ? this.state.DocMenuIcon ? <i className="fas fa-chevron-up menu-icon"></i> : <i className="fas fa-chevron-down menu-icon"></i> : <i className="far fa-building menu-icon"></i>}
                            </Link>
                            <Collapse className="" isOpen={this.state.DocSubMenu}>
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <Link id="Password" className={this.props.activePage === "AgentSellerContract" ? "nav-link active" : "nav-link"} to="/seller/contract/list">
                                            <span className="menu-title2">Seller-Agent Contract</span>
                                            {/* <i className="fas fa-users menu-icon"></i> */}
                                          
                                        </Link>
                                    </li>
                                    <li className={document.body.classList.contains(this.state.sidebarClass) ? "nav-item hover-open" : "nav-item"}>
                                        <Link id="Password" className={this.props.activePage === "SellerPurchase" ? "nav-link active" : "nav-link"} to="/seller/purchase/contract/list">
                                            <span className="menu-title2">Seller Purchase</span>
                                            {/* <i className="fas fa-users menu-icon"></i> */}
                                           
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}
