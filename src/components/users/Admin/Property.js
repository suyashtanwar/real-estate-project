import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Redirect } from 'react-router';

export default class Property extends Component {
     constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            activeSide:false
        }
    }
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    render() {
        if(!this.state.user) {
            return <Redirect to="/signin" />;
        }
        return (
            <div>
                 <div className="container-scroller resido-admin" >
                     <Navbar 
                      sideMenu={this.sideMenu.bind(this)}
                      activeSide={this.state.activeSide}
                       />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}
                         activePage="property" />
                        <div className="main-panel">
                            <div className="content-wrapper">
                            <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">PROPERTY</h4>
                                   
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                {/* <h4 className="card-title  justify-content-between d-flex ">Recent Property <Link to="/seller/edit-property" className="btn btn-gradient-primary btn-sm">Add property</Link>  </h4> */}
                                                <div className="table-responsive">
                                                   
                                                    {/* <h4 className="card-title"> No Records</h4> */}
                                                    <span>No Records</span>
                                                    
                                                </div>
                                            </div>
                                        </div>
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
