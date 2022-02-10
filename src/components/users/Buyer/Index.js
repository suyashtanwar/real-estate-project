import React, { Component } from 'react'
import Navbar from './Navbar'
import logo from '../../../assets/img/logo.png'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'
import { Redirect } from 'react-router'

export default class Index extends Component {
    constructor(){
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            user_type: JSON.parse(localStorage.getItem("user_type")),
        }
    }
    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if(this.state.user_type !== "Buyer"){
            return <Redirect to="/permission" />;
        }
     
        return (
            <>
                <div className="resido-front">
                    <div className="blue-skin dashboard">
                        <div id="main-wrapper">
                            <Navbar />
                            <div className="clearfix"></div>
                            <Header />
                            <section className="bg-light">
                                <div className="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="filter_search_opt">
                                                <a href="javascript:void(0);" onClick={() => this.toggle()} >Dashboard Navigation<i class="ml-2 ti-menu"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-12">
                                            <Sidebar activePage="dashboard" />
                                        </div>
                                        <div className="col-lg-9 col-md-12">
                                            <div className="dashboard-wraper">

                                                <div className="form-submit">
                                                    <h4>Coming Soon</h4>
                                                    {/* <div className="submit-section">
                                                        <div className="row">

                                                            <div className="form-group col-md-6">
                                                                <label>Your Name</label>
                                                                <input type="text" className="form-control" value="Shaurya Preet" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Email</label>
                                                                <input type="email" className="form-control" value="preet77@gmail.com" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Your Title</label>
                                                                <input type="text" className="form-control" value="Web Designer" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Phone</label>
                                                                <input type="text" className="form-control" value="123 456 5847" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Address</label>
                                                                <input type="text" className="form-control" value="522, Arizona, Canada" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>City</label>
                                                                <input type="text" className="form-control" value="Montquebe" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>State</label>
                                                                <input type="text" className="form-control" value="Canada" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Zip</label>
                                                                <input type="text" className="form-control" value="160052" />
                                                            </div>

                                                            <div className="form-group col-md-12">
                                                                <label>About</label>
                                                                <textarea className="form-control">Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper</textarea>
                                                            </div>

                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            <Footer />
                        </div>
                    </div>
                </div>        
            </>
        )
    }
}
