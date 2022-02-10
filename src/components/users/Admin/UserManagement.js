import React, { Component } from 'react'
import axios from "axios";
import { APIURL } from '../../constants/common';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Pagination from "react-js-pagination";
import { Button } from "reactstrap"
import { Modal, Table, ModalBody, ModalHeader, ModalFooter, Input, Spinner } from 'reactstrap'
import Select from 'react-select'
import { Redirect, Link } from 'react-router-dom'
import XLSX from 'xlsx'
import { ExportSheet } from 'react-xlsx-sheet'

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
            userList: [],
            exportList: [],
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "unblock", "label": "Active" }, { 'value': "block", "label": "Blocked" }],
            statusDefault: [{ 'value': "", "label": "Status" }],
            userTypeArray: [{ 'value': "", "label": "All" }, { 'value': "buyer", "label": "Buyer" }, { 'value': "seller", "label": "Seller" }, { 'value': "agent", "label": "Agent" }],
            userTypeArrayDefault: [{ 'value': "", "label": "All" }],
            AgentList: [],
            agentId: "",
            agentReq: [],
            Visible: false,
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            status: [],
            userType: [],
            AssignModal: false,
            agent_id: "",
            sortby: "DESC",
            sort: false,
            userId: "",
            table: "",
            activeSide:false
        }
    }

    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getUsersList()
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
                    this.getUsersList()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getUsersList()
                })
            }
        })
    }

    handleUserType(e) {
        this.setState(
            {
                userType: e.value,
                userTypeArrayDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getUsersList() });
    }
    handleStatus(e) {
        this.setState(
            {
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getUsersList() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getUsersList()
            }
        );
    }

    getUsersList() {
        this.setState({ Loader: true })
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('limit', this.state.limit);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('usertypefilter', this.state.userType);
        formData.append('sortby', this.state.sortby);
        formData.append('sorttype', this.state.columnName);

        //GET users Data List 
        axios
            .post(APIURL + "admin/get-allusers-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    userList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader: false
                })
            })
        //GET Export Data List 
        axios
            .post(APIURL + "admin/export-users", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("reposmse export list", response.data.data)
                this.setState({
                    exportList: response.data.data,
                })
            })
    }

    handleAgentName(e) {
        console.log(e)
        this.setState({
            agent_id: e,

        })
    };

    ActiveDrop = (e) => {
        this.setState({
            userId: e,
            AssignModal: true,
        })
    }

    ModalClose() {
        this.setState({
            AssignModal: false
        })
    }

    SubmitProperty = (item, status) => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('user_id', item.id);
        formData.append('status', status);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/user-status-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    Loader: false,
                    Visible: false,
                    AssignModal: false
                });
                this.getUsersList()
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    Visible: false
                })
            });
        this.getUsersList()
    };
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    componentDidMount() {
        this.setState({
            table: document.querySelector('#table-to-xls'),
        });
        this.getUsersList()
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
                            activePage="users"
                        />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">User Management</h4>
                                    <h4 className="text-uppercase">
                                        <ExportSheet
                                            dataType="Table-Node-Element"
                                            fileName={`users`}
                                            tableElement={this.state.table}
                                            xlsx={XLSX}
                                            className="text-dark"
                                        >
                                            <Button color="info" className="download-table-xls-button btn-sm btn-info btn-rounded"><i style={{ fontSize: "12px" }} className="fas fa-arrow-circle-down menu-icon"></i> Export</Button>
                                        </ExportSheet>
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3 mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                        <Input type="text" onChange={(e) => this.handleSearch(e)} placeholder="Search" />
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2 ml-auto">
                                        <Select
                                            aria-label=".form-select-lg example"
                                            required=""
                                            placeholder="All"
                                            className="form-select-control"
                                            options={this.state.userTypeArray}
                                            value={this.state.userTypeArrayDefault}
                                            styles={colourStyles}
                                            onChange={(e) => this.handleUserType(e)}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 ml-auto">
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
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 grid-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Table className="table ">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by text-left" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}>Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("email")}>Email Address</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("user_type")}> User Type</th>
                                                                <th> Status</th>
                                                                <th className="text-center"> Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.userList.length > 0 ? this.state.userList.map((item, idx) => (
                                                                <React.Fragment>
                                                                    <tr >
                                                                        <td className="text-left" >{item.fullName}</td>
                                                                        <td>  {item.email} </td>
                                                                        <td>  {item.user_type} </td>
                                                                        <td >
                                                                            {
                                                                                item.status === "deactive" ?
                                                                                    <label className="badge badge-danger">Blocked</label>
                                                                                    :
                                                                                    <label className="badge badge-success">Active</label>
                                                                            }
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <Button color='info' size='sm' className="btn-rounded px-3" onClick={() => this.ActiveDrop(item.id)}>View</Button>
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>
                                                            )) :
                                                                <tr>
                                                                    <td colSpan="4" className="text-center">
                                                                        No Request Available
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>

                                                {/* export table hidden */}

                                                <div className="table-responsive d-none">
                                                    <Table id="table-to-xls" className="table ">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by text-left" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}>Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("email")}>Email Address</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("user_type")}> User Type</th>
                                                                <th> Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.exportList.length > 0 ? this.state.exportList.map((item, idx) => (
                                                                <React.Fragment>
                                                                    <tr >
                                                                        <td className="text-left" >{item.fullName}</td>
                                                                        <td>  {item.email} </td>
                                                                        <td>  {item.user_type} </td>
                                                                        <td >
                                                                            {
                                                                                item.status === "deactive" ?
                                                                                    <label className="badge badge-danger">Blocked</label>
                                                                                    :
                                                                                    <label className="badge badge-success">Active</label>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>
                                                            )) :
                                                                <tr>
                                                                    <td colSpan="4" className="text-center">
                                                                        No Request Available
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </Table>
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
                        </div>
                    </div>
                </div>
                <Modal className="resido-admin" size="md" isOpen={this.state.AssignModal} toggle={() => this.ModalClose()}>
                    <ModalHeader className="header-less" toggle={() => this.ModalClose()}>User Detail</ModalHeader>
                    <ModalBody className="border-0 bg-white">
                        {
                            this.state.userList.length > 0 ? this.state.userList.filter(item => item.id === this.state.userId).map((item, idx) => (
                                <div className="row" >
                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Name</label>
                                        <p>{item.fullName}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Email</label>
                                        <p className='text-break'>{item.email}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Country</label>
                                        <p>{item.country_name}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">State</label>
                                        <p>{item.state_name}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Phone Number</label>
                                        <p>{item.phone}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">User Type</label>
                                        <p>{item.user_type}</p>
                                    </div>

                                    <div className="col-12 col-lg-12">
                                        <label className="fw-bold">Status</label>
                                        <p>{item.status === "active" ? "Active" : item.status === "deactive" ? "Blocked" : ""}</p>
                                    </div>
                                </div>
                            )) :
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No data Available
                                    </td>
                                </tr>
                        }
                    </ModalBody>
                    {
                        this.state.userList.length > 0 && this.state.userList.filter(item => item.id === this.state.userId).map((item, idx) => (
                            <ModalFooter >
                                <div className="d-flex justify-content-between w-100">
                                    {
                                        item.status === "active" ?
                                            <Button color="success" onClick={(e) => this.SubmitProperty(item, "block")} >Block</Button> :
                                            <Button color="success" onClick={(e) => this.SubmitProperty(item, "unblock")}  >Unblock</Button>
                                    }
                                    <Button color="danger" onClick={(e) => this.ModalClose()}  >Cancel</Button>
                                </div>
                            </ModalFooter>
                        ))
                    }
                </Modal>
            </div>
        )
    }
}