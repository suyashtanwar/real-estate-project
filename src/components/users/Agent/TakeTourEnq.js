
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Modal, Spinner, ModalBody, ModalHeader, ModalFooter, Button, Input } from 'reactstrap'
import { APIURL } from '../../constants/common';
import axios from 'axios'
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
            propertyName: "",
            enquiryInfoModal: false,
            EnquiryList: [],
            EnquiryInfo: [],
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "pending", "label": "Pending" }, { 'value': "accept", "label": "Accepted" }, { 'value': "reject", "label": "Rejected" }],
            statusDefault: [{ 'value': "", "label": "Status" }],
            property_id: "",
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            status: [],
            sort: false,
            sortby: "DESC",
            columnName: "",
            color: 'white',
            errMsg: {},
            enquiryId: "",
            enquiryComment: "",
            activeSide:false
        }
        this.SortBy = this.SortBy.bind(this);
    }

    listenScrollEvent = e => {
        if (window.scrollY > 400) {
            this.setState({ color: 'black' })
        } else {
            this.setState({ color: 'white' })
        }
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
                    this.getEnquiryList()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getEnquiryList()
                })
            }
        })
    }

  
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getEnquiryList()
                }, 300);
            });
    }

    handleStatus(e) {
        this.setState(
            {
                activePage: 1,
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getEnquiryList() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getEnquiryList()
            }
        );
    }
    // Name handler
    handlechange(e) {
        this.setState({
            propertyName: e
        })
    }

    getEnquiryList() {
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
            .post(APIURL + "agent/get-tour-enquiry-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("agent/get-tour-enquiry-list", response.data.data.data)
                this.setState({
                    EnquiryList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader:false
                })
            })
    }
    getEnquiryinfo = (e) => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('enquiry_id', this.state.enquiryId);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "view-enquiry-detail", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                    EnquiryInfo: response.data.data,

                });
                console.log(this.state.columnName)
            })
            .catch((error) => {
                this.setState({
                    // errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };

    SubmitProperty = (e, status) => {
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('enquiry_id ', this.state.enquiryId);
        formData.append('status', status);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "agent/update-enquiry-status", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("property-add", response.data.data.id)
                localStorage.setItem("property_id", response.data.data.id);
                this.setState({
                    scsMsg: response.data.message,
                    property_id: response.data.data.id,
                    Loader: false,
                    // redirect: true
                })
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    enquiryInfoModal(e) {
        this.setState({
            enquiryInfoModal: !this.state.enquiryInfoModal,
            enquiryId: e.id
        }, () => {
            this.getEnquiryinfo(this.state.enquiryId)
        })
    }
    ModalClose() {
        this.setState({
            enquiryInfoModal: false
        })
    }

    onSubmitHandler = (enquiry_id, status) => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('enquiry_id', enquiry_id);
        formData.append('status', status);
        formData.append('enquiry_comment', this.state.enquiryComment);

        axios
            .post(APIURL + "update-enquiry-status", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    enquiryInfoModal: false
                })
                this.getEnquiryList()
            })
            .catch((error) => {
                // this.setState({
                //     errMsg: error.response.data.error,
                //     Loader: false,
                //     Visible: false
                // })
            });
        this.getEnquiryList()
    };

    handlEnquiryComment = (e) => {
        this.setState({
            enquiryComment: e
        })
    }

    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    componentDidMount() {
        this.getEnquiryList()

    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        return (
            <div className="resido-admin">
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                <div className="container-scroller">
                    <Navbar 
                    sideMenu={this.sideMenu.bind(this)}
                    activeSide={this.state.activeSide}
                    />
                    <div className="page-body-wrapper">
                        <Sidebar 
                        sideMenu={this.sideMenu.bind(this)}
                        activeSide={this.state.activeSide}
                        activePage="take_tour" activetabb={true} />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Take A Tour</h4>
                                    {/* <Button onClick={() => this.AddpropertyModal()} color="info" className="px-3 btn-sm">Add Property</Button> */}
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3 mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                        <Input type="text" onChange={(e) => this.handleSearch(e)} placeholder="Search" />
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 ml-auto">
                                        <Select
                                            aria-label=".form-select-lg example"
                                            required=""
                                            placeholder="Status"
                                            className="form-select-control"
                                            options={this.state.statusArray}
                                            value={this.state.statusDefault}
                                            styles={colourStyles}
                                            onChange={(e) => this.handleStatus(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin mt-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("property_name ")}> Property Name </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("buyer_name")} >Buyer Name  </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("created_at")}>Created Date </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("enquiry_date")}>Enquiry Date </th>
                                                                <th className="text-center"> Status </th>
                                                                <th className="text-center"> Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {this.state.EnquiryList.length > 0 ?
                                                                this.state.EnquiryList.map((item, idx) => (
                                                                    <tr key={idx} >
                                                                        <td>
                                                                            {item.property.name}
                                                                        </td>

                                                                        <td>
                                                                            {item.name}
                                                                        </td>
                                                                        <td>
                                                                            {dateFormat(item.created_at, 'dd-mm-yyyy')}
                                                                        </td>
                                                                        <td>
                                                                            {dateFormat(item.date_of_enquiry, 'dd-mm-yyyy')}

                                                                        </td>
                                                                        <td className="text-center">
                                                                            {item.status === "accept" ?
                                                                                <label className="badge badge-success"> Accepted</label>
                                                                                :
                                                                                item.status === "reject" ?
                                                                                    <label className="badge badge-danger ">Rejected</label>
                                                                                    :
                                                                                    <label className="badge badge-warning ">Pending</label>
                                                                            }
                                                                        </td>
                                                                        <td className="text-center">
                                                                            {/* <Button className="btn btn-dark btn-rounded px-3 btn-sm">Confirm</Button> */}
                                                                            <Button
                                                                                className="btn btn-info btn-rounded px-3 btn-sm ml-2"
                                                                                onClick={(e) => this.enquiryInfoModal(item)}
                                                                            >View</Button>
                                                                        </td>

                                                                    </tr>
                                                                )) :
                                                                <tr  >
                                                                    <td className="text-center" colSpan="6">
                                                                        No Records
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
                            <footer className="footer">
                                <div className="container-fluid clearfix">
                                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © website.com 2021</span>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>

                <Modal className="resido-admin" size="md" isOpen={this.state.enquiryInfoModal} toggle={() => this.ModalClose()} autoFocus={false}>
                    <ModalHeader toggle={() => this.ModalClose()}>Enquiry Details</ModalHeader>
                    <ModalBody>
                        {
                            this.state.EnquiryInfo !== "" ?
                                <div className="row" >
                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">First Name</label>
                                        <p>{this.state.EnquiryInfo.name}</p>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">Enquiry Date</label>
                                        <p>{dateFormat(this.state.EnquiryInfo.date_of_enquiry, 'dd-mm-yyyy')}</p>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">Email </label>
                                        <p className='text-break'>{this.state.EnquiryInfo.email}</p>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">Enquiry Time</label>
                                        <p>{this.state.EnquiryInfo.time_of_enquiry}</p>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">Phone Number</label>
                                        <p>{this.state.EnquiryInfo.contact}</p>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <label className="fw-bold">Status</label>
                                        <p>{this.state.EnquiryInfo.status === "accept" ? "Accepted" : this.state.EnquiryInfo.status === "reject" ? "Rejected" : "Pending"}</p>
                                    </div>
                                    <div className="col-12 col-lg-12">
                                        <label className="fw-bold">Message</label>
                                        <p>{this.state.EnquiryInfo.message}</p>
                                    </div>
                                    {this.state.EnquiryInfo.enquiry_comment ?
                                        <div className="col-12">
                                            <label className="fw-bold">Comment</label>
                                            <p>{this.state.EnquiryInfo.enquiry_comment}</p>
                                        </div>
                                        :
                                        ""
                                    }
                                    {this.state.EnquiryInfo.status === null ?
                                        <div className="col-12">
                                            <label className="fw-bold">Comment</label>
                                            <p>
                                                <textarea
                                                    rows="4"
                                                    className="form-control"
                                                    required=""
                                                    type="number"
                                                    name="streetNumber"
                                                    placeholder="Comment"
                                                    value={this.state.enquiryComment}
                                                    onChange={(e) => this.handlEnquiryComment(e.target.value)}
                                                />
                                            </p>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                                : "NO Data Available"
                        }

                    </ModalBody>
                    <ModalFooter >
                        {this.state.EnquiryInfo.status === null ?
                            <div className="d-flex justify-content-between w-100">
                                <Button color="success" onClick={(e) => this.onSubmitHandler(this.state.EnquiryInfo.id, "accept")} >Accept</Button>
                                <Button color="danger" onClick={(e) => this.onSubmitHandler(this.state.EnquiryInfo.id, "reject")}  >Reject</Button>
                              </div>
                            :
                            ""
                        }
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}