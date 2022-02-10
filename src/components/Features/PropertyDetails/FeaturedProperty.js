import React, { Component } from 'react'

export default class FeaturedProperty extends Component {
    render() {
        return (
            <div>
                <div className="sidebar-widgets">

                    <h4>Featured Property</h4>

                    <div className="sidebar_featured_property">

                        <div className="sides_list_property">
                            <div className="sides_list_property_thumb">
                                <img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" />
                            </div>
                            <div className="sides_list_property_detail">
                                <h4><a href="single-property-1.html">Loss vengel New Apartment</a></h4>
                                <span><i className="ti-location-pin"></i>Sans Fransico</span>
                                <div className="lists_property_price">
                                    <div className="lists_property_types">
                                        <div className="property_types_vlix sale">For Sale</div>
                                    </div>
                                    <div className="lists_property_price_value">
                                        <h4>$4,240</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sides_list_property">
                            <div className="sides_list_property_thumb">
                                <img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" />
                            </div>
                            <div className="sides_list_property_detail">
                                <h4><a href="single-property-1.html">Montreal Quriqe Apartment</a></h4>
                                <span><i className="ti-location-pin"></i>Liverpool, London</span>
                                <div className="lists_property_price">
                                    <div className="lists_property_types">
                                        <div className="property_types_vlix">For Rent</div>
                                    </div>
                                    <div className="lists_property_price_value">
                                        <h4>$7,380</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sides_list_property">
                            <div className="sides_list_property_thumb">
                                <img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" />
                            </div>
                            <div className="sides_list_property_detail">
                                <h4><a href="single-property-1.html">Curmic Studio For Office</a></h4>
                                <span><i className="ti-location-pin"></i>Montreal, Canada</span>
                                <div className="lists_property_price">
                                    <div className="lists_property_types">
                                        <div className="property_types_vlix buy">For Buy</div>
                                    </div>
                                    <div className="lists_property_price_value">
                                        <h4>$8,730</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sides_list_property">
                            <div className="sides_list_property_thumb">
                                <img src="https://via.placeholder.com/1200x800" className="img-fluid" alt="" />
                            </div>
                            <div className="sides_list_property_detail">
                                <h4><a href="single-property-1.html">Montreal Quebec City</a></h4>
                                <span><i className="ti-location-pin"></i>Sreek View, New York</span>
                                <div className="lists_property_price">
                                    <div className="lists_property_types">
                                        <div className="property_types_vlix">For Rent</div>
                                    </div>
                                    <div className="lists_property_price_value">
                                        <h4>$6,240</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
