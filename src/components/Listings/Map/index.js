import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import SimpleMap from "./Map";
import { BrowserRouter, Link, Route } from "react-router-dom";
const locations = require("./locations.json");

function Map(props) {
  console.log("latlng",props.latlng)
  return (
    <div className="App">
      <SimpleMap
        locations={props.Data}
        latlng={props.latlng}
        stickyheader={props.stickyheader}
        getPropertyList={props.getPropertyList.bind(this)}
        getMapChange={props.getMapChange.bind(this)}
      />
    </div>
  );
}

export default Map
