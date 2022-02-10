import React, { Component } from 'react'
import { Row, Col, Spinner, Jumbotron, Label, Input, Button, Modal, ModalBody, ModalHeader, Table, ModalFooter } from 'reactstrap';
import axios from "axios";
import { APIURL } from '../../../constants/common';
import { Redirect, Link } from "react-router-dom";


export default class Map extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            selectedFiles: [],
            selectedOptions: [],
            Images: [],
            tempArr: [],
            GallertData: [],
            removeId: "",
            scsMsg: "",
            errMsg: ""
        };
    }

    componentDidMount() {
        // this.getAddressInfo()
    }
    handleListingPrice = (e) =>{
        this.setState({listingPrice:e})
    }
    handleHoa = (e) =>{
        this.setState({hoa_free:e})
    }
    handleFlooring = (e) => {
        this.setState({  flooring:e })
    }

    handleFeatureType(e) {
        this.setState({ featureTypeId: e })
    }
    handleTotalBedrooms = (e) => {
        this.setState({ totalBedRooms: e })
    }

    handleTotalBathRooms = (e) => {
        this.setState({  totalBathRooms: e })
    }
    handleFullBath = (e) => {
        this.setState({ fullBath: e })
    }
    handleHalfBath = (e) => {
        this.setState({ halfBath: e })
    }
    handleCooling = (e) => {
        this.setState({ cooling: e })
    }
    handleHeating = (e) => {
        this.setState({ heating: e })
    }
    handleParkingSpace = (e) => {
        this.setState({ parkingSpace: e })
    }
    
    handleWalkout = (e) => {
        this.setState({
            walkout: e
        })
    }
    handleStoryHouse = (e) => {
        this.setState({
            storiesOfHouse: e
        })
    }
    handleFinished = (e) => {
        this.setState({
            finished:e
        })
    }


    
    onSubmit() {
        this.props.data.handleActiveTab("4");
    }

    getAddressInfo() {
        if (this.state.user) {
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.props.data.property_id);
            var token = this.state.token
            axios
                .post(APIURL + "seller/property-features-edit", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    // this.setState({
                    //     listingPrice:info.listing_price === "0.00" ? "" :info.listing_price,
                    //     hoa_free: info.hoa_free,
                    //     featureTypeId:info.feature_type,
                    //     totalBedRooms:info.total_bedrooms,
                    //     totalBathRooms:info.total_bathrooms,
                    //     fullBath:info.full_bath,
                    //     halfBath:info.half_bath,
                    //     cooling:info.cooling,
                    //     heating:info.heating,
                    //     parkingSpace:info.parking_space,
                    //     walkout:info.walkout,
                    //     storiesOfHouse:info.stories_of_the_house,
                    //     finished:info.finished
                    // })
                    this.setState({
                        listingPrice:info.listing_price === "0.00" ? "" :info.listing_price,
                        hoa_free: info.hoa_free,
                        featureTypeId:info.feature_type === "undefined" ? "" :info.feature_type,
                        totalBedRooms:info.total_bedrooms === "null" ? "" :info.total_bedrooms,
                        totalBathRooms:info.total_bathrooms === "null" ? "" :info.total_bathrooms,
                        fullBath:info.full_bath === "null" ? "" :info.full_bath,
                        halfBath:info.half_bath === "null" ? "" :info.half_bath,
                        cooling:info.cooling === "null" ? "" :info.cooling,
                        heating:info.heating === "null" ? "" :info.heating,
                        parkingSpace:info.parking_space === "null" ? "" :info.parking_space,
                        walkout:info.walkout === "null" ? "" :info.walkout,
                        storiesOfHouse:info.stories_of_the_house === "null" ? "" :info.stories_of_the_house,
                        finished:info.finished === "null" ? "" :info.finished
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
        this.props.data.handleActiveTab("5");
        // var token = this.state.token
        // const { userInfo, user } = this.state;
        // const formData = new FormData();
        // formData.append('listing_price', this.state.listingPrice);
        // formData.append('hoa_free', this.state.hoa_free);
        // formData.append('feature_type', this.state.featureTypeId);
        // formData.append('total_bedrooms', this.state.totalBedRooms);
        // formData.append('total_bathrooms', this.state.totalBathRooms);
        // formData.append('full_bath', this.state.fullBath);
        // formData.append('half_bath', this.state.halfBath);
        // formData.append('cooling', this.state.cooling);
        // formData.append('heating', this.state.heating);
        // formData.append('parking_space', this.state.parkingSpace);
        // formData.append('walkout', this.state.walkout);
        // formData.append('finished', this.state.finished);
        // formData.append('stories_of_the_house', this.state.storiesOfHouse);
        // formData.append('property_id', this.props.data.property_id);
        // this.setState({ Loader: true });
        // axios
        //     .post(APIURL + "seller/property-features-update", formData, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        //     .then((response) => {
        //         this.setState({
        //             errMsg: {},
        //             Loader:false
        //         }, () => {
        //             this.props.data.handleActiveTab("5");
        //         });
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             errMsg: error.response.data.error,
        //             Loader: false
        //         })
        //     });
    };
    render() {

        return (
            <React.Fragment>
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                {this.state.errMsg.upload_files ?
                    <div className="alert alert-danger text-center" role="alert">
                        {this.state.errMsg.upload_files}
                    </div>
                    : ""}
                <form className="mt-4">
                    <div className="form-group multi-preview">
                        <div className="card">
                            {this.state.scsMsg}
                            <div className="list-group list-group-flush">
                                <div className="row">
                                    <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Map</label>
                                    <input
                                        disabled
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="text"
                                        name="map"
                                        placeholder="Map"
                                        // value={this.state.userInfo.map}
                                        // onChange={this.onChangehandler}
                                    />
                                     <span className="text-danger">{this.state.errMsg.map}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <Button color="gradient-success" className="mr-1" onClick={(e) => this.props.data.handleActiveTab("3")} ><i className="mdi mdi-arrow-left me-1"></i>Back to Features</Button>
                            <Button color="gradient-info" className="" onClick={(e) => this.onSubmitHandler()} >Go To Gallery <i className="mdi mdi-arrow-right ms-1"></i></Button>
                        </div>
                    </div>
                </form >
            </React.Fragment>
        )
    }
}
