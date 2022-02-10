import Button from '@restart/ui/esm/Button'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchPlace extends Component {
    render() {
        return (
            <div>
                <section className="image-cover" style={{ backgroundImage: `url(${"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"})`, backgroundRepeat: "no-repeat" }} data-overlay="5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-8 col-md-8">
								<div className="caption-wrap-content text-center">
									<h2>Search Perfect Place in your City</h2>
									<p className="mb-5">We post regulary most powerful articles for help and support.</p>
									<Link to={"/listing"} className="prt-view">
									<Button  className="btn btn-light btn-md rounded">Explore More Property</Button>
								</Link>
									
								</div>
							</div>

						</div>
					</div>
				</section>
            </div>
        )
    }
}
