
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Spinner, Modal, ModalBody, ModalHeader, Button, Input } from 'reactstrap'
import { APIURL } from '../../../constants/common';
import axios from 'axios'
import Pagination from "react-js-pagination";
import Select from 'react-select'
import Footer from '../Footer'
import Header from '../Header'
import dateFormat from "dateformat";

const colourStyles = {

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#B8BCBD" : null,
            color: "grey",
        };
    },
};

export default class BuyerPurchase extends Component {
    constructor() {
        super();

        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            propertyName: "",
            purchases: [],
            statusArray: [{ 'value': "", "label": "All" }, { 'value': "signed", "label": "Signed" }, { 'value': "unsigned", "label": "Not Signed" }],
            statusDefault: [{ 'value': "", "label": "All" }],
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
            goToNewContract: false,
            Loader: false,
            contractId:"",
            ContractInfoModal: false
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
                    this.getpurchases()
                })

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "DESC",
                    columnName: e
                }, () => {
                    this.getpurchases()
                })
            }
        })
    }

    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.getpurchases()
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
            , () => { this.getpurchases() });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.getpurchases()
            }
        );
    }
    // Name handler
    handlechange(e) {
        this.setState({
            propertyName: e
        })
    }
    getpurchases() {
        this.setState({ Loader: true })
        var token = this.state.token
        const formData = new FormData();
        formData.append('page', this.state.activePage);
        formData.append('search', this.state.search);
        formData.append('statusfilter', this.state.status);
        formData.append('sortby', this.state.sortby);
        formData.append('limit', this.state.limit);
        formData.append('sorttype', this.state.columnName);

        axios
            .post(APIURL + "get-purchase-contract-list-for-user", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("get-contract-list-for-agent", response.data.data.data)
                this.setState({
                    purchases: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    Loader: false
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
                    redirect: true
                })
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    AddNewContract() {
        this.setState({
            goToNewContract: true
        })
    }
    ContractInfoModal(e) {
        this.setState({
            ContractInfoModal: !this.state.ContractInfoModal,
            contractId:e.id
        })
    }
    ModalClose() {
        this.setState({
            ContractInfoModal: false
        })
    }
    toggle(){
        this.setState({
            toggle:!this.state.toggle
        })
    }

    toggleFunChild(value){
        this.setState({
            toggle:value
        })
    }

    componentDidMount() {
        this.getpurchases()
    }


    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.user_type !== "Buyer") {
            return <Redirect to="/permission" />;
        }
        return (
            <>
                <div className="resido-front">
                    {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}

                    <div className="blue-skin dashboard">
                        <div id="main-wrapper">
                            <Navbar data={{ profile_image: this.state.profile_image }} />
                            <div className="clearfix"></div>
                            <Header />
                            <section className="bg-light">
                                <div className="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="filter_search_opt">
                                                <a href="javascript:void(0);" onClick={() => this.toggle()} >Dashboard Navigation<i class="ml-2 ti-menu"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-12">
                                            <Sidebar 
                                            activePage="buyerPurchase"
                                             activetabb={true} 
                                             data={{ profile_image: this.state.profile_image }}
                                             toggleFunChild={this.toggleFunChild.bind(this)}
                                            toggle={this.state.toggle}
                                              />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <div className="dashboard-wraper">
                                                <div className="form-submit">
                                                    <h4>Buyer Purchase</h4>
                                                    <div className="row justify-content-between mt-4">
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
                                                                                    <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("contract_title")}> Contract Title</th>
                                                                                    <th className="sort-by" style={{ cursor: "pointer" }} onClick={(e) => this.SortBy("property_name")}> Property Name </th>
                                                                                    <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("created_at")} > Created Date </th>
                                                                                    <th className=""  > Document</th>
                                                                                    <th className="sort-by" style={{ cursor: "pointer" }} onClick={() => this.SortBy("created_at")} > Status </th>
                                                                                    <th > Action </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {this.state.purchases.length > 0 ?
                                                                                    this.state.purchases.map((item, idx) => (
                                                                                        <tr key={idx} >
                                                                                            <td >
                                                                                                {item.contract_title}
                                                                                            </td>
                                                                                            <td >
                                                                                                {item.property_name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {(item.created_at.split('T')[0]).split('-')[2]}-{(item.created_at.split('T')[0]).split('-')[1]}-{(item.created_at.split('T')[0]).split('-')[0]}
                                                                                            </td>
                                                                                            <td >
                                                                                                <a href={item.document_url}>{item.file_name}</a>
                                                                                            </td>
                                                                                            <td >
                                                                                                {
                                                                                                    item.status === null ?
                                                                                                        <button color='danger' className="badge btn-danger"> Not Signed</button>
                                                                                                        :
                                                                                                        <button color='success' className="badge btn-danger"> Signed</button>

                                                                                                }
                                                                                            </td>
                                                                                            <td >
                                                                                                <Button
                                                                                                    color='dark'
                                                                                                    style={{ backgroundColor: "#198ae3" }}
                                                                                                    className=" btn-rounded px-3 btn-sm ml-2"
                                                                                                    onClick={(e) => this.ContractInfoModal(item)}
                                                                                                >View</Button>
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
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                            <Footer />
                        </div>
                    </div>
                </div>
                <Modal className="resido-admin" size="md" isOpen={this.state.ContractInfoModal} toggle={() => this.ModalClose()}>
                    <ModalHeader className="header-less" toggle={() => this.ModalClose()}>Contract Detail</ModalHeader>
                    <ModalBody className="border-0 bg-white">
                        {this.state.purchases.length > 0 &&
                            this.state.purchases.filter(data => data.id === this.state.contractId).map((item, idx) => (
                                <div className="row" >
                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Contract Title</label>
                                        <p>{item.contract_title}</p>
                                    </div>

                                    <div className="col-6 col-lg-6" >
                                        <label className="fw-bold">Property Name</label>
                                        <p className='text-break'> {item.property_name}</p>
                                    </div>

                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Created Date</label>
                                        <p>  {(item.created_at.split('T')[0]).split('-')[2]}-{(item.created_at.split('T')[0]).split('-')[1]}-{(item.created_at.split('T')[0]).split('-')[0]}</p>
                                    </div>
                                  
                                    <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Status</label>
                                        <p> {
                                            item.status === null ?
                                                "Not Signed"
                                                :
                                                "Signed"
                                        }</p>
                                    </div>
                                    {/* <div className="col-6 col-lg-6">
                                        <label className="fw-bold">Document</label>
                                        <p> <a href='#'>{item.file_name}</a></p>
                                    </div> */}
                                    <div className="col-12 col-lg-12">
                                        <label className="fw-bold">Description</label>
                                        <p> {item.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </ModalBody>
                </Modal>
            </>
        )
    }
}