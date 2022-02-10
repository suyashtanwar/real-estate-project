import React, { Component } from 'react'
import { Button ,Spinner} from 'reactstrap'
import axios from "axios";
import { APIURL } from '../../../../components/constants/common';
// import { Helmet } from "react-helmet";
import Map from '../Map/index'
import PlacesAutocomplete, {  geocodeByAddress,   getLatLng, } from 'react-places-autocomplete';

export default class PropertyInfo extends Component {
    constructor() {
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            userInfo: {
                streetNumber: "",
                streetName: "",
                AptNumber: "",
                state: "",
                city: "",
                zip: "",
                map: ""
            },
            countryId: "",
            countries_name: [],
            Languages: [],
            Countries: [],
            States: [],
            state_name: [],
            stateName: "",
            cityName:"",
            name: "",
            image: "",
            selectType: "",
            errMsg: {},
            scsMsg: "",
            country_id: "",
            address: '',
            lat:"",
            long:"",
            countryList:[],
            countrycode:""
        }
    }

    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
          console.log("address",address)
          const str = address
          const pieces = str.split(",")
          const state = pieces[pieces.length - 2]
          const city = pieces[pieces.length - 3]
        
          this.setState({
              stateName:state,
              cityName:city
          })
        geocodeByAddress(address)
          .then(results => getLatLng(results[0],console.log(results)))
          .then(latLng => 
            this.setState({
                lat:latLng.lat,
                long:latLng.lng,
                address:address
            })
            )
          .catch(error => console.error('Error', error));
      };

    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({
            userInfo,
            errMsg: ""
        });
        console.log(userInfo)
    };

    getCountries() {
        axios
            .get(APIURL + "countries")
            .then((response) => {
                this.setState({
                    countryList:response.data.countries
                })
                // console.log("country",response.data.countries)
               
                let countries_name = response.data.countries;
                const CountryNames = [];
                for (var c = 1; c < countries_name.length; c++) {
                    CountryNames.push({ value: countries_name[c].id, label: countries_name[c].name ,code:countries_name[c].code })
                }
                this.setState({
                    Countries: CountryNames,
                })
                console.log(this.state.Countries)
            })
    }

    handleCountry(e) {
        this.state.countryList.filter(index => index.id === parseInt(e)).map(countyInfo => (
           this.setState({
               countrycode:countyInfo.code
           })
          ))
         
        this.setState({
            countryId: e,
            address:"",
            stateName:""
        })
    };

    // get states
    handleCountryState = (id) => {
        axios
            .post(APIURL + "states", {
                country_id: id,
            })
            .then((response) => {
                console.log(response.data)
                let state_name = response.data.states;
                const stateNames = [];
                for (var c = 0; c < state_name.length; c++) {
                    stateNames.push({ value: state_name[c].id, label: state_name[c].name })
                }
                this.setState({
                    States: stateNames,
                })
            })
            .catch((error) => {
                this.setState({

                })
            });
    };

    // handle states
    handleState(e) {
        this.setState({
            stateId: e
        })
    }

    getAddressInfo() {
        if (this.state.user) {
            this.setState({Loader:true})
            const formData = new FormData();
            // formData.append('token', this.state.token);
            formData.append('id', this.props.data.property_id);
            var token = this.state.token
            axios
                .post(APIURL + "seller/property-address-edit", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                  
                    const pieces = info.address.split(",")
                    const state = pieces[pieces.length - 2]
                    this.setState({
                        stateName:state,
                        Loader:false
                    })
                    // alert(state)
                    this.setState({
                        userInfo: {
                            streetNumber: info.street_number === "null" ? "" :info.street_number,
                            streetName: info.street_name === "null" ? "" :info.street_name,
                            AptNumber: info.apt_number === "null" ? "" :info.apt_number,
                            city: info.city === "null" ? "" :info.city,
                            zip: info.zip === "null" ? "" :info.zip,
                            map: info.map === "null" ? "" :info.map
                        },
                        countrycode:info.country_code,
                        address:info.address,
                        countryId:info.country === "null" ? "" :info.country,
                        stateId:info.state === "null" ? "" :info.state,
                    })
                })
                .catch((error) => {
                    this.setState({
                        // errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }
    
    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo ,user } = this.state;
        const formData = new FormData();
        formData.append('street_number', this.state.userInfo.streetNumber);
        formData.append('street_name', this.state.userInfo.streetName);
        formData.append('apt_number', this.state.userInfo.AptNumber);
        formData.append('state', this.state.stateName);
        formData.append('country', this.state.countryId);
        formData.append('city', this.state.cityName);
        formData.append('zip', this.state.userInfo.zip);
        formData.append('map', this.state.userInfo.map);
        formData.append('property_id', this.props.data.property_id);
        formData.append('lat', this.state.lat);
        formData.append('long', this.state.long);
        formData.append('address', this.state.address);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-address-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    errMsg: {},
                }, () => {
                    this.props.data.handleActiveTab("3");
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error ,
                    Loader: false
                })
            });
    };
    onSaveHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo ,user } = this.state;
        const formData = new FormData();
        formData.append('street_number', this.state.userInfo.streetNumber);
        formData.append('street_name', this.state.userInfo.streetName);
        formData.append('apt_number', this.state.userInfo.AptNumber);
        formData.append('state', this.state.stateName);
        formData.append('country', this.state.countryId);
        formData.append('city', this.state.cityName);
        formData.append('zip', this.state.userInfo.zip);
        formData.append('map', this.state.userInfo.map);
        formData.append('property_id', this.props.data.property_id);
        formData.append('lat', this.state.lat);
        formData.append('long', this.state.long);
        formData.append('address', this.state.address);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "seller/property-address-update", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    errMsg: {},
                }, () => {
                    // this.props.data.handleActiveTab("3");
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error ,
                    Loader: false
                })
            });
    };
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getCountries()
        this.getAddressInfo()
    }

    render() {
        console.log("address",this.props.data.property_id)
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
                                <label className="card-title ">Address</label>
                            </div>
                            <div className="row">
                                <div className="form-group col-6 ">
                                    <label htmlFor="exampleInputName1">Street Number <strong className="text-danger" >*</strong> </label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="streetNumber"
                                        placeholder="Street Number"
                                        value={this.state.userInfo.streetNumber}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.street_number}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputEmail3">Street Name </label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="text"
                                        name="streetName"
                                        placeholder="Street Name"
                                        value={this.state.userInfo.streetName}
                                        onChange={this.onChangehandler}
                                    />
                                     <span className="text-danger">{this.state.errMsg.street_name}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Apartment Number</label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="AptNumber"
                                        placeholder="Apartment Number"
                                        value={this.state.userInfo.AptNumber}
                                        onChange={this.onChangehandler}
                                    /> 
                                    <span className="text-danger">{this.state.errMsg.apt_number}</span> </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleSelectGender">Country<strong className="text-danger" >*</strong></label>
                                    <select className="form-control" value={this.state.countryId} onChange={(e) => this.handleCountry(e.target.value)} >
                                        <option value="">Select</option>
                                        {this.state.Countries.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                     <span className="text-danger">{this.state.errMsg.country}</span>
                                </div>
                              
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Search Address location </label>
                                    
                                    <PlacesAutocomplete
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        onSelect={this.handleSelect}
                                        searchOptions={{
                                            types: ['establishment'],
                                            componentRestrictions: {country: this.state.countrycode}
                                        }}
                                       
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className="position-relative">
                                            <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input form-control',
                                            })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                                );
                                            })}
                                            </div>
                                        </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                                
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">State<strong className="text-danger" >*</strong></label>
                                    <input
                                        disabled
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={this.state.stateName}
                                        // onChange={this.onChangehandler}
                                    />
                                  
                                     <span className="text-danger">{this.state.errMsg.state}</span>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword4">Zip</label>
                                    <input
                                        autoFocus={true}
                                        className="form-control"
                                        required=""
                                        type="number"
                                        min="0"
                                        name="zip"
                                        placeholder="Zip"
                                        value={this.state.userInfo.zip}
                                        onChange={this.onChangehandler}
                                    />
                                     <span className="text-danger">{this.state.errMsg.zip}</span>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="form-group col-12">
                                   <Map />
                                   </div>
                            </div> */}
                            <div className="row">
                                <div className="form-group col-6">
                                    <Button className="btn btn-success mr-1" onClick={(e) => this.props.data.handleActiveTab("1")} ><i className="mdi mdi-arrow-left me-1"></i>Back to information</Button>
                                    <Button className="btn btn-info" onClick={(e) => this.onSubmitHandler()}  >Go to Features <i className="mdi mdi-arrow-right ms-1"></i></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
