import React, { Component } from 'react'
import axios from 'axios';
import { APIURL } from '../../constants/common';
import { Link ,Redirect} from 'react-router-dom';
import NumberFormat from 'react-number-format';

export default class FeaturedProperty extends Component {
    constructor() {
        super();
        this.state = {
            PropertyInfo: [],
            p_id:"",
            redirect:false
        }
    }

    getRelevantProperty() {
        const formData = new FormData();
        formData.append('property_id', this.props.PropertyId);
        // this.setState({ Loader: true });
        axios
            .post(APIURL + "get-relavent-properties", formData, {

            })
            .then((response) => {
                console.log(response.data.data)
                this.setState({
                    PropertyInfo: response.data.data,
                })
            })
            .catch((error) => {

            });
    }
    viewPropertyRelated = (id) => {
        this.setState({
            p_id:id,
            redirect:true
        },() => {
            setTimeout(()=>{
                window.location.reload();
            }, 100);
        })
    }

    componentDidMount() {
        this.getRelevantProperty()
    }
    render() {
        if(this.state.redirect){
            <Redirect to={"/viewproperty/details/" + this.state.p_id} />
        }
        return (
            <div>
                <div className="sidebar-widgets">
                    <h4>Related Property</h4>
                    {this.state.PropertyInfo.length > 0 ?
                        this.state.PropertyInfo.map((item, idx) => (
                            <div className="sidebar_featured_property">
                                <Link to={"/viewproperty/details/" + item.id} 
                                onClick={(e) => this.viewPropertyRelated(item.id)}
                                  >
                                    <div className="sides_list_property">
                                        {item.propertyProfileImage.length > 0 ?
                                            item.propertyProfileImage.map((sItem, idx) => (
                                                <div className="sides_list_property_thumb">
                                                    <img src={sItem.url_path} className="img-fluid" alt="" />
                                                </div>
                                            )) :
                                            ""
                                        }
                                        {item.property_detail.length > 0 ?
                                            item.property_detail.map((sItem, idx) => (
                                                <div className="sides_list_property_detail">
                                                    <h4>{item.name}</h4>
                                                    <span><i className="ti-location-pin"></i>{sItem.street_number}, {sItem.street_name}, {sItem.city}</span>
                                                    <div className="lists_property_price">
                                                        <div className="lists_property_types">
                                                        <h4>
                                                        <NumberFormat
                                                                                value={sItem.listing_price}
                                                                                className="foo"
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}
                                                                                prefix={'$'}
                                                                                renderText={(value, props) => <div {...props}>{value}</div>}
                                                                                />
                                                        </h4>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            )) :
                                            ""
                                        }
                                    </div>
                                </Link>

                            </div>
                        )) :
                        ""
                    }
                </div>
            </div>
        )
    }
}
