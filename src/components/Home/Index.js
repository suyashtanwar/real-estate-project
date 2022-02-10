import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import Navbar from './Navbar'
import Header from './Header'
import Latestproperty from './LatestProperty'
import HowItWorks from './HowItWorks'
import SearchPlace from './SearchPlace'
import News from './News'
import Footer from '../GlobalComponents/Footer'
import {Spinner} from 'reactstrap'

export default class Home extends Component {
	constructor(){
		super();
		this.state = {
			stylePath:true,
			Loader:true
		}
	}
	componentDidMount(){
		window.scrollTo(0,0);
		setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
	}
	render() {
		console.log(this.props)
		return (
		<div className="resido-front">	
		 {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}         
               
			<div id="main-wrapper" className="blue-skin">
				{/* Navbar cmp */}
				<Navbar />
				{/* header cmp */}

				<div className="clearfix"></div>
				<Header/>

				{/* explore places cmp */}
				<Latestproperty />

				{/* FindByPlaces */}
				{/* <FindByPlaces /> */}

				{/* how it Works */}
				<HowItWorks />

				<div className="clearfix"></div>
				{/* SearchPlace cmp */}
				<SearchPlace />

				{/* footer cmp */}
				<Footer />

				
			</div>

		</div>	
		)
	}
}
