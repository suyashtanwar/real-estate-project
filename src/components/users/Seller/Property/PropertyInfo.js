import React, { Component } from 'react'
import { Button, Spinner } from 'reactstrap'
import axios from "axios";
import { APIURL } from '../../../../components/constants/common';
// import { Helmet } from "react-helmet";
import NumberFormat from 'react-number-format';

export default class PropertyInfo extends Component {
    constructor() {
        super();

        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            property_id: JSON.parse(localStorage.getItem("property_id")),
            userInfo: {
                propertyName: "",
                bedRooms: "",
                bathRooms: "",
                squareFootage: "",
                lotSize: "",
                yearBuild: "",
                hourseDesc: "",
            },
            listingPrice: "",
            flooring: "",
            fireplace: "",
            swimmingPool: "",
            errMsg: "",
            Loader: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPropertyInfo()
        // this.getPropertyList()
    }

    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({
            userInfo,
            errMsg: ""
        });
        console.log(userInfo)
    };
    handleListingPrice = (e) => {
        this.setState({ listingPrice: e })
    }

    handleFlooring(e) {
        this.setState({
            flooring: e
        })
    }
    handleFirePlace(e) {
        this.setState({
            fireplace: e
        })
    }
    handlePool(e) {
        this.setState({
            swimmingPool: e
        })
    }
    getPropertyInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.props.data.property_id);
            var token = this.state.token
            axios
                .post(APIURL + "seller/property-other-detail-edit", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    this.setState({
                        listingPrice: info.listing_price === "0.00" ? "" : info.listing_price,
                        userInfo: {
                            propertyName: info.property_name,
                            bedRooms: info.number_of_bedrooms === "null" ? "" : info.number_of_bedrooms,
                            bathRooms: info.number_of_bathrooms === "null" ? "" : info.number_of_bathrooms,
                            squareFootage: info.total_square_footage === "null" ? "" : info.total_square_footage,
                            lotSize: info.lot_size === "null" ? "" : info.lot_size,
                            yearBuild: info.year_built === "null" ? "" : info.year_built,
                            hourseDesc: info.house_description === "null" ? "" : info.house_description,
                        },
                        flooring: info.flooring === "null" ? "" : info.flooring,
                        fireplace: info.fireplace === "null" ? "" : info.fireplace,
                        swimmingPool: info.swimming_pool === "null" ? "" : info.swimming_pool
                    })
                   })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('name', this.state.userInfo.propertyName);
        formData.append('listing_price', this.state.listingPrice);
        formData.append('number_of_bedrooms', this.state.userInfo.bedRooms);
        formData.append('number_of_bathrooms', this.state.userInfo.bathRooms);
        formData.append('total_square_footage', this.state.userInfo.squareFootage);
        formData.append('lot_size', this.state.userInfo.lotSize);
        formData.append('year_built', this.state.userInfo.yearBuild);
        formData.append('house_description', this.state.userInfo.hourseDesc);
        formData.append('flooring', this.state.flooring);
        formData.append('fireplace', this.state.fireplace);
        formData.append('swimming_pool', this.state.flooring);
        formData.append('property_id', this.state.property_id ? this.state.property_id : this.props.data.property_id);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-other-detail-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                }, () => {
                    this.props.data.handleActiveTab("2");
                });
            })
            .catch((error) => {
                console.log(error.response.data)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                })
            });
    };

    onSaveHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('name', this.state.userInfo.propertyName);
        formData.append('listing_price', this.state.listingPrice);
        formData.append('number_of_bedrooms', this.state.userInfo.bedRooms);
        formData.append('number_of_bathrooms', this.state.userInfo.bathRooms);
        formData.append('total_square_footage', this.state.userInfo.squareFootage);
        formData.append('lot_size', this.state.userInfo.lotSize);
        formData.append('year_built', this.state.userInfo.yearBuild);
        formData.append('house_description', this.state.userInfo.hourseDesc);
        formData.append('flooring', this.state.flooring);
        formData.append('fireplace', this.state.fireplace);
        formData.append('swimming_pool', this.state.flooring);
        formData.append('property_id', this.state.property_id ? this.state.property_id : this.props.data.property_id);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-other-detail-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                });
            })
            .catch((error) => {
                console.log(error.response.data)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,

                })
            });
    };

    render() {
        console.log("info", this.props)
        return (
            <>
                 {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                {this.state.errMsg.message ?
                    <div className="alert alert-danger text-center mt-3" role="alert">
                        {this.state.errMsg.message}
                    </div>
                    : ""}
                <div className="card mt-1">
                    <div className='position-absolute top-0 end-0'>
                        <Button onClick={(e) => this.onSaveHandler()}  className='btn-sm px-4 btn-rounded btn btn-info'>Save</Button>
                    </div>
                    <div className="">
                        <form className="forms-sample ">
                            <div className="mb-3 border-bottom">
                                <label className="card-title ">General Info</label>
                            </div>
                            <div className="row">
                                {/* Sub Heading */}

                                {/* Sub Heading end */}
                                <div className="form-group col-6 ">
                                    <label htmlFor="exampleInputName1">Property Name <strong className="text-danger" >*</strong> </label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="text"
                                        name="propertyName"
                                        placeholder="Property Name"
                                        value={this.state.userInfo.propertyName}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.name}</span>
                                </div>
                                <div className="form-group col-6 ">
                                    <label htmlFor="exampleInputName1">Listing Price <strong className="text-danger" >*</strong> </label>
                                    <NumberFormat
                                       className="form-control"
                                        thousandsGroupStyle="thousand"
                                        value={this.state.listingPrice}
                                        prefix="$"
                                        decimalSeparator="."
                                        displayType="input"
                                        type="text"
                                        onChange={(e) => this.handleListingPrice(e.target.value)}
                                        thousandSeparator={true}
                                        allowNegative={true} />
                                    <span className="text-danger">{this.state.errMsg.listing_price}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Number of Bedrooms <strong className="text-danger" >*</strong></label>
                                    <input
                                        autoFocus={true}
                                        className="form-control "
                                        required=""
                                        type="number"
                                        min="0"
                                        name="bedRooms"
                                        placeholder="Number of Bedrooms"
                                        value={this.state.userInfo.bedRooms}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleSelectGender">Number of Bathrooms <strong className="text-danger" >*</strong></label>
                                    <input
                                        className="form-control "
                                        required=""
                                        type="number"
                                        min="0"
                                        name="bathRooms"
                                        placeholder="Number of Bathrooms"
                                        value={this.state.userInfo.bathRooms}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.number_of_bathrooms}</span>
                                </div>
                                <div className="form-group col-6">

                                    <label htmlFor="exampleInputPassword4">Total Square Footage <strong className="text-danger" >*</strong></label>
                                    <input
                                        className="form-control quantity_arrow"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="squareFootage"
                                        placeholder="Total Square Footage"
                                        value={this.state.userInfo.squareFootage}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.total_square_footage}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Lot Size (Acres)</label>
                                    <input

                                        className="form-control quantity_arrow"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="lotSize"
                                        placeholder="Lot Size"
                                        value={this.state.userInfo.lotSize}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.lot_size}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Year Build<strong className="text-danger" >*</strong></label>
                                    <input
                                        className="form-control"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="yearBuild"
                                        placeholder="Year Build"
                                        value={this.state.userInfo.yearBuild}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.year_built}</span>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputPassword4">House Description<strong className="text-danger" >*</strong></label>
                                    <textarea
                                        className="form-control"
                                        required=""
                                        type="textarea"
                                        rows="4"
                                        name="hourseDesc"
                                        placeholder="House Description"
                                        value={this.state.userInfo.hourseDesc}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.house_description}</span>
                                </div>

                            </div>

                            <div className="row">
                                <div className="form-group col-6">
                                    <Button className="btn btn-info" onClick={(e) => this.onSubmitHandler()}  >Go to Address <i className="mdi mdi-arrow-right ms-1"></i></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
