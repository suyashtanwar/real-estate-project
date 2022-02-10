import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Spinner, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import axios from "axios";
import { Redirect, Link } from 'react-router-dom'
import { APIURL } from '../../.././constants/common';
import Accordion from 'react-bootstrap/Accordion'
import Navbar from '.././Navbar';
import Sidebar from '.././Sidebar';
import { Carousel } from 'react-bootstrap'

export default class ViewPropertyDetails extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            p_id: "",
            PropertyInfo: [],
            Loader: true,
            rejectComment: "",
            CommetModal: false,
            initialMsg: "accept",
            accepted: "",
            verify: "verify/unverified",
            redirectBack: false,
            previewImages: false,
            baseImgIdx: 0,
            topImgIdx: 0,
            imageModal: false,
            Images: [
                { image: "https://realstateapi.imenso.in/uploads/property/53/16365278101.jpg" },
                { image: "https://realstateapi.imenso.in/uploads/property/53/16365278101.jpg" }
            ],
            Data: [
                {
                    image: "",
                    caption: `<div>
                                San Francisco
                                      <br/>
                                      Next line
                                    </div>`
                }
            ],

        }
    }

    componentDidMount() {
        // document.body.classList.add('sidebar-icon-only');
        this.ViewPropertyInfo(this.props.match.params.id)

    }

    ViewPropertyInfo = (e) => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('property_id', e);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "show-property-detail", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    Loader: false,
                    PropertyInfo: response.data.data,
                })
                let Images = [];

                this.state.PropertyInfo.map((item, idx) => {
                    item.property_media.map((result, index) => {
                        Images.push({
                            image: result.url_path,
                            caption: ""
                        });
                    });
                })
                this.setState({
                    Data: Images
                })
                console.log("dd", this.state.PropertyInfo)
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
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

    VerifyingRequest(e, status) {
        if (status === "unverify") {
            if (this.state.rejectComment) {
                this.onSubmit(e, status)
            }
            this.setState({
                errMsgCmt: "Please Write A comment"
            })
        }
    }

    onSubmit = (e, status) => {
        this.setState({ isLoading: true })
        var token = this.state.token
        const formData = new FormData();
        formData.append('property_id', e.id);
        formData.append('status', status);
        formData.append('comment', this.state.rejectComment);
        this.setState({ Loader: true, CommetModal: false });
        axios
            .post(APIURL + "agent/verify-property", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data.data)
                this.setState({
                    Loader: false,
                    VerifyStatus: response.data.data.status
                });
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            })
            .catch((error) => {
                this.setState({
                    Loader: false,
                    errMsg: error.response.data.error,
                })
            });
        // this.ViewPropertyInfo()
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
                if (status === "reject") {
                    this.setState({
                        redirectBack: true
                    })
                }
                setTimeout(() => {
                    window.location.reload();
                }, 100);
                this.ViewPropertyInfo()

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    CommetModal: false,
                    isLoading: false
                })
            });
        this.ViewPropertyInfo()
    };

    previewImages() {
        this.setState({
            previewImages: !this.state.previewImages
        })
    }
    previewImagesClose() {
        this.setState({
            previewImages: false
        })
    }

    Goback() {
        this.setState({
            redirectBack: true
        })
    }
    imageModal = () => {
        this.setState({
            imageModal: !this.state.imageModal
        })
    }
    view = (e) => {
        this.setState({
            topImgIdx: e,
        }, () => {
            this.imageModal()
        })
    }
    handleSelect = (selectedIndex, e) => {
        console.log(selectedIndex + " eee" + e)
        this.setState({
            baseImgIdx: selectedIndex,
        })
    };

    handleSelectTop = (selectedIndex, e) => {
        console.log(selectedIndex + " eee" + e)
        this.setState({
            topImgIdx: selectedIndex,
        })
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
        if (this.state.redirectBack) {
            return <Redirect to={"/agent/assigned/property/"} />;
        }
        const { PropertyInfo } = this.state
        console.log("details", this.props)
        return (
            <div className="resido-admin">
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}

                <div className="container-scroller">
                    <Navbar 
                     sideMenu={this.sideMenu.bind(this)}
                     activeSide={this.state.activeSide} 
                     />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                        data="activepage" 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}/>

                        <div className="main-panel resido-front">
                            {this.state.PropertyInfo.length > 0 ?
                                this.state.PropertyInfo.map((item, idx) => (
                                    <div className="content-wrapper">
                                        <div className="row">
                                            <div className="col-12 col-md-12 col-sm-12" id="accordionPanelsStayOpenExample">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <div className="property_block_wrap style-2 p-4">
                                                            <div className="prt-detail-title-desc justify-content-between d-flex">
                                                                <h3 className="mb-0">  <Link to="/admin/assign/property" className="text-success" color="success"><i className="fas fa-chevron-left fs-5 mr-2"></i>
                                                                </Link> {item.name}
                                                                </h3>
                                                                {/* <span className="prt-types sale">For Sale</span> */}

                                                            </div>
                                                        </div>

                                                        {
                                                            item.propertyAssignedStatus === "accept" ?
                                                                <div>
                                                                    <Accordion defaultActiveKey="0" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Property Information</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {item.property_detail.length > 0 ?
                                                                                    item.property_detail.map((sItem, idx) => (
                                                                                        <React.Fragment>
                                                                                            <ul className="deatil_features">
                                                                                                <li><strong>Number of Bedrooms:</strong>{sItem.number_of_bedrooms === "null" ? "NA" : sItem.number_of_bedrooms} </li>
                                                                                                <li><strong>Number of Bathrooms:</strong>{sItem.number_of_bathrooms === "null" ? "NA" : sItem.number_of_bathrooms} </li>
                                                                                                <li><strong>Total Square Footage:</strong>{sItem.total_square_footage === "null" ? "NA" : sItem.total_square_footage}</li>
                                                                                                <li><strong>Lot Size:</strong>{sItem.lot_size === "null" ? "NA" : sItem.total_square_footage}</li>
                                                                                                <li><strong>Flooring:</strong>{sItem.flooring === "0" ? "HardWood" : sItem.flooring === "1" ? "Carpet" : sItem.flooring === "2" ? "Ceramic" : sItem.flooring === "3" ? "Vinyl" : "Stone"}</li>
                                                                                                <li><strong>Fire Place:</strong>{sItem.fireplace === 0 ? "No" : "Yes"}</li>
                                                                                                <li><strong>Year build:</strong>{sItem.year_built === "null" ? "NA" : sItem.year_built}</li>
                                                                                            </ul>
                                                                                            <div className="p-2">
                                                                                                <strong>House Description</strong>
                                                                                                <p className="mt-2">  {sItem.house_description === "null" ? "NA" : sItem.house_description} </p>
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                    )) :
                                                                                    <span>No Records</span>
                                                                                }

                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    <Accordion defaultActiveKey="0" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Address</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {item.property_detail.length > 0 ?
                                                                                    item.property_detail.map((sItem, idx) => (
                                                                                        <ul className="deatil_features">
                                                                                            <li><strong>Street Number:</strong>{sItem.street_number === "null" ? "NA" : sItem.street_number} </li>
                                                                                            <li><strong>Street Name:</strong>{sItem.street_name === "null" ? "NA" : sItem.street_name} </li>
                                                                                            <li><strong>Apartment Number:</strong>{sItem.apt_number === "null" ? "NA" : sItem.apt_number}</li>
                                                                                            <li><strong>Country:</strong>{sItem.country_name ? sItem.country_name : "NA"}</li>
                                                                                            <li><strong>State:</strong> {sItem.state_name ? sItem.state_name : "NA"}</li>
                                                                                            <li><strong>City:</strong>{sItem.city === "null" ? "NA" : sItem.city}</li>
                                                                                            <li><strong>Zip:</strong>{sItem.zip === "null" ? "NA" : sItem.zip}</li>
                                                                                            {/* <li><strong>Year build:</strong>{sItem.year_built ? sItem.year_built : "NA" }</li> */}
                                                                                        </ul>
                                                                                    )) :
                                                                                    <span>No Records</span>
                                                                                }
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>

                                                                    <Accordion defaultActiveKey="1" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Features</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {item.property_detail.length > 0 ?
                                                                                    item.property_detail.map((sItem, idx) => (
                                                                                        <ul className="deatil_features">
                                                                                            <li><strong>Listing Price:</strong>{sItem.listing_price ? sItem.listing_price : "NA"} </li>
                                                                                            <li><strong>HOA Free:</strong>{sItem.hoa_free ? sItem.hoa_free : "NA"} </li>
                                                                                            <li><strong>Feature Type:</strong> {sItem.feature_type === "0" ? "Condo" : sItem.feature_type === "1" ? "Apartment" : sItem.feature_type === "2" ? "Single Family" : sItem.feature_type === "3" ? "Townhouse" : "NA"} </li>
                                                                                            <li><strong>Bedrooms:</strong>{sItem.total_bedrooms ? sItem.total_bedrooms : "NA"} </li>
                                                                                            <li><strong>Bathrooms :</strong> {sItem.total_bathrooms ? sItem.total_bathrooms : "NA"} </li>
                                                                                            <li><strong>Full Bath:</strong>{sItem.full_bath ? sItem.full_bath : "NA"}</li>
                                                                                            <li><strong>Half Bath:</strong>{sItem.half_bath ? sItem.half_bath : "NA"}</li>
                                                                                            <li><strong>Cooling:</strong>{sItem.cooling === "0" ? "No" : "Yes"}</li>
                                                                                            <li><strong>Heating :</strong> {sItem.heating === "0" ? "Electic" : sItem.heating === "1" ? "Natural Gas" : sItem.heating === "2" ? "Propane" : "NA"}</li>
                                                                                            <li><strong>Parking Space:</strong>{sItem.parking_space === "0" ? "No" : "Yes"}</li>
                                                                                            <li><strong>Swimming Pool:</strong>{sItem.swimming_pool === 0 ? "No" : "Yes"}</li>
                                                                                            <li><strong>Walkout:</strong>{sItem.walkout === "0" ? "No" : "Yes"}</li>
                                                                                            <li><strong>Finished:</strong>{sItem.finished === "0" ? "No" : "Yes"}</li>
                                                                                            <li><strong>Stories Of The House:</strong>{sItem.stories_of_the_house ? sItem.stories_of_the_house : "NA"}</li>
                                                                                        </ul>
                                                                                    )) :
                                                                                    <span>No Records</span>
                                                                                }
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    <Accordion defaultActiveKey="1" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Gallery</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="mb-3">
                                                                                    <label className="card-title border-bottom w-100 pb-3">Property Images</label>
                                                                                </div>
                                                                                <div className="form-group multi-preview">
                                                                                    <div className="card">
                                                                                        {this.state.scsMsg}
                                                                                        <div className="list-group list-group-flush">
                                                                                            <div className="row">
                                                                                                {item.property_media &&
                                                                                                    item.property_media.filter(data => data.type === "image").map((file, index) => (
                                                                                                        <div className="col-sm-3">
                                                                                                            <div className="img-gallery ">
                                                                                                                <img className="w-100 " onClick={() => this.view(index)} src={file.url_path} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {item.property_media &&
                                                                                    item.property_media.filter(data => data.type === "video").map((file, index) => (
                                                                                        <div className="my-3">
                                                                                            <label className="pb-3 card-title border-bottom w-100">Property Video</label>
                                                                                        </div>
                                                                                    ))}
                                                                                <div className="form-group multi-preview">
                                                                                    <div className="card">
                                                                                        {this.state.scsMsg}
                                                                                        <div className="list-group list-group-flush">
                                                                                            <div className="col-sm-11 m-auto">
                                                                                                {item.property_media &&
                                                                                                    item.property_media.filter(data => data.type === "video").map((file, index) => (
                                                                                                        <div>
                                                                                                            <div className="">
                                                                                                                <video width="100%" height="400" controls >
                                                                                                                    <source src={file.url_path} type="video/mp4" />
                                                                                                                </video>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {item.property_media &&
                                                                                    item.property_media.filter(data => data.type === "3d_video").map((file, index) => (
                                                                                        <div className="my-3">
                                                                                            <label className="pb-3 card-title border-bottom w-100">Property Video 3D View</label>
                                                                                        </div>
                                                                                    ))}
                                                                                <div className="form-group multi-preview">
                                                                                    <div className="card">
                                                                                        {this.state.scsMsg}
                                                                                        <div className="list-group list-group-flush">
                                                                                            <div className="col-sm-11 m-auto">
                                                                                                {item.property_media &&
                                                                                                    item.property_media.filter(data => data.type === "3d_video").map((file, index) => (
                                                                                                        <div>
                                                                                                            <div className="">
                                                                                                                <iframe width='600' height='300' src={file.file_path} frameborder='0' allowfullscreen="true" allow='xr-spatial-tracking'></iframe>
                                                                                                            </div>

                                                                                                        </div>

                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <Accordion defaultActiveKey="0" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Property Information</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {item.property_detail.length > 0 ?
                                                                                    item.property_detail.map((sItem, idx) => (
                                                                                        <div>
                                                                                            <ul className="deatil_features">
                                                                                                <li><strong>Property Name</strong>{item.name} </li>
                                                                                                <li><strong>Date of Posting</strong>{item.created_at.split('T')[0]} </li>
                                                                                                <li><strong>City:</strong>{sItem.city}</li>
                                                                                                <li><strong>State:</strong> {sItem.state_name}</li>
                                                                                                <li><strong>Country:</strong>{sItem.country_name}</li>
                                                                                            </ul>
                                                                                            <div className="p-2">
                                                                                                <strong>House Description</strong>
                                                                                                <p className="mt-2"> {sItem.house_description === "null" ? "NA" : sItem.house_description} </p>
                                                                                            </div>

                                                                                            <div className="mb-3 ml-3">
                                                                                                <label className="card-title border-bottom w-100 pb-3">Property Images</label>
                                                                                            </div>
                                                                                            <div className="form-group multi-preview">
                                                                                                <div className="card">
                                                                                                    {this.state.scsMsg}
                                                                                                    <div className="list-group list-group-flush">
                                                                                                        <div className="row">
                                                                                                            {item.property_media &&
                                                                                                                item.property_media.filter(data => data.type === "image").map((file, index) => (
                                                                                                                    <div className="col-sm-3">
                                                                                                                        <div className="img-gallery">
                                                                                                                            <img className="w-100 " onClick={() => this.view(index)} src={file.url_path} />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            {item.property_media &&
                                                                                                item.property_media.filter(person => person.type === "video").map((file, index) => (
                                                                                                    <div className="mb-2">
                                                                                                        <label className="pb-3 card-title border-bottom w-100">Property Video</label>
                                                                                                    </div>
                                                                                                ))}
                                                                                            <div className="form-group multi-preview">
                                                                                                <div className="card">
                                                                                                    {this.state.scsMsg}
                                                                                                    <div className="list-group list-group-flush">
                                                                                                        <div className="col-sm-11 m-auto">
                                                                                                            {item.property_media &&
                                                                                                                item.property_media.filter(data => data.type === "video").map((file, index) => (
                                                                                                                    <div className="">
                                                                                                                        <video width="100%" height="400" controls >
                                                                                                                            <source src={file.url_path} type="video/mp4" />
                                                                                                                        </video>
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )) :
                                                                                    <span>No Records</span>
                                                                                }
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <Modal className="resido-admin" size="lg" isOpen={this.state.imageModal} toggle={() => this.imageModal()} autoFocus={false}>
                                                <button onClick={() => this.imageModal()} className="close close-carousel">x</button>
                                                <ModalBody>
                                                    <Carousel interval="300000" activeIndex={this.state.topImgIdx} onSelect={this.handleSelectTop}>
                                                        {item.property_media.length > 0 ? item.property_media.map((sItem, idx) => (
                                                            <Carousel.Item onClick={() => this.view(idx)} style={{ backgroundImage: `url(${sItem.type === "image" ? sItem.url_path : ""})` }}>

                                                            </Carousel.Item>
                                                        )) :
                                                            <tr>
                                                                <td colSpan="3" className="text-center">
                                                                    No Property Available
                                                                </td>
                                                            </tr>
                                                        }
                                                    </Carousel>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                    </div>
                                )) :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
