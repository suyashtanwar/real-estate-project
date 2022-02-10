import React, { Component } from 'react'
import { Button ,Spinner } from 'reactstrap'
import axios from "axios";
import { APIURL } from '../../../../components/constants/common';

export default class PropertyInfo extends Component {
    constructor() {
        super();

        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            listingPrice: "",
            hoa_free: "",
            featureTypeId: "",
            countryId: "",
            countries_name: [],
            Languages: [],
            Countries: [],
            States: [],
            state_name: [],
            state: "",
            name: "",
            image: "",
            selectType: "",
            errMsg: {},
            scsMsg: "",
            country_id: "",
            flooring: "",
            fireplace: "",
            swimmingPool: "",
            Loader:false
        }
    }

    componentDidMount() {
        this.getFeaturesInfo()
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

    getFeaturesInfo() {
        if (this.state.user) {
            this.setState({Loader:true})
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
                        finished:info.finished === "null" ? "" :info.finished,
                        flooring: info.flooring === "null" ? "" :info.flooring,
                        fireplace: info.fireplace === "null" ? "" :info.fireplace,
                        swimmingPool: info.swimming_pool === "null" ? "" :info.swimming_pool,
                        Loader:false
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

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('listing_price', this.state.listingPrice);
        formData.append('hoa_free', this.state.hoa_free);
        formData.append('feature_type', this.state.featureTypeId);
        formData.append('total_bedrooms', this.state.totalBedRooms);
        formData.append('total_bathrooms', this.state.totalBathRooms);
        formData.append('full_bath', this.state.fullBath);
        formData.append('half_bath', this.state.halfBath);
        formData.append('cooling', this.state.cooling);
        formData.append('heating', this.state.heating);
        formData.append('parking_space', this.state.parkingSpace);
        formData.append('walkout', this.state.walkout);
        formData.append('finished', this.state.finished);
        formData.append('stories_of_the_house', this.state.storiesOfHouse);
        formData.append('property_id', this.props.data.property_id);
        formData.append('flooring', this.state.flooring);
        formData.append('fireplace', this.state.fireplace);
        formData.append('swimming_pool', this.state.swimmingPool);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-features-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    errMsg: {},
                    Loader:false
                }, () => {
                    this.props.data.handleActiveTab("4");
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    onSaveHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('listing_price', this.state.listingPrice);
        formData.append('hoa_free', this.state.hoa_free);
        formData.append('feature_type', this.state.featureTypeId);
        formData.append('total_bedrooms', this.state.totalBedRooms);
        formData.append('total_bathrooms', this.state.totalBathRooms);
        formData.append('full_bath', this.state.fullBath);
        formData.append('half_bath', this.state.halfBath);
        formData.append('cooling', this.state.cooling);
        formData.append('heating', this.state.heating);
        formData.append('parking_space', this.state.parkingSpace);
        formData.append('walkout', this.state.walkout);
        formData.append('finished', this.state.finished);
        formData.append('stories_of_the_house', this.state.storiesOfHouse);
        formData.append('property_id', this.props.data.property_id);
        formData.append('flooring', this.state.flooring);
        formData.append('fireplace', this.state.fireplace);
        formData.append('swimming_pool', this.state.swimmingPool);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-features-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    errMsg: {},
                    Loader:false
                }, () => {
                    // this.props.data.handleActiveTab("4");
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    render() {
        console.log(this.props.data.property_id)
        return (
            <>
             {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                {this.state.errMsg.message ?
                <div className="alert alert-danger text-center" role="alert">
                {this.state.errMsg.message}
               </div>
               :""} 
                <div className="card mt-1">
                <div className='position-absolute top-0 end-0'>
                        <Button onClick={(e) => this.onSaveHandler()}  className='btn-sm px-4 btn-rounded btn btn-info'>Save</Button>
                    </div>
                    <div className="">
                        <form className="forms-sample ">
                            <div className="mb-3 border-bottom">
                                <label className="card-title ">Type</label>
                            </div>
                            <div className="row">
                                 {/* Sub Heading */}
                                 
                                 {/* Sub Heading end */}
                                
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Type</label>
                                    <select className="form-control" value={this.state.featureTypeId} onChange={(e) => this.handleFeatureType(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0" >Condo</option>
                                        <option value="1">Apartment</option>
                                        <option value="2" >Single Family</option>
                                        <option value="3">Townhouse</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Parking Space <strong className="text-danger" >*</strong></label>
                                    <select className="form-control" value={this.state.parkingSpace} onChange={(e) => this.handleParkingSpace(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.parking_space}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Stories Of The House</label>
                                    <select className="form-control" value={this.state.storiesOfHouse} onChange={(e) => this.handleStoryHouse(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.stories_of_the_house}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Cooling</label>
                                    <select className="form-control" value={this.state.cooling} onChange={(e) => this.handleCooling(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>

                                    </select>
                                     <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Heating</label>
                                    <select className="form-control" value={this.state.heating} onChange={(e) => this.handleHeating(e.target.value)} >
                                        <option >Select</option>
                                        <option value="0">Electric</option>
                                        <option value="1">Nature Gas</option>
                                        <option value="2">Propane</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.heating}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">HOA Free</label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="text"
                                        name="streetName"
                                        placeholder="HOA Free"
                                        value={this.state.hoa_free}
                                        onChange={(e) => this.handleHoa(e.target.value)}
                                    />
                                     <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                                <div className="my-1 col-12">
                                    <label className="pb-3 card-title border-bottom w-100">Bedroom and Bathroom </label>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Total Bedrooms<strong className="text-danger" >*</strong></label>
                                    <select className="form-control" value={this.state.totalBedRooms} onChange={(e) => this.handleTotalBedrooms(e.target.value)} >
                                    <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>s
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.total_bedrooms}</span>
                                </div>
                                
                                <div className="form-group col-6 ">
                                    <label htmlFor="exampleInputName1">Total Bathrooms <strong className="text-danger" >*</strong></label>
                                    <select className="form-control" value={this.state.totalBathRooms} onChange={(e) => this.handleTotalBathRooms(e.target.value)} >
                                    <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.total_bathrooms}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Full Bath</label>
                                    <select className="form-control" value={this.state.fullBath} onChange={(e) => this.handleFullBath(e.target.value)} >
                                    <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Half Bath</label>
                                    <select className="form-control" value={this.state.halfBath} onChange={(e) => this.handleHalfBath(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.number_of_bedrooms}</span>
                                </div>
                               {/* Sub Heading */}
                                <div className="my-1 col-12">
                                    <label className="pb-3 card-title border-bottom w-100">Basement </label>
                                </div>
                                 {/* Sub Heading end */}
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Finished</label>
                                    <select className="form-control"  value={this.state.finished} onChange={(e) => this.handleFinished(e.target.value)} >
                                        <option value="" >Select</option>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.finished}</span>
                                   
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Walkout</label>
                                    <select className="form-control" value={this.state.walkout} onChange={(e) => this.handleWalkout(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.Walkout}</span>
                                </div>
                                <div className="my-1 col-12">
                                    <label className="pb-3 card-title border-bottom w-100">Flooring</label>
                                </div>
                                <div className="form-group col-12">
                                    {/* <label htmlFor="exampleInputPassword4">Flooring</label> */}
                                    <select className="form-control" value={this.state.flooring} onChange={(e) => this.handleFlooring(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0">Hardwood</option>
                                        <option value="1">Carpet</option>
                                        <option value="1">Ceramic</option>
                                        <option value="2" >Vinyl</option>
                                        <option value="3">Stone</option>
                                    </select>
                                    <span className="text-danger">{this.state.errMsg.flooring}</span>
                                </div>
                                 {/* Sub Heading */}
                                 <div className="my-1 col-12">
                                    <label className="pb-3 card-title border-bottom w-100">Other</label>
                                </div>
                                 {/* Sub Heading end */}
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Fire Places</label>
                                    <select className="form-control" value={this.state.fireplace} onChange={(e) => this.handleFirePlace(e.target.value)} >
                                        <option value="" >Select</option>
                                        <option value="0" >NO</option>
                                        <option value="1">YES</option>
                                    </select>
                                    <span className="text-danger">{this.state.errMsg.Fire_place}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Swimming Pool</label>
                                    <select className="form-control" value={this.state.swimmingPool} onChange={(e) => this.handlePool(e.target.value)} >
                                        <option value="">Select</option>
                                        <option value="0" >NO</option>
                                        <option value="1">YES</option>
                                    </select>
                                    {/* <span className="text-danger">{this.state.errMsg.Swimming_pool}</span> */}
                                </div>
                               
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <Button className="btn btn-success mr-1" onClick={(e) => this.props.data.handleActiveTab("2")} ><i className="mdi mdi-arrow-left me-1"></i>Back to Address</Button>
                                    <Button className="btn btn-info" onClick={(e) => this.onSubmitHandler()}  >Go to Gallery<i className="mdi mdi-arrow-right ms-1"></i></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
