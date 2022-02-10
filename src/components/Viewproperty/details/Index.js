import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Calculate from './Calculate'
import ContactCard from './ContactCard'
import Header from '../Header'
import FeaturedProperty from './FeaturedProperty'
import axios from 'axios';
import { APIURL } from '../../constants/common';
import SimpleImageSlider from "react-simple-image-slider"
import { Modal, ModalBody, ModalHeader, ModalFooter, Input, Spinner, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { Carousel } from 'react-carousel-minimal';
import { Redirect } from 'react-router-dom'
import bed from '../../../assets/img/bed.svg'
import bath from '../../../assets/img/bathtub.svg'
import move from '../../../assets/img/move.svg'
import Slider from "react-slick";
import dateFormat, { masks } from "dateformat";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import NumberFormat from 'react-number-format';
// import createHistory from "history/createBrowserHistory"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// export const history = createHistory()

const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
}
const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
}
export default class Index extends Component {
    constructor() {
        super();

        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            redirectPermission: false,
            redirect: false,
            userInfo: {
                name: "",
                email: "",
                message: "",
            },
            phone: "",
            meet_hour: "",
            meet_minute: "",
            selectedDate: "",
            dates: [],
            check: false,
            PropertyInfo: [],
            previewImages: false,
            ImagesList: [],
            property_id: "",
            activeclassName: false,
            errMsg: {},
            scsMsg: "",
            taketour: false,
            isReadMore: true,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.n a home.",
            Data: [
                {
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
                    caption: `<div> San Francisco  <br/>   Next line   </div>`
                }
            ],
            Loader: false
        }
        this.handlephone = this.handlephone.bind(this)
    }

    readMore = () => {
        this.setState({
            isReadMore: !this.state.isReadMore
        })
    }

    onChangehandler = (e, key) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({ userInfo });
        console.log(userInfo)
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
    ViewpropertyDetails() {
        var token = this.state.token
        if (this.props.data.PropertyId) {
            const formData = new FormData();
            formData.append('property_id', this.props.data.PropertyId);
            // this.setState({ Loader: true });
            axios
                .post(APIURL + "view-property-detail", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    this.setState({
                        PropertyInfo: response.data.data,
                    })
                    let Images = [];
                    this.state.PropertyInfo.map((item, idx) => {
                        item.property_media.map((result, index) => {
                            Images.push({
                                image: result.url_path,
                                caption: ``,
                            });
                            this.setState({
                                Data: Images,
                                Images: Images
                            })
                        });
                    })
                })
                .catch((error) => {

                });
        }
    }
    randomDate() {
        var myCurrentDate = new Date();
        var myFutureDate = new Date(myCurrentDate);
        myFutureDate.setDate(myFutureDate.getDate() + 15);

        const d1 = myCurrentDate,
            d2 = myFutureDate,
            diff = (d2 - d1) / 864e5,
            dateFormat = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', },
            dates = Array.from(
                { length: diff + 1 },
                (_, i) => {
                    const date = new Date()
                    date.setDate(d1.getDate() + i)
                    const [weekdayStr, dateStr] = date.toUTCString('en-US', dateFormat).split(', ')
                    console.log(dateStr)
                    return ` ${weekdayStr} ${dateStr}`
                }
            )

        this.setState({
            dates: dates,
        })

    }
    handle_hrs(e) {
        const re = /^[0-9\b]+$/;
        if (e === '' || re.test(e) && e < 24) {
            this.setState({
                meet_hour: e
            })
        }
    }
    handle_min(e) {
        const re = /^[0-9\b]+$/;
        if (e === '' || re.test(e) && e < 60) {
            this.setState({
                meet_minute: e
            })
        }
    }
    handlephone(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ phone: e.target.value })
        }
    }
    handlecheck = () => {
        this.setState({
            check: !this.state.check
        }, () => {
            console.log(this.state.check)
        })
    }
    SubmitEnquiry = (enquiry_type) => {
        // this.setState({ Loader: true })
        var token = this.state.token
        const time = this.state.meet_hour ? this.state.meet_hour + ":" + this.state.meet_minute : ""
        const formData = new FormData();
        formData.append('property_id', this.props.data.PropertyId);
        formData.append('enquiry_type', enquiry_type);
        formData.append('name', this.state.user.name);
        formData.append('contact', this.state.user.phone ? this.state.user.phone : this.state.phone);
        formData.append('email', this.state.user.email);
        formData.append('message', this.state.userInfo.message);
        formData.append('condition_check', Number(this.state.check));
        formData.append('date_of_enquiry', this.state.selectedDate);
        formData.append('time_of_enquiry', time);
        axios
            .post(APIURL + "buyer/enquiry-contact-agent", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {

                this.setState({
                    scsMsg: response.data.message,
                }, () => {
                    this.setState({
                        Loader: false,
                        taketour: false,
                        ContactAgentModal: false,
                        scsMsg: "",
                        check: false,
                        phone: "",
                        meet_hour: "",
                        meet_minute: "",
                        selectedDate: "",
                        userInfo: {
                            name: "",
                            email: "",
                            message: "",
                        },
                    })
                    this.UpdateSuccessfully(this.state.scsMsg)
                    this.ViewpropertyDetails();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            Loader: false
                        })
                    }, 1000);
                })
            });
    };
    selectdate = (item, idx) => {
        console.log(item)
        this.setState({
            selectedDate: dateFormat(item, 'yyyy-mm-dd'),
            activeIdx: idx
        })
    }
    usercheck = () => {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }

        if (this.state.user.user_type !== "Buyer") {
            this.setState({
                redirectPermission: true
            })
        }
    }
    ContactAgentModal() {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }
        this.setState({
            ContactAgentModal: !this.state.ContactAgentModal,
        })
    }
    ContactAgentClose() {
        this.setState({
            ContactAgentModal: false,
            check: false
        })
    }
    taketour() {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }
        this.setState({
            taketour: !this.state.taketour,
        })
    }
    taketourClose() {
        this.setState({
            taketour: false,
            check: false
        })
    }
    addToWishlist = (property_id) => {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('property_id', property_id);
        axios
            .post(APIURL + "buyer/property-wishlist-add", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
        this.ViewpropertyDetails()
    };
    removeToWishlist = (wishlist_id) => {
        if (!this.state.user) {
            this.setState({
                redirect: true
            })
            return false
        }
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('wishlist_id', wishlist_id);
        axios
            .post(APIURL + "buyer/property-wishlist-remove", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.ViewpropertyDetails()
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
        this.ViewpropertyDetails()
    };

    UpdateSuccessfully = (e) => toast.success(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored"
    })
    componentDidMount() {
        this.ViewpropertyDetails()
        this.randomDate()
        window.scrollTo(0, 0);
    }
    testing = () => {
        console.log("kkk")
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/signin" />;
        }
        var settings = {
            dots: true,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div>
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                <section className="gray-simple">
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
                    <div className="container">
                        {this.state.PropertyInfo.length > 0 ?
                            this.state.PropertyInfo.map((item, idx) => (
                                <div className="row">
                                    {item.property_detail.length > 0 &&
                                        item.property_detail.map((sItem, idx) => (
                                            <div className="col-lg-8 col-md-12 col-sm-12">
                                                <Header PropertyId={this.state.property_id ? this.state.property_id : this.props.data.PropertyId} />
                                                <div className="property_block_wrap style-2 p-4 mt-4">
                                                    <div className="prt-detail-title-desc">
                                                        {/* <span className="prt-types sale">For Sale</span> */}
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <h3>{item.name}</h3>
                                                                <span><i className="lni-map-marker"></i> {sItem.apt_number}, {sItem.street_name}, {sItem.city} </span>
                                                            </div>
                                                            <h3 className="prt-price-fix">
                                                                <NumberFormat
                                                                    value={sItem.listing_price}
                                                                    className="foo"
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    prefix={'$'}
                                                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                                                />
                                                            </h3>
                                                        </div>
                                                        <div className="list-fx-features">
                                                            <div className="listing-card-info-icon">
                                                                <div className="inc-fleat-icon"><img src={bed} width="13" alt="" /></div>{sItem.number_of_bedrooms} Beds
                                                            </div>
                                                            <div className="listing-card-info-icon">
                                                                <div className="inc-fleat-icon"><img src={bath} width="13" alt="" /></div>{sItem.number_of_bathrooms} Bath
                                                            </div>
                                                            <div className="listing-card-info-icon">
                                                                <div className="inc-fleat-icon"><img src={move} width="13" alt="" /></div>{sItem.lot_size} sqft
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Accordion defaultActiveKey="0" flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Property Information</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul className="deatil_features">
                                                                <li><strong>Number of Bedrooms:</strong>{sItem.number_of_bedrooms === null ? "NA" : sItem.number_of_bedrooms} </li>
                                                                <li><strong>Number of Bathrooms:</strong>{sItem.number_of_bathrooms === null ? "NA" : sItem.number_of_bathrooms} </li>
                                                                <li><strong>Total Square Footage:</strong>{sItem.total_square_footage === null ? "NA" : sItem.total_square_footage}</li>
                                                                <li><strong>Lot Size:</strong>{sItem.lot_size === null ? "NA" : sItem.total_square_footage}</li>
                                                                <li><strong>Flooring:</strong>{sItem.flooring === "0" ? "HardWood" : sItem.flooring === "1" ? "Carpet" : sItem.flooring === "2" ? "Ceramic" : sItem.flooring === "3" ? "Vinyl" : "Stone"}</li>
                                                                <li><strong>Fire Place:</strong>{sItem.fireplace === 0 ? "No" : "Yes"}</li>
                                                                <li><strong>Year build:</strong>{sItem.year_built === null ? "NA" : sItem.year_built}</li>
                                                            </ul>
                                                            <div className="p-2">
                                                                <strong>House Description</strong>
                                                                <p className="mt-2"> {sItem.house_description === null ? "NA" : sItem.house_description} </p>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion defaultActiveKey="0" flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Address</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul className="deatil_features">
                                                                <li><strong>Street Number:</strong>{sItem.street_number === null ? "NA" : sItem.street_number} </li>
                                                                <li><strong>Street Name:</strong>{sItem.street_name === null ? "NA" : sItem.street_name} </li>
                                                                <li><strong>Apartment Number:</strong>{sItem.apt_number === null ? "NA" : sItem.apt_number}</li>
                                                                <li><strong>Country:</strong>{sItem.country_name ? sItem.country_name : "NA"}</li>
                                                                <li><strong>State:</strong> {sItem.state_name ? sItem.state_name : "NA"}</li>
                                                                <li><strong>City:</strong>{sItem.city === null ? "NA" : sItem.city}</li>
                                                                <li><strong>Zip:</strong>{sItem.zip === null ? "NA" : sItem.zip}</li>
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion defaultActiveKey="1" flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Features</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul className="deatil_features">
                                                                <li className='d-flex'><strong>Listing Price:</strong>{sItem.listing_price ?
                                                                    <NumberFormat
                                                                        value={sItem.listing_price}
                                                                        className="foo"
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        prefix={'$ '}
                                                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                                                    />
                                                                    : "NA"} </li>
                                                                <li><strong>HOA Free:</strong>{sItem.hoa_free ? sItem.hoa_free : "NA"} </li>
                                                                <li><strong>Feature Type:</strong>{sItem.feature_type === "0" ? "Condo" : sItem.feature_type === "1" ? "Apartment" : sItem.feature_type === "2" ? "Single Family" : sItem.feature_type === "3" ? "Townhouse" : "NA"}</li>
                                                                <li><strong>Bedrooms:</strong>{sItem.total_bedrooms ? sItem.total_bedrooms : "NA"} </li>
                                                                <li><strong>Bathrooms :</strong> {sItem.total_bathrooms ? sItem.total_bathrooms : "NA"} </li>
                                                                <li><strong>Full Bath:</strong>{sItem.full_bath ? sItem.full_bath : "NA"}</li>
                                                                <li><strong>Half Bath:</strong>{sItem.half_bath ? sItem.half_bath : "NA"}</li>
                                                                <li> <strong>Cooling:</strong>{sItem.cooling === "0" ? "No" : "Yes"}</li>
                                                                <li><strong>Heating :</strong> {sItem.heating === "0" ? "Electic" : sItem.heating === "1" ? "Natural Gas" : sItem.heating === "2" ? "Propane" : "NA"}</li>
                                                                <li><strong>Parking Space:</strong>{sItem.parking_space ? sItem.parking_space : "NA"}</li>
                                                                <li><strong>Swimming Pool:</strong>{sItem.swimming_pool === "0" ? "No" : "Yes"}</li>
                                                                <li><strong>Walkout:</strong>{sItem.walkout === "0" ? "No" : "Yes"}</li>
                                                                <li><strong>Finished:</strong>{sItem.finished === "0" ? "No" : "Yes"}</li>
                                                                <li><strong>Stories Of The House:</strong>{sItem.stories_of_the_house ? sItem.stories_of_the_house : "NA"}</li>
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                {item.property_media &&
                                                    item.property_media.map((file, index) => (
                                                        <div className='justify-content-center d-flex'>
                                                            {
                                                                file.type === "video" ?
                                                                    <Accordion defaultActiveKey="1" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Property Video</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="form-group multi-preview">
                                                                                    <div className="card">
                                                                                        <div className="list-group list-group-flush">
                                                                                            <div className="row">
                                                                                                {item.property_media &&
                                                                                                    item.property_media.map((file, index) => (
                                                                                                        <div className="col-sm-11 m-auto">
                                                                                                            {/* <img className="pro_img img-fluid w-100" src="https://via.placeholder.com/1200x800" alt="7.jpg" /> */}
                                                                                                            {
                                                                                                                file.type === "video" ?
                                                                                                                    // <div className="img-gallery" style={{ width: "200px", height: "200px" }}>
                                                                                                                    <div className="img-gallery">
                                                                                                                        <video width="100%" height="100%" controls >
                                                                                                                            <source src={file.url_path} type="video/mp4" />
                                                                                                                        </video>
                                                                                                                    </div>
                                                                                                                    :
                                                                                                                    ""
                                                                                                            }
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    :
                                                                    ""
                                                            }
                                                        </div>
                                                    ))}
                                                {item.property_media &&
                                                    item.property_media.map((file, index) => (
                                                        <div className='justify-content-center d-flex'>
                                                            {
                                                                file.type === "3d_video" ?
                                                                    <Accordion defaultActiveKey="1" flush>
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header>Property Video 3D View</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="form-group multi-preview">
                                                                                    <div className="card">
                                                                                        <div className="list-group list-group-flush">
                                                                                            <div className="row">
                                                                                                {item.property_media &&
                                                                                                    item.property_media.map((file, index) => (
                                                                                                        <div className='col-sm-11 m-auto'>
                                                                                                            {
                                                                                                                file.type === "3d_video" ?
                                                                                                                    <div className="img-gallery" >
                                                                                                                        <iframe  width='600' height='300' src={file.file_path} frameborder='0' allowfullscreen="true" allow='xr-spatial-tracking'></iframe>
                                                                                                                    </div>
                                                                                                                    :
                                                                                                                    ""
                                                                                                            }
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>
                                                                    :
                                                                    ""
                                                            }
                                                        </div>
                                                    ))}
                                            </div>
                                        ))}
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <div className="like_share_wrap b-0">
                                            <ul className="like_share_list">
                                                <li><a href="JavaScript:Void(0);" className="btn btn-likes" data-toggle="tooltip" data-original-title="Share"><i className="fas fa-share"></i>Share</a></li>
                                                <li>
                                                    {
                                                        item.wishlist ?
                                                            <Button onClick={() => this.addToWishlist(item, idx, false)} href="JavaScript:Void(0);" className="btn btn-likes" data-toggle="tooltip" data-original-title="Save"><i className="far fa-heart"></i>Wishlist</Button>
                                                            :
                                                            <Button onClick={() => this.addToWishlist(item, idx, true)} href="JavaScript:Void(0);" className="btn btn-likes" data-toggle="tooltip" data-original-title="Save"><i className="far fa-heart"></i>Wishlist</Button>
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                        {(this.state.user && this.state.user.user_type || this.state.user_type === "Buyer") ?
                                            <div className="like_share_wrap b-0">
                                                <div className="justify-content-between d-flex">
                                                    <button onClick={() => this.ContactAgentModal()} className="px-0 btn btn-outline-theme w-100 mr-1 rounded-0">Contact Agent</button>
                                                    <button onClick={() => this.taketour()} className="px-0 btn btn-theme mb-0 me-0 w-100 ms-1 rounded-0" data-bs-toggle="modal"

                                                    >Take A Tour</button>
                                                </div>
                                            </div> : ""

                                        }

                                        <div className="details-sidebar">
                                            <FeaturedProperty PropertyId={this.props.data.PropertyId} />
                                        </div>
                                    </div>
                                </div>
                            )) :
                            ""
                        }
                    </div>
                </section>
                <Modal size="xl" isOpen={this.state.previewImages} toggle={() => this.previewImagesClose()}>
                    <ModalHeader className="header-less ml-3" toggle={() => this.previewImagesClose()}>
                    </ModalHeader>
                    <ModalBody className="border-0">
                        <Carousel
                            data={this.state.Data}
                            time={1000}
                            width="850px"
                            height="400px"
                            captionStyle={captionStyle}
                            radius="10px"
                            slideNumber={true}
                            slideNumberStyle={slideNumberStyle}
                            captionPosition="bottom"
                            automatic={true}
                            dots={true}
                            pauseIconColor="white"
                            pauseIconSize="40px"
                            slideBackgroundColor="darkgrey"
                            slideImageFit="cover"
                            thumbnails={true}
                            thumbnailWidth="100px"
                            style={{
                                textAlign: "center",
                                maxWidth: "850px",
                                maxHeight: "500px",
                                margin: "40px auto",
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex justify-content-end w-100">
                            <Button className="btn btn-danger " onClick={() => this.previewImagesClose()}> <i className="fas fa-window-close mr-1"></i>Cancel </Button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal className="resido-admin" size="md" isOpen={this.state.ContactAgentModal} toggle={() => this.ContactAgentClose()}>
                    <ModalHeader className="header-less" toggle={() => this.ContactAgentClose()}> Contact Agent</ModalHeader>
                    <ModalBody className="border-0 bg-white">
                        {/* {
                           this.state.scsMsg ? 
                           <div className="alert alert-success" role="alert">
                           {this.state.scsMsg}
                       </div>:""
                       } */}
                        <div className="form-submit">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    className="form-control"
                                    required=""
                                    type="text"
                                    name="name"
                                    disabled
                                    placeholder="Enter Full Name"
                                    value={this.state.user ? this.state.user.name : ""}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.name}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    className="form-control"
                                    name="phone"
                                    disabled={this.state.user ? this.state.user.phone ? true : false : false}
                                    placeholder="Phone Number"
                                    value={this.state.user ? this.state.user.phone : this.state.phone}
                                    onChange={this.handlephone}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.contact}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    className="form-control"
                                    required=""
                                    type="email"
                                    name="email"
                                    disabled
                                    placeholder="Email Address"
                                    value={this.state.user ? this.state.user.email : ""}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.email}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    className="form-control"
                                    required=""
                                    type="textarea"
                                    rows="5"
                                    name="message"
                                    placeholder="Description"
                                    value={this.state.userInfo.message}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.message}</span> : ""}

                            </div>

                            <div className="form-group">
                                <input
                                    value={this.state.check}
                                    id="a-2"
                                    className="checkbox-custom"
                                    name="a-2"
                                    type="checkbox"
                                    onClick={() => this.handlecheck()}
                                />
                                <label htmlFor="a-2" className="checkbox-custom-label mt-1 ml-2">By clicking you agree to the <span className='text-info'>terms and conditions</span></label>
                            </div>
                            <p className="small">
                                {this.state.isReadMore ? this.state.text.slice(0, 130) : this.state.text}
                                <span onClick={this.readMore} className="read-or-hide text-info " style={{ cursor: "pointer" }}>
                                    {this.state.isReadMore ? "...read more" : " show less"}
                                </span> </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex justify-content-between w-100">
                            <Button disabled={this.state.check ? false : true} color="success" onClick={() => this.SubmitEnquiry('contact_agent')} >Send Enquiry</Button>
                            <Button color="danger" onClick={() => this.ContactAgentClose()}   >Cancel</Button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal className="resido-admin" size="md" isOpen={this.state.taketour} toggle={() => this.taketourClose()}>
                    <ModalHeader className="header-less" toggle={() => this.taketourClose()}> Take A Tour</ModalHeader>
                    <ModalBody className="border-0 bg-white">
                        <div className="form-submit take-tour">
                            <div className="form-group">
                                <h6> Enquiry Date</h6>
                                <div>
                                    <Slider {...settings}>
                                        {this.state.dates.map((item, idx) => (
                                            <div className=" tour-date-options d-flex flex-wrap justify-content-center text-center">
                                                <button onClick={() => this.selectdate(item, idx)} className={this.state.activeIdx === idx ? " date-time-form-date-button d-flex flex-column border-dark bg-white py-2 px-3 m-1 align-items-center" : "date-time-form-date-button d-flex flex-column border bg-white py-2 px-3 m-1 align-items-center"}  >
                                                    <p className="mb-0"><strong>{item.split(' ')[1]}</strong></p>
                                                    <p className="mb-0">{item.split(' ')[2]} {item.split(' ')[3]}</p>
                                                </button>
                                            </div>
                                        ))}
                                    </Slider>
                                    {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.date_of_enquiry}</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <h6>Enquiry Time (Format: 24 Hours)</h6>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <input
                                            value={this.state.meet_hour}
                                            className="form-control"
                                            type="number"
                                            placeholder="Hour"
                                            onChange={(e) => this.handle_hrs(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <input
                                            value={this.state.meet_minute}
                                            className="form-control"
                                            type="number"
                                            placeholder="Minute"
                                            onChange={(e) => this.handle_min(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.time_of_enquiry}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    className="form-control"
                                    required=""
                                    type="text"
                                    name="name"
                                    disabled
                                    placeholder="Enter Full Name"
                                    value={this.state.user ? this.state.user.name : ""}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.name}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    className="form-control"
                                    name="phone"
                                    disabled={this.state.user ? this.state.user.phone ? true : false : false}
                                    placeholder="Phone Number"
                                    value={this.state.user ? this.state.user.phone : this.state.phone}
                                    onChange={this.handlephone}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.contact}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    className="form-control"
                                    required=""
                                    type="email"
                                    name="email"
                                    disabled
                                    placeholder="Email Address"
                                    value={this.state.user ? this.state.user.email : ""}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.email}</span> : ""}

                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    className="form-control"
                                    required=""
                                    type="textarea"
                                    rows="5"
                                    name="message"
                                    placeholder="Description"
                                    value={this.state.userInfo.message}
                                    onChange={this.onChangehandler}
                                />
                                {this.state.errMsg ? <span className="text-danger">{this.state.errMsg.message}</span> : ""}

                            </div>

                            <div className="form-group">
                                <input
                                    value={this.state.check}
                                    id="a-2"
                                    className="checkbox-custom "
                                    name="a-2"
                                    type="checkbox"
                                    onClick={() => this.handlecheck()}
                                />
                                <label htmlFor="a-2" className="checkbox-custom-label mt-1 ml-2">By clicking you agree to the <span className='text-info'>terms and conditions</span></label>
                            </div>
                            <p className="small">
                                {this.state.isReadMore ? this.state.text.slice(0, 130) : this.state.text}
                                <span onClick={this.readMore} className="read-or-hide text-info " style={{ cursor: "pointer" }}>
                                    {this.state.isReadMore ? "...read more" : " show less"}
                                </span>
                            </p>
                        </div>

                    </ModalBody>
                    {/* {
                        this.state.scsMsg ?
                            <span className="text-success ml-3" >
                                {this.state.scsMsg}
                            </span> : ""
                    } */}
                    <ModalFooter>
                        <div className="d-flex justify-content-between w-100">
                            <Button disabled={this.state.check ? false : true} color="success" onClick={() => this.SubmitEnquiry('take_a_tour')} >Send Enquiry</Button>
                            <Button color="danger" onClick={() => this.taketourClose()}  >Cancel</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}