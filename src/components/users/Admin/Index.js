import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
            navigate: false,
            activeSide:false
        }
    }
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    componentDidMount() {
        console.log(this.state.user.user_type)
    }

    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };

    render() {
        console.log("suyash.index")
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if(this.state.user_type !== "Admin"){
            return <Redirect to="/permission" />;
        }
        return (
            <>
                <div className="container-scroller resido-admin">
                    <Navbar
                       sideMenu={this.sideMenu.bind(this)}
                       activeSide={this.state.activeSide}
                        />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                        activePage="dashboard"
                        sideMenu={this.sideMenu.bind(this)}
                        activeSide={this.state.activeSide}
                         />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">Coming Soon</h4>
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
            </>
        )
    }
}
