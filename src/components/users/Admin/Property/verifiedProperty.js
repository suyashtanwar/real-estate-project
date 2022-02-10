import React, { Component } from 'react'
import axios from "axios";
import { APIURL } from '../../.././constants/common';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Pagination from "react-js-pagination";
import { Button } from "reactstrap"
import { Modal, ModalBody, ModalHeader, ModalFooter, Input, Spinner } from 'reactstrap'
import Select from 'react-select'
import { Redirect, Link } from 'react-router-dom';


const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#B8BCBD" : null,
            color: "grey",
        };
    },
};

export default class AssignProperty extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            PropertyList: [],
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "accept", "label": "Accepted" }, { 'value': "pending", "label": "Pending" }, { 'value': "verify", "label": "Verified" }, { 'value': "unverify", "label": "Not Verified" }],
            statusDefault: [{ 'value': "", "label": "Status" }],
            AgentList: [],
            agentId: "",
            agentReq: [],
            Visible: false,
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            status: [],
            AssignModal: false,
            agent_id: "",
            sortby: "DESC",
            sort: false,
            Loader:false

        }
    }

    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getPropertyList()
                }, 300);
            });
    }
    

    SortBy(e) {
        this.setState({
            sort: !this.state.sort
        }, () => {
            if (this.state.sort) {
                this.setState({
                    sortby: "ASC",
                    columnName: e
                }, () => {
                    this.getPropertyList()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getPropertyList()
                })
            }
        })
    }
    handleStatus(e) {
        this.setState(
            {
                activePage:1,
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getPropertyList() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getPropertyList()
                this.getApprovedAgentList()
            }
        );
    }

    getPropertyList() {
        this.setState({Loader:true})
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('limit', this.state.limit);
        formData.append('sortby', this.state.sortby);
        formData.append('sorttype', this.state.columnName ? this.state.columnName : "");

        axios
            .post(APIURL + "admin/get-all-verified-property-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("admin/get-all-verified-property-list", response.data.data.data)
                this.setState({
                    PropertyList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader:false
                })
            })
    }

    getApprovedAgentList() {
        const token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('status', this.state.status);
        formData.append('limit', this.state.limit);
        axios
            .post(APIURL + "admin/get-approved-agent-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("agent/get-assign-properties", response.data)
                if (response.data.data && response.data.data.length > 0) {
                    this.setState({
                        AgentList: response.data.data
                    });
                }
            });
    }
    handleAgentName(e) {
        console.log(e)
        this.setState({
            agent_id: e,

        })
    };


    ActiveDrop = (e) => {
        console.log(e)
        this.setState({
            propertyId: e,
            AssignModal: true,
        })
    }

    ModalClose() {
        this.setState({
            AssignModal: false
        })
    }

    SubmitProperty = () => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('property_id', this.state.propertyId);
        formData.append('user_id', this.state.agent_id);
        formData.append('status', "accept");


        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/property-assign-by-admin", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    Loader: false,
                    AgentInfo: response.data.data,
                    Visible: false,
                    AssignModal: false
                });
                console.log(this.state.AgentInfo)
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    Visible: false
                })
            });
    };


    componentDidMount() {
        this.getApprovedAgentList();
        this.getPropertyList()
    }

    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        return (
            <div>
                <div className="container-scroller resido-admin">
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                    <Navbar 
                     sideMenu={this.sideMenu.bind(this)}
                     activeSide={this.state.activeSide}
                     />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}
                         activePage="Verified" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Verified Property</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3 mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                        <Input type="text" onChange={(e) => this.handleSearch(e)} placeholder="Search" />
                                    </div>

                                    {/* <div className="col-3 ml-auto">
                                    <Select
                                            aria-label=".form-select-lg example"
                                            required=""
                                            placeholder="Select Status"
                                            className="form-select-control"
                                            options={this.state.statusArray}
                                            value={this.state.statusDefault}
                                            styles={colourStyles}
                                            onChange={(e) => this.handleStatus(e)}
                                        />
                                    </div> */}
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 grid-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                {/* <h4 className="card-title  justify-content-between d-flex ">Property Enquiry </h4> */}
                                                {/* No Records */}
                                                <div className="table-responsive">
                                                    <table className=" table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by text-left" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}> Property Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("seller_name")}> Seller Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("assigned_to")}> Assigned To</th>
                                                                <th> Status</th>
                                                                <th className="text-center">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.PropertyList.length > 0 ? this.state.PropertyList.map((item, idx) => (
                                                                <React.Fragment>
                                                                    <tr key={idx} >
                                                                        <td className="text-left" >{item.name}</td>

                                                                        <td>  {item.seller_detail.fullName ? item.seller_detail.fullName : "Not Assigned"} </td>
                                                                        <td>  {item.agent_detail.fullName ? item.agent_detail.fullName : "Not Assigned"} </td>
                                                                        <td >
                                                                            <label className="badge badge-success">Verified</label>
                                                                        </td>
                                                                        {/* <td>
                                                                                <Button className="btn btn-info btn-rounded px-3 btn-sm" onClick={() => this.ActiveDrop(item.id)}>Assign</Button>
                                                                            </td>  */}
                                                                        <td className="text-center">
                                                                            <Link to={"/admin/verified/property/View/" + item.id} className="btn btn-info btn-rounded px-3 btn-sm ml-2">View</Link>
                                                                        </td>
                                                                        <Modal size="md" isOpen={this.state.AssignModal} toggle={() => this.ModalClose()}>
                                                                            <ModalHeader className="header-less" toggle={() => this.ModalClose()}>Assign Property</ModalHeader>
                                                                            <ModalBody className="border-0">
                                                                                <select className="form-control" onChange={(e) => this.handleAgentName(e.target.value)} >
                                                                                    <option value="">Select</option>
                                                                                    {this.state.AgentList.map((option) => (
                                                                                        <option value={option.id}>{option.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <div className="d-flex justify-content-between w-100">
                                                                                    <Button color="info" className="btn btn-primary" onClick={() => this.SubmitProperty()}> <i className="fas fa-save mr-1"> </i>Submit</Button>
                                                                                    <Button className="btn btn-danger" onClick={() => this.ModalClose()}> <i className="fas fa-window-close mr-1"></i>Cancel </Button>
                                                                                </div>
                                                                            </ModalFooter>
                                                                        </Modal>
                                                                    </tr>
                                                                </React.Fragment>
                                                            )) :
                                                                <tr>
                                                                    <td colSpan="5" className="text-center">
                                                                        No Request Available
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">

                                        {this.state.totalItemsCount > 0 &&
                                            <div className="pagination-rounded">
                                                <Pagination
                                                    activePage={this.state.activePage}
                                                    itemsCountPerPage={this.state.limit}
                                                    totalItemsCount={this.state.totalItemsCount}
                                                    pageRangeDisplayed={5}
                                                    onChange={this.handlePageChange.bind(this)}
                                                />
                                            </div>
                                        }
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
