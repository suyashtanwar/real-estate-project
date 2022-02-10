import React, { Component } from 'react'
import carouselImg from '../../assets/img/p-4.jpg'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { Modal, Spinner, ModalBody, ModalHeader, ModalFooter, Button, Input } from 'reactstrap'
import axios from 'axios';
import { APIDOMAIN,APIURL } from '../constants/common';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      baseImgIdx:0,
      topImgIdx: 0,
      imageModal: false,
      Images: [
      {image:"https://realstateapi.imenso.in/uploads/property/53/16365278101.jpg"},
      {image:"https://realstateapi.imenso.in/uploads/property/53/16365278101.jpg"}
      ],
      PropertyInfo:[]
    }
  }

  componentDidMount() {
    this.ViewpropertyDetails()
  

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

  ViewpropertyDetails() {

    const formData = new FormData();
    formData.append('property_id', this.props.PropertyId);
    // this.setState({ Loader: true });
    axios
        .post(APIURL + "view-property-detail", formData, {

        })
        .then((response) => {
            this.setState({
                PropertyInfo: response.data.data,
            })
            let images=[];
            response.data.data.length > 0 && response.data.data.map((item, idx) => {
               item.property_media.map((file, index) => {
                 if(file.type === "image"){
                 images.push({image: file.url_path})
                }
                 });
            });
               this.setState({
                         Images :images
                     })

        })
        .catch((error) => {

        });
}
  render() {
  
    return (
      <div>
        <Carousel  interval="300000" activeIndex={this.state.baseImgIdx} onSelect={this.handleSelect}>
            {this.state.Images.length > 0 && this.state.Images.map((item, idx) => (
                <Carousel.Item onClick={() => this.view(idx)} style={{backgroundImage: `url(${item.image})`}}>
                
              </Carousel.Item>
             ))}
           
            </Carousel> 
       
         <Modal className="resido-admin" size="lg" isOpen={this.state.imageModal} toggle={() => this.imageModal()} autoFocus={false}>
            <button onClick={() => this.imageModal()} className="close close-carousel">x</button> 
          <ModalBody>
            <Carousel interval="300000" activeIndex={this.state.topImgIdx} onSelect={this.handleSelectTop}>
              {this.state.Images.length > 0 ? this.state.Images.map((item, idx) => (
                <Carousel.Item onClick={() => this.view(idx)} style={{backgroundImage: `url(${item.image})`}}>
                
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
    )
  }
}
