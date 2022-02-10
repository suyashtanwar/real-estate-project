import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from '../GlobalComponents/Footer'
import PropertyDetails from './PropertyDetails/Index'
import { Spinner } from 'reactstrap'

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
			user_type: localStorage.getItem("user_type"),
            navigate: false,
            Loader:true
        }
    }

    componentDidMount(){
     this.setState({
        Loader:false
     })
    }

    render() {
        return (
        <div className="resido-front">
                {this.state.Loader ? <div className="loader"> <Spinner type="grow" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                
            <div className="blue-skin">
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
                                <ul className="nav-menu">
                                <li ><Link to="/">Home</Link></li>
									<li ><Link to="/Listing">Property</Link></li>
									<li className="active"><Link to="#">Help</Link></li>
                                        <li>
                                        {this.state.user ? 
									""
									: 
                                    <Link to="/signup" ><img src="assets/img/user.svg" width="12" alt="" className="mr-2" />Sign up</Link>
		                             }
                                            {/* <Link to="/signup">SignUp</Link> */}
                                            </li>   
                                    </ul>
                                    <ul className="nav-menu nav-menu-social align-to-right">
                                        <li>
                                        {this.state.user ? 
									<Link to={this.state.user.user_type === "Agent" ? "/agent" : this.state.user.user_type === "Seller" ?  "/seller" : "/Buyer"}  ><img src="assets/img/user.svg" width="12" alt="" className="mr-2" />Profile</Link>
									: 
                                    <Link to="/signin" ><img src="assets/img/user.svg" width="12" alt="" className="mr-2" />Sign In</Link>
		                             }
                                            {/* <Link to="/signin" className="text-success">
                                                <i className="fas fa-user-circle mr-2"></i>Sign In</Link> */}
                                        </li>
                                       
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="clearfix"></div>


                    <div className="featured_slick_gallery gray">
                        <div className="featured_slick_gallery-slide">
                            <Header />
                            {/* <div className="featured_slick_padd"><a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a></div> */}
                        </div>
                        {/* <a href="JavaScript:Void(0);" className="btn-view-pic">View photos</a> */}
                    </div>

                    <PropertyDetails />

                    <section className="theme-bg call-to-act-wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="call-to-act">
                                        <div className="call-to-act-head">
                                            <h3>Want to Become a Real Estate Agent?</h3>
                                            <span>We'll help you to grow your career and growth.</span>
                                        </div>
                                        <a href="#" className="btn btn-call-to-act">SignUp Today</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />

                    <div className="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="registermodal" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
                            <div className="modal-content" id="registermodal">
                                <span className="mod-close" data-bs-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span>
                                <div className="modal-body">
                                    <h4 className="modal-header-title">Log In</h4>
                                    <div className="login-form">
                                        <form>

                                            <div className="form-group">
                                                <label>User Name</label>
                                                <div className="input-with-icon">
                                                    <input type="text" className="form-control" placeholder="Username" />
                                                    <i className="ti-user"></i>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label>Password</label>
                                                <div className="input-with-icon">
                                                    <input type="password" className="form-control" placeholder="*******" />
                                                    <i className="ti-unlock"></i>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" className="btn btn-md full-width btn-theme-light-2 rounded">Login</button>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="modal-divider"><span>Or login via</span></div>
                                    <div className="social-login mb-3">
                                        <ul>
                                            <li><a href="#" className="btn connect-fb"><i className="ti-facebook"></i>Facebook</a></li>
                                            <li><a href="#" className="btn connect-google"><i className="ti-google"></i>Google+</a></li>
                                        </ul>
                                    </div>
                                    <div className="text-center">
                                        <p className="mt-5"><a href="#" className="link">Forgot password?</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a id="back2Top" className="top-scroll" title="Back to top" href="#"><i className="ti-arrow-up"></i></a>
                </div>
            </div>    
        </div>
        )
    }
}
