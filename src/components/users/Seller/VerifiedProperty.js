import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Button } from 'reactstrap'
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { APIURL } from '../../constants/common';
import { Spinner, Input } from 'reactstrap'
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
export default class VerifiedProperty extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            propertyRequest: [],
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
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }
    componentDidMount() {
        this.getVerifiedProperty()

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
                    this.getVerifiedProperty()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getVerifiedProperty()
                })
            }
        })
    }
     
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getVerifiedProperty()
                }, 300);
            });
    }
    

    handleStatus(e) {
        this.setState(
            {
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            }
            , () => { this.getVerifiedProperty() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getVerifiedProperty()
            }
        );
    }
    getVerifiedProperty() {
        this.setState({Loader:true})
        const token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('sortby', this.state.sortby);
        formData.append('limit', this.state.limit);
        formData.append('sorttype', this.state.columnName);
        axios
            .post(APIURL + "seller/get-verified-properties", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("seller/get-verified-properties", response.data.data.data)
                   this.setState({
                        propertyRequest: response.data.data.data,
                        activePage: response.data.data.current_page,
                        totalItemsCount: response.data.data.total,
                        limit: response.data.data.per_page,
                        Loader:false
                    });
                
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
            goToPreviewVeri: true
        })
    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.goToPreviewVeri) {
            return <Redirect to={"/seller/verified/property/details/" + this.state.ViewPropertyId} push={true} />;
        }
        return (
            <div className="resido-admin">
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}

                <div className="container-scroller">
                    <Navbar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}
                        activePage="verified_property" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Verified Property</h4>
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

                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 grid-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table ">
                                                        <thead>
                                                            <tr>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("name")}>Property Name </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("agent_name")}> Agent Name </th>
                                                                <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("created_at")}> Created Date </th>
                                                                <th >Status</th>
                                                                <th className="text-center"> Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.propertyRequest.length > 0 ? this.state.propertyRequest.map((item, idx) => (
                                                                <React.Fragment>
                                                                    <tr style={{ fontWeight: "700" }}>
                                                                        <td >{item.name}</td>
                                                                        <td >{item.agent_detail.fullName}
                                                                        </td>
                                                                        <td > {dateFormat(item.created_at, 'dd-mm-yyyy')}</td>
                                                                        <td>
                                                                            <label className="badge badge-success">Verified</label>
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
                                                                    <td colSpan="3" className="text-center">
                                                                        No Property Available
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
                            {/* <footer className="footer">
                                <div className="container-fluid clearfix">
                                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © website.com 2021</span>
                                </div>
                            </footer> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
