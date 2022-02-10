import React, { Component } from 'react'

export default class Calculate extends Component {
    render() {
        return (
            <div>
                <div className="sides-widget">

                    <div className="sides-widget-header">
                        <div className="sides-widget-details">
                            <h4><a href="#">Shivangi Preet</a></h4>
                            <span>View your Interest Rate</span>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="sides-widget-body simple-form">
                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" className="form-control" placeholder="Sale Price" />
                                <i className="ti-money"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" className="form-control" placeholder="Down Payment" />
                                <i className="ti-money"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" className="form-control" placeholder="Loan Term (Years)" />
                                <i className="ti-calendar"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" className="form-control" placeholder="Interest Rate" />
                                <i className="fa fa-percent"></i>
                            </div>
                        </div>

                        <button className="btn btn-black btn-md rounded full-width">Calculate</button>

                    </div>
                </div>
            </div>
        )
    }
}
