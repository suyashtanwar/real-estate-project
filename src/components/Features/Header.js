import React, { Component } from 'react'
// import '../../assets/css/styles.css'
// import '../../assets/css/colors.css'
// import '../../assets/css/plugins/css/bootstrap.min.css'
import carouselImg from '../../assets/img/p-4.jpg'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={carouselImg} height="420" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImg} height="420" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={carouselImg} height="420"  className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        )
    }
}
