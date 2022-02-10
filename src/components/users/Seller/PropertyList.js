
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Modal, Spinner, ModalBody, ModalHeader, ModalFooter, Button, Input } from 'reactstrap'
import { APIURL } from '../../constants/common';
import axios from 'axios'
import Pagination from "react-js-pagination";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            user_type: JSON.parse(localStorage.getItem("user_type")),
            propertyName: "",
            AddpropertyModal: false,
            PropertyList: [],
            statusArray: [{ 'value': "", "label": "Status" }, { 'value': "under_review", "label": "Under Review" }, { 'value': "pending", "label": "Pending" }, { 'value': "accept", "label": "Accepted" }, { 'value': "unverify", "label": "Not Verified" }],
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
    sideMenu = (value) => {
        this.setState({
            activeSide:value
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

   
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getPropertyList()
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
            , () => { this.getPropertyList() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getPropertyList()
            }
        );
    }
    // Name handler
    handlechange(e) {
        this.setState({
            propertyName: e
        })
    }

    getPropertyList() {
        this.setState({Loader:true})
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('sortby', this.state.sortby);
        formData.append('limit', this.state.limit);
        formData.append('sorttype', this.state.columnName);

        axios
            .post(APIURL + "seller/get-properties", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("seller/get-properties", response.data.data.data)
                this.setState({
                    PropertyList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader:false
                })
            })
    }

    SubmitProperty = (e) => {
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('name', this.state.propertyName);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-add", formData, {
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
                    AddpropertyModal:false
                }, () => {
                    this.notify(this.state.scsMsg)
                    setTimeout(() => {
                        this.setState({
                            redirect:true,
                            
                        })
                    }, 5000);
                })
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    AddpropertyModal() {
        this.setState({
            AddpropertyModal: !this.state.AddpropertyModal,
            errMsg: ""
        })
    }
    // AddpropertyModal close
    ModalClose() {
        this.setState({
            AddpropertyModal: false
        })
    }

    notify = (e) => toast.success(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored"
        })

    componentDidMount() {
        this.getPropertyList()
    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.user_type !== "Seller") {
            return <Redirect to="/permission" />;
        }
        if (this.state.redirect) {
            return <Redirect to={"/seller/edit-property/" + this.state.property_id} />;
        }
        return (
            <div className="resido-admin">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {this.state.Loader ? <div className="loader" style={{backgroundColor:""}}> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                <div className="container-scroller">
                    <Navbar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}/>
                    <div className="page-body-wrapper">
                        <Sidebar 
                        sideMenu={this.sideMenu.bind(this)}
                        activeSide={this.state.activeSide}
                        activePage="property_list" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">PROPERTY</h4>
                                    <Button onClick={() => this.AddpropertyModal()} color="info" className="px-3 btn-sm">Add Property</Button>
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
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}> Property Name </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("created_at")} > Created Date </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("seller_name")}> Assigned To</th>
                                                                <th> Status </th>
                                                                <th > Action </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.PropertyList.length > 0 ?
                                                                this.state.PropertyList.map((item, idx) => (
                                                                    <tr key={idx} >
                                                                        <td >
                                                                            {item.name}
                                                                        </td>

                                                                        <td>
                                                                            {(item.created_at.split('T')[0]).split('-')[2]}-{(item.created_at.split('T')[0]).split('-')[1]}-{(item.created_at.split('T')[0]).split('-')[0]}
                                                                        </td>
                                                                        <td>
                                                                            {item.assigned_to ? item.assigned_to : <span className="text-secondary">Not Submitted For Review</span>}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.propertyAssignedStatus === "accept" && item.propertyVerifiedStatus === "verify" ?
                                                                                    <label className="badge badge-success ">Verified</label>
                                                                                    :
                                                                                    item.resend_property === "resend" ? <label className="badge badge-primary">Under Review</label> :
                                                                                        item.propertyAssignedStatus === "accept" && item.propertyVerifiedStatus === "unverify" ?
                                                                                            <label className="badge badge-danger ">Not Verified</label>
                                                                                            :
                                                                                            item.propertyAssignedStatus === "accept" ?
                                                                                                <label className="badge badge-success"> Accepted</label>
                                                                                                :

                                                                                                item.propertyAssigned ?
                                                                                                    <label className="badge badge-primary">Under Review</label> :
                                                                                                    <div>
                                                                                                        <label className="badge badge-warning">Pending</label>
                                                                                                    </div>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.resend_property === "resend" ? <Button disabled className="btn btn-info btn-rounded btn-sm px-3" > Edit </Button> :

                                                                                    item.propertyAssignedStatus === "accept" && item.propertyVerifiedStatus === "unverify" ?
                                                                                        <Link to={"/seller/edit-property/" + item.id} className="btn btn-info btn-rounded px-3 btn-sm">Edit</Link>
                                                                                        :
                                                                                        item.propertyAssigned ?
                                                                                            <Button disabled className="btn btn-info btn-rounded btn-sm px-3" > Edit </Button>
                                                                                            :
                                                                                            <div>
                                                                                                <Link to={"/seller/edit-property/" + item.id} className="btn btn-info px-3 btn-rounded btn-sm"> Edit </Link>
                                                                                            </div>
                                                                            }
                                                                        </td>

                                                                    </tr>
                                                                )) :
                                                                <tr  >
                                                                    <td className="text-center" colSpan="5">
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

                <Modal className="resido-admin" size="md" isOpen={this.state.AddpropertyModal} toggle={() => this.ModalClose()} autoFocus={false}>
                    <ModalHeader toggle={() => this.ModalClose()}>Add Property</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        className="form-control "
                                        placeholder="Property Name"
                                        value={this.state.propertyName}
                                        onChange={(e) => this.handlechange(e.target.value)}
                                        autoFocus={true}
                                    />
                                    {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.name}</span> : ""}
                                </div>
                            </div>
                        </div>
                        {/* {this.state.scsMsg ?
                            <span className="text-success">
                                {this.state.scsMsg}<br />
                            </span>
                            : ""} */}
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex justify-content-between w-100">
                            <Button color="success" onClick={() => this.SubmitProperty()}> <i className="fas fa-save mr-1"> </i>Submit</Button>
                            <Button color="danger" onClick={() => this.ModalClose()}> <i className="fas fa-window-close mr-1"></i>Cancel </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
