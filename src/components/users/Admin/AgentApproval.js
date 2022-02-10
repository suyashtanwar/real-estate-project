import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Button } from 'reactstrap'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import Pagination from "react-js-pagination";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input, Spinner } from 'reactstrap'
import Select from 'react-select'
import dateFormat, { masks } from "dateformat";
import { Redirect } from 'react-router';

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#B8BCBD" : null,
            color: "grey",
        };
    },
};

export default class Property extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            agentReq: [],
            AgentInfo: [],
            statusArray: [{ 'value': "", "label": "All" }, { 'value': "pending", "label": "Pending" }, { 'value': "Approved", "label": "Approved" },],
            statusDefault: [{ 'value': "", "label": "All" }],
            AgentId: "",
            ReqStatus: "",
            agentInfoModal: false,
            Loader: true,
            languages: [],
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            status: [],
            sort: false,
            sortby: "DESC",
            columnName: "",
            LicenseDoc: false,
            activeSide:false
        }
    }

    componentDidMount() {
        this.getAgentRequests()
    }
    LicenseDoc = () => {
        this.setState({
            LicenseDoc: !this.state.LicenseDoc,
            agentInfoModal: !this.state.agentInfoModal
        })
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
                    this.getAgentRequests()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getAgentRequests()
                })
            }
        })
    }

    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getAgentRequests()
                }, 300);
            });
    }

    handleStatus(e) {
        this.setState(
            {
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getAgentRequests() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getAgentRequests()
            }
        );
    }


    getAgentRequests() {
        this.setState({ Loader: true });
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('sortby', this.state.sortby);
        formData.append('limit', this.state.limit);
        formData.append('sorttype', this.state.columnName);

        axios
            .post(APIURL + "admin/get-agent-request-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("admin/get-agent-request-list", response.data.data.data)
                this.setState({
                    agentReq: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader:false
                });
            });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getAgentRequests()
            }
        );
    }

    AgentInfoModal(e, idx, status) {
        this.setState({
            agentInfoModal: !this.state.agentInfoModal,
            languages: e.language_data,
            ReqStatus: status
        }, () => {
            this.getAgentInfo(e.id,)
        })
    }

    ModalClose() {
        this.setState({
            agentInfoModal: false
        })
    }

    getAgentInfo = (e) => {

        var token = this.state.token
        const formData = new FormData();
        formData.append('id', e);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/agent-profile-view", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    Loader: false,
                    AgentInfo: response.data.data,
                    languageList: response.data.data.language_data
                });
                console.log("", this.state.languageList)
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };

    onSubmitHandler = (e, status) => {
        this.setState({ isLoading: true })
        var token = this.state.token

        const formData = new FormData();
        formData.append('id', e.id);
        formData.append('status', status);

        this.setState({ Loader: true, agentInfoModal: false });
        axios
            .post(APIURL + "admin/update-agent-request-status", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    errMsg: {},
                    agentInfoModal: false,
                    isLoading: false
                }, () => {
                    this.getAgentRequests()
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    agentInfoModal: false,
                    isLoading: false
                })
            });
    };
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
                         activePage="agent_request" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">AGENT REQUEST</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3 mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                        <Input type="text" onChange={(e) => this.handleSearch(e)} placeholder="Search" />
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
                                                {/* <h4 className="card-title  justify-content-between d-flex ">Agent Requests</h4> */}
                                                <div className="table-responsive">
                                                    <table className="table text-center">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by text-left" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}> Agent Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("created_at")}> Request Date</th>
                                                                <th> Status</th>
                                                                <th> Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.agentReq.length > 0 ? this.state.agentReq.map((item, idx) => (
                                                                <React.Fragment>
                                                                    {item.is_approved === "Reject" ? "" :
                                                                        <tr>
                                                                            <td className="text-left" >{item.fullName}</td>
                                                                            <td > {dateFormat(item.created_at, 'dd-mm-yyyy')}</td>
                                                                            <td>
                                                                                {item.is_approved === "Approved" ? <span className="badge badge-success ">{item.is_approved}</span>
                                                                                    :
                                                                                    item.is_approved === "Reject" ? <span className="badge badge-danger " >{item.is_approved}</span>
                                                                                        :
                                                                                        <label className="badge badge-warning " style={{ color: "#5B6868" }}>Pending</label>}</td>
                                                                            <td className="text-center">
                                                                                <div>
                                                                                    <Button size="sm" color="info" className="btn-rounded" onClick={(e) => this.AgentInfoModal(item)} >View</Button>

                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </React.Fragment>
                                                            )) :
                                                                <tr>
                                                                    <td colSpan="4" className="text-center">
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
                <Modal className="resido-admin" size="md" isOpen={this.state.agentInfoModal} toggle={() => this.ModalClose()}>
                    <ModalHeader className="header-less" toggle={() => this.ModalClose()}>Agent Detail</ModalHeader>
                    <ModalBody className="border-0 bg-white">
                        {
                            this.state.AgentInfo !== "" ?
                                <div className="row" >
                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Name</label>
                                        <p>{this.state.AgentInfo.fullName}</p>
                                    </div>

                                    <div className="col-6 col-lg-6" >
                                        <label className="fw-bold">Email</label>
                                        <p className='text-break'>{this.state.AgentInfo.email}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Country</label>
                                        <p>{this.state.AgentInfo.country_name}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">State</label>
                                        <p>{this.state.AgentInfo.state_name}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Phone Number</label>
                                        <p>{this.state.AgentInfo.phone}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Languages</label>
                                        <p>
                                            {this.state.languages.map(item => (
                                                <span className="mr-1">{item.label}  </span>
                                            ))}
                                            {/* {
                                            this.state.AgentInfo.map((item)=>(
                                               <span>{item.label}</span>
                                            ))
                                            } */}
                                        </p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">License Number</label>
                                        <p>{this.state.AgentInfo.license_number}</p>
                                    </div>


                                    <div className="col-12 col-lg-12">
                                        <label className="fw-bold">Introduction</label>
                                        <p>{this.state.AgentInfo.introduction}</p>
                                    </div>

                                    <div className="col-12 col-lg-12">
                                        <label className="fw-bold">License Document</label>
                                        <div className="text-center">
                                            {this.state.AgentInfo.license_document ?
                                                <div className="img-gallery" style={{ paddingLeft: "0px" }}>
                                                    <img width="188px" className=""
                                                        onClick={() => this.LicenseDoc()}
                                                        src={this.state.AgentInfo.license_document}
                                                    />
                                                </div> : "No Document Available"}
                                        </div>
                                    </div>

                                </div>
                                : "NO Data Available"
                        }
                    </ModalBody>
                    <ModalFooter >
                        {this.state.AgentInfo.is_approved === null ?
                            <div className="d-flex justify-content-between w-100">
                                <Button color="success" onClick={(e) => this.onSubmitHandler(this.state.AgentInfo, "Approved")} >Approve</Button>
                                <Button color="danger" onClick={(e) => this.onSubmitHandler(this.state.AgentInfo, "Reject")}  >Reject</Button>
                                {/* <Button type="button" onClick={() => this.taketourClose()} className="btn btn-secondary" >Close</Button> */}
                            </div>
                            :
                            ""
                        }
                    </ModalFooter>
                </Modal>
                <Modal className="resido-admin" size="md" isOpen={this.state.LicenseDoc} toggle={() => this.LicenseDoc()} autoFocus={false}>
                    <ModalHeader toggle={() => this.LicenseDoc()}>License Document</ModalHeader>
                    <ModalBody>
                        <img className="w-100 "
                            src={this.state.AgentInfo.license_document}
                        />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            </div>
        )
    }
}
