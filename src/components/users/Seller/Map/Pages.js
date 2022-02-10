import React from "react";
import GoogleMapReact from "google-map-react";
import pin from "./pin.png";
const locations = require("./locations.json");

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 60.192059,
      lng: 24.945831
    },
    zoom: 11
  };

  render() {
    return <p> hello </p>;
  }
}

export default SimpleMap;
