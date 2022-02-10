import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default class Property extends Component {
    constructor() {
        super();
        this.state = {
            activeSide:false
        }
    }
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    render() {
        return (
            <div>
                <div className="container-scroller resido-admin">
                    <Navbar 
                    sideMenu={this.sideMenu.bind(this)}
                    activeSide={this.state.activeSide}
                    />
                    <div className="container-fluid page-body-wrapper">
                      <Sidebar 
                      sideMenu={this.sideMenu.bind(this)}
                      activeSide={this.state.activeSide}
                       activepage="property"/>
                        <div className="main-panel">
                            <div className="content-wrapper">
                            <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">PROPERTIES</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                {/* <h4 className="card-title  justify-content-between d-flex ">Property</h4> */}
                                                <div className="table-responsive">
                                                <h4 className="card-title"> No Records</h4>
                                                    {/* <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th> Assignee </th>
                                                                <th> Subject </th>
                                                                <th> Status </th>
                                                                <th> Last Update </th>
                                                                <th> Tracking ID </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={face1} className="mr-2" alt="image" /> David Grey
                                                                </td>
                                                                <td> Fund is not recieved </td>
                                                                <td>
                                                                    <label className="badge badge-gradient-success">DONE</label>
                                                                </td>
                                                                <td> Dec 5, 2017 </td>
                                                                <td> WD-12345 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src={face1} className="mr-2" alt="image" /> Stella Johnson
                                                                </td>
                                                                <td> High loading time </td>
                                                                <td>
                                                                    <label className="badge badge-gradient-warning">PROGRESS</label>
                                                                </td>
                                                                <td> Dec 12, 2017 </td>
                                                                <td> WD-12346 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src={face1} className="mr-2" alt="image" /> Marina Michel
                                                                </td>
                                                                <td> Website down for one week </td>
                                                                <td>
                                                                    <label className="badge badge-gradient-info">ON HOLD</label>
                                                                </td>
                                                                <td> Dec 16, 2017 </td>
                                                                <td> WD-12347 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src="assets/images/faces/face4.jpg" className="mr-2" alt="image" /> John Doe
                                                                </td>
                                                                <td> Loosing control on server </td>
                                                                <td>
                                                                    <label className="badge badge-gradient-danger">REJECTED</label>
                                                                </td>
                                                                <td> Dec 3, 2017 </td>
                                                                <td> WD-12348 </td>
                                                            </tr>
                                                        </tbody>
                                                    </table> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <footer className="footer">
                                <div className="container-fluid clearfix">
                                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © website.com 2021</span>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
