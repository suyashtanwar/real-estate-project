import React, { Component } from 'react'
import axios from 'axios';
import { APIURL } from '../../constants/common';
import { Carousel } from 'react-carousel-minimal';

// const data = [
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
//         caption: `<div>
//                   San Francisco
//                   <br/>
//                   Next line
//                 </div>`
//     },
//     {
//         image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
//         caption: "Darjeeling"
//     },
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
//         caption: "San Francisco"
//     },
//     {
//         image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
//         caption: "Darjeeling"
//     },
//     {
//         image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
//         caption: "San Francisco"
//     },
//     {
//         image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
//         caption: "Darjeeling"
//     }
// ];

export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            PropertyInfo: [],
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

    ViewpropertyDetails(e) {
        const formData = new FormData();
        formData.append('property_id', e);
        // this.setState({ Loader: true });
        axios
            .post(APIURL + "view-property-detail", formData, {

            })
            .then((response) => {
                this.setState({
                    PropertyInfo: response.data.data,
                })
                let Images=[];

               this.state.PropertyInfo.map((item ,idx) => {
                item.property_media.map((result, index) => {
                    Images.push({
                        image: result.url_path,
                        caption: "Darjeeling"
                    },);
                    this.setState({
                        Data:Images
                      })
                  });
                })
                console.log("this.state ",this.state.Data)
            })
            .catch((error) => {

            });

    }

    componentDidMount() {
        this.ViewpropertyDetails(this.props.id)
    }
    render() {
        console.log("id",this.props.id)
        const {Data } = this.state
        return (
            <div className="App">
                           
                        <div style={{ textAlign: "center" }}>
                          {/* <h2>React Carousel Minimal {this.state.Data}</h2> */}
                            <div style={{
                                padding: "0 20px"
                            }}>
                                <Carousel
                                    data={this.state.Data}
                                    time={2000}
                                    width="850px"
                                    height="400px"
                                    //   captionStyle={captionStyle}
                                    radius="10px"
                                    slideNumber={true}
                                    //   slideNumberStyle={slideNumberStyle}
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
                            </div>
                        </div>
            </div>
        )
    }
}
