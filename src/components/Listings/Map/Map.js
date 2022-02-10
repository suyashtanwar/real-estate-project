import React from "react";
import GoogleMapReact from "google-map-react";
import pin from "./pin.png";
import { Link } from "react-router-dom";

const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)"
};

class SimpleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      map_lat: 0,
      map_lng: 0,
      centerlatlng: {
        lat: 0,
        lng: 0,
      },
      zoom: 12
    }
  }


  getlocation = (e) => {
   let data=[{"lat":e.center.lat,"lng": e.center.lng,"zoom": e.zoom}];
   this.props.getMapChange(data);
  }

  componentDidMount() {
    this.setState({
      centerlatlng: {
        lat: this.props.latlng.lat,
        lng: this.props.latlng.lng
      }
    })
  }

  componentWillReceiveProps() {
    this.setState({
      centerlatlng: {
        lat: this.props.latlng.lat,
        lng: this.props.latlng.lng
      }
    })
  }

  render() {
    return (
      <div style={{ height: this.props.stickyheader ? "100vh" : "90vh", width: "100%" }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            key: "AIzaSyA16d9FJFh__vK04jU1P64vnEpPc3jenec"
          }}
          center={this.state.centerlatlng}
          defaultCenter={this.state.centerlatlng}
          center={this.state.centerlatlng}
          defaultZoom={this.state.zoom}
          onChange={(e) => this.getlocation(e)}
        >
          {this.props.locations.map(item => {
            if (item.address.length !== 0) {
              return item.address.map(i => {
                return (
                  <Link to={"/"} key={i.id} lat={i.lat} lng={i.lng} >
                    <img style={markerStyle} src={pin} alt="pin" />
                  </Link>
                );
              });
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
