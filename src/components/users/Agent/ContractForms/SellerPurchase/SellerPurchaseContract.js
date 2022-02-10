import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Sidebar from '../../Sidebar'
import Navbar from '../../Navbar'
import axios from "axios";
import { APIURL } from '../../../../constants/common';
import { Button, Input, Spinner } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#B8BCBD" : null,
            color: "grey",
        };
    }
};


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusArray: [{ 'A': "", "label": "A" }, { 'value': "B", "label": "B" }, { 'value': "C", "label": "C" }],
            statusDefault: [{ 'value': "", "label": "Select Type" }],
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            title: "",
            description: "",
            Document: "",
            documentName: "",
            userId: "",
            propertyId: "",
            languages: [],
            selectecdLanguages: [],
            countrycode: "",
            sellerId: "",
            buyerList: [],
            Properties: [],
            propertyId: "",
            redirectback: false,
            errMsg: "",
            Loader:true,
            activeSide:false
        }
    }

    componentDidMount() {
        this.getSellers()
        this.getPropertyList()
        window.scrollTo(0, 0);
        setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
    }
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }
    handleTitle = (e) => {
        this.setState({
            title: e
        });
    };
    handleDescription = (e) => {
        this.setState({
            description: e
        });
    };

    getPropertyList() {
        var token = this.state.token
        axios
            .get(APIURL + "get-latest-properties", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("get-latest-properties", response.data.data)
                let languages = response.data.data;
                for (var c = 0; c < languages.length; c++) {
                    this.state.languages.push({ value: languages[c].id, label: languages[c].name })
                }
            })
            .catch(error => {
                // alert(error)
            })
    }

    SelectedProperty = (SelectedProperty) => {
        this.setState({
            SelectedProperty: SelectedProperty
        });
    }
    handleStatus(e) {
        this.setState(
            {
                status: e.value,
                statusDefault: [{ value: e.value, label: e.label }]
            });
    }

    getSellers() {
        var token = this.state.token
        const formData = new FormData();
        axios
            .post(APIURL + "agent/get-seller-list", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    buyerList: response.data.data
                })
            })
    }

    handleSellerName(e) {
        this.setState({
            sellerId: e
        }, () => {
            this.getProperties()
        })
    }

    getProperties = () => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('user_id', this.state.sellerId);
        axios
            .post(APIURL + "agent/get-property-list-using-seller", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Properties: response.data.data
                });
            })
            .catch((error) => {
                setTimeout(() => this.setState({ errMsg: "" }), 3000);
            });
    };
    handlePropertyName(e) {
        this.setState({
            propertyId: e
        }, () => {
            this.getProperties()
        })
        console.log("propertyId", this.state.propertyId)
    }

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('contract_title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('contract_type', "agent_to_seller");
        formData.append('contract_document', this.state.document);
        formData.append('property_id', this.state.propertyId);
        formData.append('user_id', this.state.sellerId);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "agent/send-purchase-contract", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                    scsMsg: response.data.message,
                })
                this.UpdateSuccessfully(this.state.scsMsg)
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    handleUploadDoc = (e) => {
        this.setState({
            document: e.target.files[0],
            documentName: e.target.files[0].name
        }, () => {
            console.log(this.state.document)
        })
    }
    UpdateSuccessfully = (e) => toast.success(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored",
        onClose: () =>
            this.setState({
                redirectback: true
            })
    })

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.user.user_type !== "Agent") {
            return <Redirect to="/permission" />;
        }
        if (this.state.redirectback) {
            return <Redirect to="/agent/contract/seller/purchase/list" />;
        }
        return (
            <>
                <div className="container-scroller resido-admin">
                    {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
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
                     <Navbar 
                    sideMenu={this.sideMenu.bind(this)}
                    activeSide={this.state.activeSide}
                     />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}
                          activePage="SellerPurchase" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">Seller Purchase</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card">
                                                <div className="card-body">
                                                    <form className="forms-sample">
                                                        <div className="row">
                                                            <div className="form-group col-lg-12 col-12">
                                                                <label htmlFor="exampleInputName1">Contract Title<strong className="text-danger" >*</strong></label>
                                                                <input
                                                                    className="form-control"
                                                                    required=""
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="Contract Title"
                                                                    value={this.state.title}
                                                                    onChange={(e) => this.handleTitle(e.target.value)}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.contract_title}</span>
                                                            </div>
                                                            {/* <div className="form-group col-lg-12 col-12">
                                                                <label htmlFor="exampleInputName1">Select Type</label>
                                                                <Select
                                                                    aria-label=".form-select-lg example"
                                                                    required=""
                                                                    placeholder="Select Type"
                                                                    className="form-select-control"
                                                                    options={this.state.statusArray}
                                                                    value={this.state.statusDefault}
                                                                    styles={colourStyles}
                                                                    onChange={(e) => this.handleStatus(e)}
                                                                />
                                                            </div> */}
                                                            <div className="col-lg-6 col-md-6">
                                                                <div className="form-group">
                                                                    <label>Seller<strong className="text-danger" > *</strong></label>
                                                                    <div className="input-with-icon">
                                                                        <select className="form-control" id="dropdown" onChange={(e) => this.handleSellerName(e.target.value)}  >
                                                                            <option  >Select Seller</option>
                                                                            {this.state.buyerList.length > 0 ?
                                                                                this.state.buyerList.map((item, idx) => (
                                                                                    <option value={item.id} selected={item.id === 231}  >{item.name}</option>
                                                                                )) :
                                                                                <span></span>
                                                                            }
                                                                        </select>
                                                                        <span className="text-danger">{this.state.errMsg.user_id}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6">
                                                                <div className="form-group">
                                                                    <label>Property<strong className="text-danger" > *</strong></label>
                                                                    <div className="input-with-icon">
                                                                        <select className="form-control" id="dropdown" onChange={(e) => this.handlePropertyName(e.target.value)}  >
                                                                            <option>Select Property</option>
                                                                            {this.state.Properties.length > 0 ?
                                                                                this.state.Properties.map((item, idx) => (
                                                                                    <option value={item.id} >{item.name}</option>
                                                                                )) :
                                                                                <span></span>
                                                                            }
                                                                        </select>
                                                                        <span className="text-danger">{this.state.errMsg.property_id}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-lg-6 col-12">
                                                                <label>Upload Document<strong className="text-danger" > *</strong></label>
                                                                <div className="mb-3">
                                                                    <Input
                                                                        type="file"
                                                                        onChange={this.handleUploadDoc}
                                                                        className="form-control"
                                                                        id="fileinput"
                                                                        style={{ height: "100%" }}
                                                                    />
                                                                    <span className="text-danger">{this.state.errMsg.contract_document}</span>
                                                                    <span>(Only pdf and docx file format)</span>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-lg-12 col-12">
                                                                <label htmlFor="exampleInputName1">Description</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    required=""
                                                                    type="textarea"
                                                                    name="name"
                                                                    rows={5}
                                                                    placeholder="Description"
                                                                    value={this.state.description}
                                                                    onChange={(e) => this.handleDescription(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Button
                                                            color="info"
                                                            className="btn btn-info mr-2"
                                                            onClick={() => this.onSubmitHandler()}
                                                        >Send Contract</Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
