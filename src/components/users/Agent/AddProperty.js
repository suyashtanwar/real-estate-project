import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default class AddProperty extends Component {
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
                 <div className="container-scroller">
                    <Navbar 
                     sideMenu={this.sideMenu.bind(this)}
                     activeSide={this.state.activeSide}
                     />
                    <div className="container-fluid page-body-wrapper">
                      <Sidebar 
                       sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide} />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">Add New property</h4>
                                                <p className="card-description"> Details</p>
                                                <form className="forms-sample">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputName1">Name</label>
                                                        <input type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail3">Email address</label>
                                                        <input type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword4">Password</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleSelectGender">Gender</label>
                                                        <select className="form-control" id="exampleSelectGender">
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>File upload</label>
                                                        <input type="file" name="img[]" className="file-upload-default" />
                                                        <div className="input-group col-xs-12">
                                                            <input type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" />
                                                            <span className="input-group-append">
                                                                <button className="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputCity1">City</label>
                                                        <input type="text" className="form-control" id="exampleInputCity1" placeholder="Location" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleTextarea1">Textarea</label>
                                                        <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                                                    <button className="btn btn-light">Cancel</button>
                                                </form>
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
