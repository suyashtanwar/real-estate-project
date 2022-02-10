import React, { Component } from 'react'
import Listing from '../Listings/Index'

export default class routingProps extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Listing search={this.props.search} />
            </div>
        )
    }
}
