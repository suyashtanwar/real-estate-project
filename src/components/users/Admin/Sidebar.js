import React, { Component } from 'react'
import face1 from '../../../assets/images/faces/dummy.png'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Tooltip } from 'reactstrap';
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
            CMS: false,
            enquiry: false,
            agentreq: false,
            changePass: false,
            users: false,
            receivedEnquiry: false,
            RequestedAssignPropery: false,
            noRecords: false,
        }
        this.VerifiedProperty = this.VerifiedProperty.bind(this)
    }
    componentDidMount() {
        this.getProfileInfo()
        console.log(this.state.user.user_type)
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
                        name: response.data.data.fullName,
                        noRecords: true
                    })
                })
                .catch((error) => {
                    this.setState({
                        Loader: false
                    })
                });
        }
    }
    dashboard = () => { this.setState({ dashboard: !this.state.dashboard }) }
    CMS = () => { this.setState({ CMS: !this.state.CMS }) }
    myProfile = () => { this.setState({ myProfile: !this.state.myProfile }) }
    property = () => { this.setState({ property: !this.state.property }) }
    enquiry = () => { this.setState({ enquiry: !this.state.enquiry }) }
    agentreq = () => { this.setState({ agentreq: !this.state.agentreq }) }
    changePass = () => { this.setState({ changePass: !this.state.changePass }) }
    VerifiedProperty = () => { this.setState({ VerifiedProperty: !this.state.VerifiedProperty }) }
    AssignProperty = () => { this.setState({ AssignProperty: !this.state.AssignProperty }) }
    users = () => { this.setState({ users: !this.state.users }) }
    receivedEnquiry = () => { this.setState({ receivedEnquiry: !this.state.receivedEnquiry }) }
    RequestedAssignPropery = () => { this.setState({ RequestedAssignPropery: !this.state.RequestedAssignPropery }) }


    render() {
        const { user, name } = this.state

        if (!this.state.user) {
            // alert("please log in")
            return <Redirect to="/signin" />;
        }

        if (this.state.user.user_type !== "Admin") {
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
                                    <span className="text-secondary text-small">Admin Panel</span>
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
                            <Link id="dashboard" className="nav-link" to="/admin">
                                <span className="menu-title">Dashboard</span>
                                <i className="fas fa-home menu-icon"></i>

                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.CMS()}
                            onMouseOut={() => this.CMS()}
                            className={this.props.activePage === "CMS" ?
                                this.state.CMS ? "nav-item active hover-open" : "nav-item active" :
                                this.state.CMS ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="CMS" className="nav-link" to="/cms">
                                <span className="menu-title">CMS</span>
                                <i className="fab fa-intercom menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.agentreq()}
                            onMouseOut={() => this.agentreq()}
                            className={this.props.activePage === "agent_request" ?
                                this.state.agentreq ? "nav-item active hover-open" : "nav-item active" :
                                this.state.agentreq ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="Request" className="nav-link" to="/admin/approval">
                                <span className="menu-title">Agent Request</span>
                                <i className="fas fa-users menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.users()}
                            onMouseOut={() => this.users()}
                            className={this.props.activePage === "users" ?
                                this.state.users ? "nav-item active hover-open" : "nav-item active" :
                                this.state.users ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="users" className="nav-link" to="/admin/users">
                                <span className="menu-title">User Management</span>
                                <i className="far fa-building menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.receivedEnquiry()}
                            onMouseOut={() => this.receivedEnquiry()}
                            className={this.props.activePage === "received_enquiry" ?
                                this.state.receivedEnquiry ? "nav-item active hover-open" : "nav-item active" :
                                this.state.receivedEnquiry ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="received_enquiry" className="nav-link" to="/admin/received/enquiry">
                                <span className="menu-title">Contact Us Enquiry</span>
                                <i className="fas fa-book-reader menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.VerifiedProperty()}
                            onMouseOut={() => this.VerifiedProperty()}
                            className={this.props.activePage === "Verified" ?
                                this.state.VerifiedProperty ? "nav-item active hover-open" : "nav-item active" :
                                this.state.VerifiedProperty ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="Verified" className="nav-link" to="/admin/verified/property">
                                <span className="menu-title">Verified Property</span>
                                <i className="fas fa-file-signature menu-icon"></i>

                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.AssignProperty()}
                            onMouseOut={() => this.AssignProperty()}
                            className={this.props.activePage === "assigned_property" ?
                                this.state.AssignProperty ? "nav-item active hover-open" : "nav-item active" :
                                this.state.AssignProperty ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="Assign_Property" className="nav-link" to="/admin/assign/property">
                                <span className="menu-title">Assign Property</span>
                                <i className="fas fa-file-signature menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.RequestedAssignPropery()}
                            onMouseOut={() => this.RequestedAssignPropery()}
                            className={this.props.activePage === "RequestedAssignPropery" ?
                                this.state.RequestedAssignPropery ? "nav-item active hover-open" : "nav-item active" :
                                this.state.RequestedAssignPropery ? "nav-item hover-open" : "nav-item"}
                        // className={this.props.activePage === "RequestedAssignPropery" ? "nav-item active" : "nav-item"}
                        >
                            <Link id="Assign_Property" className="nav-link" to="/admin/requested/assign/property">
                                <span className="menu-title">Requested property</span>
                                <i className="fas fa-file-signature menu-icon"></i>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => this.myProfile()}
                            onMouseOut={() => this.myProfile()}
                            className={this.props.activePage === "profile" ?
                                this.state.myProfile ? "nav-item active hover-open" : "nav-item active" :
                                this.state.myProfile ? "nav-item hover-open" : "nav-item"}
                        >
                            <Link id="profile" className="nav-link" to="/admin/profile">
                                <span className="menu-title">My profile</span>
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
                            <Link id="Password" className="nav-link" to="/admin/changepassword">
                                <span className="menu-title">Change Password</span>
                                <i className="fas fa-key menu-icon"></i>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </>
        )
    }
}
