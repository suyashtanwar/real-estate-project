import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Button } from 'reactstrap'
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { APIURL } from '../../constants/common';
import { Modal, ModalBody, ModalHeader, ModalFooter, Input, Spinner } from 'reactstrap'
import Pagination from "react-js-pagination";
import Select from 'react-select'
import dateFormat, { masks } from "dateformat";

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
            propertyRequest: [],
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "pending", "label": "Under Review" }, { 'value': "accept", "label": "Accepted" }, { 'value': "unverify", "label": "Not Verified" }],
            statusDefault: [{ 'value': "", "label": "Status" }],
            CommetModal: false,
            isLoading: false,
            rejectComment: "",
            errMsg: "",
            scsMsg: "",
            Loader: false,
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            status: [],
            sort: false,
            sortby: "DESC",
            columnName: "",
            activeSide:false
        }
    }

    componentDidMount() {
        this.getAssignedProperty()
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
                    this.getAssignedProperty()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getAssignedProperty()
                })
            }
        })
    }

    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getAssignedProperty()
                }, 300);
            });
    }
    

    handleStatus(e) {
        this.setState(
            {
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getAssignedProperty() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getAssignedProperty()
            }
        );
    }

    getAssignedProperty() {
        this.setState({ Loader: true })
        const token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('sortby', this.state.sortby);
        formData.append('limit', this.state.limit);
        formData.append('sorttype', this.state.columnName);
        axios
            .post(APIURL + "agent/get-assign-properties", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("agent/get-assign-properties", response.data.data)
                // if (response.data.data.data && response.data.data.data.length > 0) {
                this.setState({
                    propertyRequest: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader: false
                });
                // }
            });
    }

    CommetModal(e) {
        this.setState({
            CommetModal: !this.state.CommetModal,
        })
    }

    ModalClose() {
        this.setState({
            CommetModal: false
        })
    }
    rejectComment(e) {
        this.setState({
            rejectComment: e
        })
    }
    ViewDetailsPreview(e) {
        this.setState({
            ViewPropertyId: e.id,
            goToPreview: true
        })
    }

    SubmitRequest = (e, status) => {
        this.setState({ isLoading: true })
        var token = this.state.token

        const formData = new FormData();
        formData.append('property_id', e.id);
        formData.append('status', status);
        formData.append('comment', this.state.rejectComment)

        this.setState({ Loader: true, CommetModal: false });
        axios
            .post(APIURL + "agent/update-property-assign-request-status", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                    scsMsg: response.data.message,
                    updateStatus: response.data.data.status
                });
                this.getAssignedProperty()

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    CommetModal: false,
                    isLoading: false
                })
            });
        this.getAssignedProperty()
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
        if (this.state.goToPreview) {
            return <Redirect to={"/agent/property/details/" + this.state.ViewPropertyId} push={true} />;
        }
        return (
            <div>
                <div className="container-scroller resido-admin">
                    {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                    <Navbar 
                     sideMenu={this.sideMenu.bind(this)}
                     activeSide={this.state.activeSide}/>
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}
                         activePage="Assigned_property" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Assigned Property</h4>
                                </div>
                                {this.state.scsMsg || this.state.errMsg ?
                                    <div className={this.state.scsMsg ? "alert alert-success mb-4" : "alert alert-danger mb-4"} role="alert">
                                        {this.state.scsMsg} {this.state.errMsg.message}
                                    </div>
                                    : ""}

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
                                                <div className="table-responsive">
                                                    <table className="table ">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}>Property Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("seller_name")}> Seller Name</th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("created_at")}>Created Date</th>
                                                                <th> Status</th>
                                                                <th className="text-center"> Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.propertyRequest.length > 0 ? this.state.propertyRequest.map((item, idx) => (
                                                                <React.Fragment>
                                                                    <tr style={{ fontWeight: "700" }}>
                                                                        <td >{item.name}</td>
                                                                        <td >{item.seller_detail.fullName}</td>
                                                                        <td > {dateFormat(item.created_at, 'dd-mm-yyyy')}</td>
                                                                        <td>
                                                                            {
                                                                                item.propertyAssignedStatus === "accept" && item.propertyVerifiedStatus === "verify" ?
                                                                                    <label className="badge badge-success">Verified</label>
                                                                                    :
                                                                                    item.propertyAssignedStatus === "accept" && item.propertyVerifiedStatus === "unverify" ?
                                                                                        <label className="badge badge-danger">Not Verified</label>
                                                                                        :
                                                                                        item.propertyAssignedStatus === "accept"
                                                                                            ?
                                                                                            <label className="badge badge-success">Accepted</label>
                                                                                            :
                                                                                            <label className="badge badge-primary">Under Review</label>
                                                                            }
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <div>
                                                                                <Button size="sm" type="button" color="info" className="btn-rounded" onClick={(e) => this.ViewDetailsPreview(item)} >View</Button>

                                                                            </div>
                                                                        </td>
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
        )
    }
}
