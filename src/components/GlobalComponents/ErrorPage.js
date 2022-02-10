import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorPage extends Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                        <Link to="/">Homepage</Link>
                    </div>
                    
                </div>
            </div>
        )
    }
}
