import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import axios from "axios";
import { APIURL } from '../../../../components/constants/common';
import { Spinner, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Alert } from 'reactstrap'
import classnames from 'classnames';
import PropertyInfo from './PropertyInfo';
import Address from './Address'
import Features from './Features'
import Gallery from './Gallery';
import { Redirect } from 'react-router-dom'
import PropertyMap from './Map'
// import { Helmet } from "react-helmet";
export default class AddProperty extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            local_p_id: "",
            isLoading: false,
            activeTab: '1',
            p_id: "",
            scsMsg: "",
            errMsg: "",
            assigned: false,
            reviewCancel: false,
            PropertyList:null,
            resend_id: "",
            stickyheader: false,
            Loader:false,
            activeSide:false
        }
    }
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }
    handleActiveTab(tab) {
        window.scrollTo(0, 0);
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    getPropertyId(e) {
        this.setState({
            p_id: e
        })
    }

    getPropertyInfo() {
        if (this.state.user) {
            const formData = new FormData();
            formData.append('id', this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id);
            var token = this.state.token

            axios
                .post(APIURL + "seller/property-edit", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    this.setState({
                        Loader:false,
                        name: response.data.data.name,
                        userInfo: {
                            name: info.name,
                            email: info.email,
                            phone: info.phone,
                            address: info.address,
                            introduction: info.introduction,
                            license_number: info.license_number
                        },
                        profile_image: response.data.data.profile_image,
                        // email: response.data.data.email,
                        Lang_id: response.data.data.language,
                        countryId: response.data.data.country,
                        language: response.data.data.language,
                        state: response.data.data.state
                    })
                    this.handleCountryState(this.state.countryId)
                    console.log("sssssssss", this.state.language)
                })
                .catch((error) => {
                    this.setState({
                        // errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }

    FormCompletionCheck = () => {
        const { user } = this.state
        var token = this.state.token;
        const formData = new FormData();
        formData.append('property_id', this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id);

        const option = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        this.setState({Loader:true})
        axios
            .post(APIURL + "seller/check-property-data-sufficiency", formData, option)
            .then(result => {
                if(result.data.data === true){
                  this.SubmitReview()
                }
            })
            .catch(error => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader:false
                })
            }
            );
    }

    SubmitReview = () => {
        const { user } = this.state
        var token = this.state.token;
        const formData = new FormData();
        formData.append('property_id', this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id);

        const option = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        this.setState({Loader:true})
        axios
            .post(APIURL + "seller/assign-property-after-submit", formData, option)
            .then(result => {
                this.setState({
                    scsMsg: result.data.message,
                    assigned: result.data.propertyAssigned,
                    Loader:false
                })
                setTimeout(() => this.setState({ scsMsg: "", }), 4000);
                setTimeout(() => this.setState({ reviewCancel: true, }), 5000);

            })
            .catch(error => {
                console.log("err", error.response.data.error)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader:false
                })
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            }
            );
    }
    goToPropertyList() {
        this.setState({
            reviewCancel: true
        })
    }
    getPropertyList() {
        var token = this.state.token
        const formData = new FormData();
        formData.append('property_id', this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id);

        axios
            .get(APIURL + "seller/resend-property-edit", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    PropertyList: response.data.data
                })
            })
    }
    listenScrollEvent = e => {
        if (window.scrollY > 50) {
          this.setState({
            stickyheader:true
            })
        } else {
            this.setState({
                stickyheader:false
              })
        }
      }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPropertyList()
        window.addEventListener('scroll', this.listenScrollEvent)
    }
    render() {
        const property_id = this.props.match.params.id
        console.log(this.props)
        if (this.state.reviewCancel) {
            return <Redirect to="/seller/property" push={true} />;
        }

        return (
            <div className="resido-admin">
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                <div className="container-scroller ">
                    <Navbar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}/>
                    <div className="page-body-wrapper">
                        <Sidebar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}/>
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div  className={this.state.stickyheader ? "mb-4 d-flex justify-content-between sticky-header" : "mb-4 d-flex justify-content-between"} >
                                    <h4 className="text-uppercase">Property </h4>
                                        <div>
                                            {this.state.PropertyList!=null && this.state.PropertyList.resend_property === "resend" ?
                                                <div className="">
                                                    <Button onClick={() => this.goToPropertyList()} className="mr-2 btn-sm px-4 btn-rounded">Cancel</Button>
                                                    <Button onClick={() => this.FormCompletionCheck()} className="btn-sm px-4 btn-rounded">Resend For Review  </Button>
                                                </div>
                                                :
                                                <div className="">
                                                    <Button onClick={() => this.goToPropertyList()} className="mr-2 btn-sm px-4 btn-rounded">Cancel</Button>
                                                    <Button onClick={() => this.FormCompletionCheck()} color="info" className="btn-sm px-4 btn-rounded">Submit For Review  </Button>
                                                </div>
                                            }
                                        </div>
                                </div>
                                {this.state.scsMsg ?
                                    <div className="alert alert-success mb-4" role="alert">
                                        {this.state.scsMsg}
                                    </div>
                                    : ""}
                                {this.state.errMsg.message ?
                                    <div className="alert alert-danger mb-4" role="alert">
                                        {this.state.errMsg.message}
                                    </div>
                                    : ""}
                                <div className="">
                                    <Nav tabs style={{ padding: "0px" }}>
                                        <NavItem >
                                            <NavLink
                                                style={{ color: "black", cursor: "pointer", }}
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.handleActiveTab('1'); }}
                                            >
                                                Property Info
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ color: "black", cursor: "pointer", }}
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.handleActiveTab('2'); }}
                                            >
                                                Address
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ color: "black", cursor: "pointer", }}
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.handleActiveTab('3'); }}
                                            >
                                                Features
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink
                                                style={{ color: "black", cursor: "pointer", }}
                                                className={classnames({ active: this.state.activeTab === '4' })}
                                                onClick={() => { this.handleActiveTab('4'); }}
                                            >
                                                Map
                                            </NavLink>
                                        </NavItem> */}
                                        <NavItem>
                                            <NavLink
                                                style={{ color: "black", cursor: "pointer" }}
                                                className={classnames({ active: this.state.activeTab === '4' })}
                                                onClick={() => { this.handleActiveTab('4'); }}
                                            >
                                                Gallery
                                            </NavLink>
                                        </NavItem>

                                    </Nav>
                                </div>    
                                <div className="row">
                                    <div className="col-12 grid-margin">

                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    
                                                    <TabContent activeTab={this.state.activeTab}>
                                                        <TabPane tabId="1">
                                                            <PropertyInfo
                                                                data={{
                                                                    property_id: this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id,
                                                                    handleActiveTab: this.handleActiveTab.bind(this),
                                                                    // handleCompleteTab: this.handleCompleteTab.bind(this)
                                                                }}
                                                            />
                                                        </TabPane>
                                                        <TabPane tabId="2">
                                                            <Address
                                                                data={{
                                                                    property_id: this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id,
                                                                    handleActiveTab: this.handleActiveTab.bind(this),
                                                                    // handleCompleteTab: this.handleCompleteTab.bind(this)
                                                                }} />
                                                        </TabPane>
                                                        <TabPane tabId="3">
                                                            <Features
                                                                data={{
                                                                    property_id: this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id,
                                                                    handleActiveTab: this.handleActiveTab.bind(this),
                                                                    // handleCompleteTab: this.handleCompleteTab.bind(this)
                                                                }} />
                                                        </TabPane>
                                                        {/* <TabPane tabId="4">
                                                            <PropertyMap
                                                                data={{
                                                                    property_id: this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id,
                                                                    handleActiveTab: this.handleActiveTab.bind(this),
                                                                    // handleCompleteTab: this.handleCompleteTab.bind(this)
                                                                }} />
                                                        </TabPane> */}
                                                        <TabPane tabId="4">
                                                            <Gallery
                                                                data={{
                                                                    property_id: this.props.match.params.id ? this.props.match.params.id : this.state.local_p_id,
                                                                    handleActiveTab: this.handleActiveTab.bind(this),
                                                                    // handleCompleteTab: this.handleCompleteTab.bind(this)
                                                                }} />
                                                        </TabPane>
                                                    </TabContent>
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
            </div>
        )
    }
}
