import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            navigate: false
        }
    }

    componentDidMount() {
        console.log(this.state.user)
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
        if (!this.state.user) {
            return <Redirect to="/" push={true} />;
        }
        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        return (
            <>
            <div id="main-wrapper">
                <div className="header header-light head-shadow">
                    <div className="container">
                        <nav id="navigation" className="navigation navigation-landscape">
                            <div className="nav-header">
                                <Link className="nav-brand" to="/">
                                    <img src={logo} className="logo" alt="" />
                                </Link>
                                <div className="nav-toggle"></div>
                            </div>
                            <div className="nav-menus-wrapper" style={{ transitionProperty: "none" }}>
                                {/* <ul className="nav-menu">

                                    <li className="active"><Link to="/">Home</Link>
                                       
                                    </li>

                                    <li><Link to="/Listing">Listings</Link>
                                        
                                    </li>

                                    <li><Link to="/features">Features</Link>
                                       
                                    </li>

                                    <li><a href="JavaScript:Void(0);">Pages</a>
                                        <ul className="nav-dropdown nav-submenu">
                                            <li><a href="blog.html">Blogs Page</a></li>
                                            <li><a href="blog-detail.html">Blog Detail</a></li>
                                            <li><a href="component.html">Shortcodes</a></li>
                                            <li><a href="pricing.html">Pricing</a></li>
                                            <li><a href="404.html">Error Page</a></li>
                                            <li><a href="contact.html">Contacts</a></li>
                                        </ul>
                                    </li>

                                </ul> */}

                                <ul className="nav-menu nav-menu-social align-to-right">

                                    <li>
                                        <li  className="btn btn-dark mt-4">
                                           <i className="fas fa-sign-out-alt" onClick={() => this.onLogoutHandler()}>Logout</i>
                                           </li>
                                    </li>
                                    {/* <li className="add-listing theme-bg">
                                        <a href="submit-property.html">Add Property</a>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                  <div className="App">
                      <div className="App-header">Dashboard</div>
                  </div>
            </div>
        </>
        )
    }
}
