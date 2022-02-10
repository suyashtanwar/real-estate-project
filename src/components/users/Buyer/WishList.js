import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'
import axios from "axios";
import { APIURL } from '../../../components/constants/common';
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import NumberFormat from 'react-number-format';
import bad from '../../../assets/img/bed.svg'
import bath from '../../../assets/img/bathtub.svg'
import move from '../../../assets/img/move.svg'
import Pagination from "react-js-pagination";
import { Spinner } from "reactstrap"

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            WishList: [],
            Loader: true
        }
    }
    getWishListData() {
        if (this.state.user) {
            const formData = new FormData();
            formData.append('id', this.state.user.id)
            var token = this.state.token
            var app_url = APIURL + "buyer/get-property-wishlist"
            axios
                .post(app_url, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    this.setState({
                        WishList: response.data.data
                    })
                })
                .catch((error) => {

                });
        }
    }

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
        formData.append('property_id', wishlist_id);
        axios
            .post(APIURL + "buyer/property-wishlist-remove", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.getWishListData()
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
        this.getWishListData()
    };
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
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({
                Loader: false
            })
        }, 500);
        this.getWishListData()
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
                            <Navbar activePage="wishlist" />
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
                                            activePage="wishlist"
                                            toggleFunChild={this.toggleFunChild.bind(this)}
                                            toggle={this.state.toggle}
                                             />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <div className="dashboard-wraper">
                                                {/* <!-- Bookmark Property --> */}
                                                <div className="form-submit mb-4">
                                                    <h4>Wishlist</h4>
                                                </div>
                                                {this.state.WishList.length > 0 ? this.state.WishList.map((item, idx) => (
                                                    <div className="row list-layout">
                                                        {/* {this.state.PropertyList.length > 0 ? this.state.PropertyList.slice(0, this.state.limit).map((item, idx) => ( */}
                                                        <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                                                            {item.property.property_detail.length > 0 && item.property.property_detail.map((sItem, idx) => (
                                                                <div className="property-listing property-1">
                                                                    <div className="listing-img-wrapper">
                                                                        {item.property.property_media.length > 0 && item.property.property_media.slice(0, 1).map((Img, idx) => (
                                                                            <Link to={"/viewproperty/details/" + sItem.id}>
                                                                                <img src={Img.url_path} className="img-fluid mx-auto" alt="" />
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                    {/* {item.property_detail.length > 0 && item.property_detail.map((sItem, idx) => ( */}
                                                                    <div className="listing-content">
                                                                        <div>
                                                                            <Link to={"/viewproperty/details/" + sItem.id}>
                                                                                <div className="listing-detail-wrapper-box">
                                                                                    <div className="listing-detail-wrapper">
                                                                                        <div className="listing-short-detail">
                                                                                            <h4 className="listing-name ms-1">
                                                                                                {item.property.name}
                                                                                            </h4>
                                                                                            <div className="listing-locate">
                                                                                                <span className="listing-location"><i className="ti-location-pin"></i>{sItem.street_number}, {sItem.street_name}, {sItem.city === "null" ? "NA" : sItem.city}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                            <Link to={"/viewproperty/details/" + sItem.id}>
                                                                                <div className="price-features-wrapper">
                                                                                    <div className="list-fx-features">
                                                                                        <div className="listing-card-info-icon">
                                                                                            <div className="inc-fleat-icon"><img src={bad} width="13" alt="" /></div> {sItem.number_of_bedrooms} Beds
                                                                                        </div>
                                                                                        <div className="listing-card-info-icon">
                                                                                            <div className="inc-fleat-icon"><img src={bath} width="13" alt="" /></div> {sItem.number_of_bathrooms} Bath
                                                                                        </div>
                                                                                        <div className="listing-card-info-icon">
                                                                                            <div className="inc-fleat-icon"><img src={move} width="13" alt="" /></div> {sItem.lot_size} sqft
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>

                                                                            <div className="listing-footer-wrapper justify-content-between">
                                                                                <Link to={"/viewproperty/details/" + sItem.id}>

                                                                                    <div className="list-price">
                                                                                        <h6 className="listing-card-info-price">
                                                                                            <NumberFormat
                                                                                                value={sItem.listing_price}
                                                                                                className="foo"
                                                                                                displayType={'text'}
                                                                                                thousandSeparator={true}
                                                                                                prefix={'$'}
                                                                                                renderText={(value, props) => <div {...props}>{value}</div>}
                                                                                            />
                                                                                        </h6>
                                                                                    </div>
                                                                                </Link>
                                                                                <div className="listing-detail-btn">
                                                                                    <Button size='sm' color='theme' onClick={() => this.removeToWishlist(item.property_id)} >
                                                                                        <i className="far fa-trash-alt"> </i>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            ))}
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
                                                )) :
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="3" className="text-center">
                                                                    No Item Available
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
