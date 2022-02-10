import React, { Component } from 'react'
import face1 from '../../../assets/images/faces/dummy.png'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Tooltip, Collapse, Card, CardBody, Button } from 'reactstrap';
import { APIURL } from '../../../components/constants/common';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarClass: "sidebar-icon-only",
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            profile_image: "",
            dashboard: false,
            myProfile: false,
            property: false,
            enquiry: false,
            agentreq: false,
            contract: false,
            changePass: false,
            noRecords: false,
            EnquiryMenuIcon: true,
            EnquirySubMenu: true,
            activeEnqIcon: false,
            DocMenuIcon: true,
            DocSubMenu: true,
            activeDocIcon: false
            // user:false
        }
    }
    componentDidMount() {
        this.getProfileInfo()
        console.log(this.props.data);
        if (this.props.activePage === "enquiry") {
            this.setState({ EnquirySubMenu: true })
        }
        if (this.props.EnquiryMenuIcon) {
            this.setState({
                EnquiryMenuIcon: !this.state.EnquiryMenuIcon,

            })
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

    dashboard = () => { this.setState({ dashboard: !this.state.dashboard }) }
    myProfile = () => { this.setState({ myProfile: !this.state.myProfile }) }
    property = () => { this.setState({ property: !this.state.property }) }
    enquiry = () => { this.setState({ enquiry: !this.state.enquiry }) }
    verified = () => { this.setState({ verified: !this.state.verified }) }
    assigned = () => { this.setState({ assigned: !this.state.assigned }) }
    changePass = () => { this.setState({ changePass: !this.state.changePass }) }
    goback = () => { this.setState({ goback: !this.state.goback }) }
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
    render() {
        const { user, name, activeEnqIcon, activeDocIcon } = this.state
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }

        if (this.state.user.user_type !== "Agent") {
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
                                        this.state.noRecords &&
                                        <img src={this.state.profile_image !== "" ? this.state.profile_image : face1} alt="profile" />
                                    }
                                    <span className="login-status online"></span>
                                </div>
                                <div className="nav-profile-text d-flex flex-column">
                                    <span className="font-weight-bold mb-2">{name}</span>
                                    <span className="text-secondary text-small">Agent</span>
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
                        // className={this.props.activepage === "dashboard" ? "nav-item active" : "nav-item"}
                        >
                            <Link id="dashboard" className="nav-link" to="/agent" >
                                <span className="menu-title">Dashboard</span>
                                <i className="fas fa-home menu-icon"></i>

                            </Link>
                        </li>
                        {/* <li
                            className={
                                this.props.activePage === "contact_enquiry" ||
                                    this.props.activePage === "take_tour"
                                    ?
                                    this.state.enquiry ? "nav-item active hover-open" : "nav-item active" :
                                    this.state.enquiry ? "nav-item hover-open" : "nav-item"}
                            onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeDocIcon()}
                            onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeDocIcon()}
                            onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.DocSubMenu()}
                        >
                            <Link id="Property" className="nav-link" to="#">
                                <span className="menu-title "> Property Enquiry</span>
                                {activeEnqIcon ? this.state.EnquiryMenuIcon ? <i className="fas fa-chevron-up menu-icon"></i> : <i className="fas fa-chevron-down menu-icon"></i> : <i className="far fa-building menu-icon"></i>}
                            </Link>
                            <Collapse className="" isOpen={this.state.EnquirySubMenu}>
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <Link id="Enquiry" className={this.props.activePage === "contact_enquiry" ? "nav-link active" : "nav-link"} to="/agent/enquiry">
                                            <span className="menu-title2">Buyer Enquiry</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link id="Enquiry" className={this.props.activePage === "take_tour" ? "nav-link active" : "nav-link"} to="/agent/enquiry/tour">
                                            <span className="menu-title2">Take A Tour</span>
                                        </Link>
                                    </li>
                                </ul>        
                            </Collapse>
                        </li> */}
                        <li 
                        // className={this.props.activePage === "contact_enquiry" || this.props.activePage === "take_tour" ? "nav-item active" : "nav-item"}
                        className={
                            this.props.activePage === "contact_enquiry" ||
                            this.props.activePage === "take_tour"
                                ?
                                this.state.enquiry ? "nav-item active hover-open" : "nav-item active" :
                                this.state.enquiry ? "nav-item hover-open" : "nav-item"}
                                onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeEnqIcon()}
                                onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? this.enquiry() : this.activeEnqIcon()}
                                onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.EnquirySubMenu()}
                        //    onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.activeEnqIcon()}
                        //     onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.activeEnqIcon()}
                        //     onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.EnquirySubMenu()}
                        >
                            <Link id="Property" className="nav-link" to="#">
                                <span className="menu-title "> Property Enquiry</span>
                                {activeEnqIcon ? this.state.EnquiryMenuIcon ? <i className="fas fa-chevron-up menu-icon"></i> : <i className="fas fa-chevron-down menu-icon"></i> : <i className="far fa-building menu-icon"></i>}
                                {/* {document.body.classList.contains(this.state.sidebarClass) ?
                                    <Tooltip placement="right" isOpen={this.state.property} autohide={false} target="Property" toggle={this.property}>
                                        Property Enquiry
                                    </Tooltip> : ""} */}
                            </Link>
                            <Collapse className="ml-3" isOpen={this.state.EnquirySubMenu}>
                                <Link id="Enquiry" className={this.props.activePage === "contact_enquiry" ? "nav-link active" : "nav-link"} to="/agent/enquiry">
                                    <span className="menu-title">Buyer Enquiry</span>
                                    <i className="far fa-address-book menu-icon"></i>
                                    {/* {document.body.classList.contains(this.state.sidebarClass) ?
                                        <Tooltip placement="right" isOpen={this.state.enquiry} autohide={false} target="Enquiry" toggle={this.enquiry}>
                                            Enquiry
                                        </Tooltip> : ""} */}
                                </Link>
                                <Link id="Enquiry" className={this.props.activePage === "take_tour" ? "nav-link active" : "nav-link"} to="/agent/enquiry/tour">
                                    <span className="menu-title">Take A Tour</span>
                                    <i className="fas fa-handshake menu-icon"></i>
                                    {/* {document.body.classList.contains(this.state.sidebarClass) ?
                                        <Tooltip placement="right" isOpen={this.state.enquiry} autohide={false} target="Enquiry" toggle={this.enquiry}>
                                            Take A Tour
                                        </Tooltip> : ""} */}
                                </Link>
                            </Collapse>
                        </li>

                        <li
                            onMouseOver={() => this.verified()}
                            onMouseOut={() => this.verified()}
                            className={this.props.activePage === "verified_property" ?
                                this.state.verified ? "nav-item active hover-open" : "nav-item active" :
                                this.state.verified ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="verified" className="nav-link" to="/agent/verified/property">
                                <span className="menu-title"> Verified Property</span>
                                <i className="far fa-building menu-icon"></i>

                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.assigned()}
                            onMouseOut={() => this.assigned()}
                            className={this.props.activePage === "Assigned_property" ?
                                this.state.assigned ? "nav-item active hover-open" : "nav-item active" :
                                this.state.assigned ? "nav-item hover-open" : "nav-item"}
                        // className={this.props.activepage === "Assigned_property" ? "nav-item active" : "nav-item"}
                        >
                            <Link id="Assigned" className="nav-link" to="/agent/assigned/property">
                                <span className="menu-title"> Assigned Property</span>
                                <i className="fas fa-users menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.myProfile()}
                            onMouseOut={() => this.myProfile()}
                            className={this.props.activePage === "profile" ?
                                this.state.myProfile ? "nav-item active hover-open" : "nav-item active" :
                                this.state.myProfile ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="profile" className="nav-link" to="/agent/profile">
                                <span className="menu-title">My Profile</span>
                                <i className="fas fa-user-tie menu-icon"></i>

                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.changePass()}
                            onMouseOut={() => this.changePass()}
                            className={this.props.activePage === "password" ?
                                this.state.changePass ? "nav-item active hover-open" : "nav-item active" :
                                this.state.changePass ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="Password" className="nav-link" to="/agent/changepassword">
                                <span className="menu-title">Change Password</span>
                                <i className="fas fa-key menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            className={
                                this.props.activePage === "contractToSeller" ||
                                    this.props.activePage === "contractToBuyer" ||
                                    this.props.activePage === "SellerPurchase" ||
                                    this.props.activePage === "BuyerPurchase"
                                    ?
                                    this.state.contract ? "nav-item active hover-open" : "nav-item active" :
                                    this.state.contract ? "nav-item hover-open" : "nav-item"}
                            onMouseOver={() => document.body.classList.contains(this.state.sidebarClass) ? this.contract() : this.activeDocIcon()}
                            onMouseOut={() => document.body.classList.contains(this.state.sidebarClass) ? this.contract() : this.activeDocIcon()}
                            onClick={() => document.body.classList.contains(this.state.sidebarClass) ? "" : this.DocSubMenu()}
                        >
                            <Link id="contract" className="nav-link" to="#">
                                <span className="menu-title ">Contract Form</span>
                                {activeDocIcon ? this.state.DocMenuIcon ? <i className="fas fa-chevron-up menu-icon"></i> : <i className="fas fa-chevron-down menu-icon"></i> : <i className="far fa-building menu-icon"></i>}


                            </Link>
                            <Collapse className="" isOpen={this.state.DocSubMenu}>
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <Link id="contract_f" className={this.props.activePage === "contractToSeller" ? "nav-link active" : "nav-link"} to="/agent/seller/contract/list">
                                            <span className="menu-title2">Seller-Agent Contract</span>
                                            {/* <i className="fas fa-users menu-icon"></i> */}

                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link id="contract_f" className={this.props.activePage === "contractToBuyer" ? "nav-link active" : "nav-link"} to="/agent/buyer/contract/list">
                                            <span className="menu-title2">Buyer-Agent Contract</span>
                                            {/* <i className="fas fa-users menu-icon"></i> */}

                                        </Link>
                                    </li>
                                    <li className="nav-item">    
                                        <Link id="contract_f" className={this.props.activePage === "SellerPurchase" ? "nav-link active" : "nav-link"} to="/agent/contract/seller/purchase/list">
                                            <span className="menu-title2">Seller Purchase</span>
                                            {/* <i className="fas fa-users menu-icon"></i> */}

                                        </Link>
                                    </li>
                                    <li className="nav-item">    
                                        <Link id="contract_f" className={this.props.activePage === "BuyerPurchase" ? "nav-link active" : "nav-link"} to="/agent/contract/buyer/purchase/list">
                                            <span className="menu-title2">Buyer Purchase</span>
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
