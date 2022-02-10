import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Calculate from './Calculate'
import ContactCard from './ContactCard'
import FeaturedProperty from './FeaturedProperty'

export default class Index extends Component {
    render() {
        return (
            <div>
                <section className="gray-simple">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-8 col-md-12 col-sm-12">

                                <div className="property_block_wrap style-2 p-4">
                                    <div className="prt-detail-title-desc">
                                        <span className="prt-types sale">For Sale</span>
                                        <h3>Jannat Graynight Mood In Siver Colony, London</h3>
                                        <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                        <h3 className="prt-price-fix">$7,600<sub>/month</sub></h3>
                                        <div className="list-fx-features">
                                            <div className="listing-card-info-icon">
                                                <div className="inc-fleat-icon"><img src="assets/img/bed.svg" width="13" alt="" /></div>3 Beds
                                            </div>
                                            <div className="listing-card-info-icon">
                                                <div className="inc-fleat-icon"><img src="assets/img/bathtub.svg" width="13" alt="" /></div>1 Bath
                                            </div>
                                            <div className="listing-card-info-icon">
                                                <div className="inc-fleat-icon"><img src="assets/img/move.svg" width="13" alt="" /></div>800 sqft
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Detail & Features</Accordion.Header>
                                        <Accordion.Body>
                                            <ul className="deatil_features">
                                                <li><strong>Bedrooms:</strong>3 Beds</li>
                                                <li><strong>Bathrooms:</strong>2 Bath</li>
                                                <li><strong>Areas:</strong>4,240 sq ft</li>
                                                <li><strong>Garage</strong>1</li>
                                                <li><strong>Property Type:</strong>Apartment</li>
                                                <li><strong>Year:</strong>Built1982</li>
                                                <li><strong>Status:</strong>Active</li>
                                                <li><strong>Cooling:</strong>Central A/C</li>
                                                <li><strong>Heating Type:</strong>Forced Air</li>
                                                <li><strong>Kitchen Features:</strong>Kitchen Facilities</li>
                                                <li><strong>Exterior:</strong>FinishBrick</li>
                                                <li><strong>Swimming Pool:</strong>Yes</li>
                                                <li><strong>Elevetor:</strong>Yes</li>
                                                <li><strong>Fireplace:</strong>Yes</li>
                                                <li><strong>Free WiFi:</strong>No</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Description</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="block-body">
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Ameneties</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                                <ul className="avl-features third color">
                                                    <li>Air Conditioning</li>
                                                    <li>Swimming Pool</li>
                                                    <li>Central Heating</li>
                                                    <li>Laundry Room</li>
                                                    <li>Gym</li>
                                                    <li>Alarm</li>
                                                    <li>Window Covering</li>
                                                    <li>Internet</li>
                                                    <li>Pets Allow</li>
                                                    <li>Free WiFi</li>
                                                    <li>Car Parking</li>
                                                    <li>Spa & Massage</li>
                                                </ul>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Property video</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <div className="property_video">
                                                <div className="thumb">
                                                    <img className="pro_img img-fluid w100" src="https://via.placeholder.com/1200x800" alt="7.jpg" />
                                                    <div className="overlay_icon">
                                                        <div className="bb-video-box">
                                                            <div className="bb-video-box-inner">
                                                                <div className="bb-video-box-innerup">
                                                                    <a href="https://www.youtube.com/watch?v=A8EI6JaFbv4" data-bs-toggle="modal" data-bs-target="#popup-video" className="theme-cl"><i className="ti-control-play"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Floor Plan</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <div className="accordion" id="floor-option">
                                                <div className="card">
                                                    <div className="card-header" id="firstFloor">
                                                        <h2 className="mb-0">
                                                            <button type="button" className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#firstfloor" aria-controls="firstfloor">First Floor<span>740 sq ft</span></button>
                                                        </h2>
                                                    </div>
                                                    <div id="firstfloor" className="collapse" aria-labelledby="firstFloor" data-parent="#floor-option">
                                                        <div className="card-body">
                                                            <img src="assets/img/floor.jpg" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="seconfFloor">
                                                        <h2 className="mb-0">
                                                            <button type="button" className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#secondfloor" aria-controls="secondfloor">Second Floor<span>710 sq ft</span></button>
                                                        </h2>
                                                    </div>
                                                    <div id="secondfloor" className="collapse" aria-labelledby="seconfFloor" data-parent="#floor-option">
                                                        <div className="card-body">
                                                            <img src="assets/img/floor.jpg" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="third-garage">
                                                        <h2 className="mb-0">
                                                            <button type="button" className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#garages" aria-controls="garages">Garage<span>520 sq ft</span></button>
                                                        </h2>
                                                    </div>
                                                    <div id="garages" className="collapse" aria-labelledby="third-garage" data-parent="#floor-option">
                                                        <div className="card-body">
                                                            <img src="assets/img/floor.jpg" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Location</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <div className="map-container">
                                                <div id="singleMap" data-latitude="40.7427837" data-longitude="-73.11445617675781" data-mapTitle="Our Location"></div>
                                            </div>

                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Gallery</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <ul className="list-gallery-inline">
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                                <li>
                                                    <a href="https://via.placeholder.com/1200x800" className="mfp-gallery"><img src="https://via.placeholder.com/1200x800" className="img-fluid mx-auto" alt="" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className="rating-overview">
                                    <div className="rating-overview-box">
                                        <span className="rating-overview-box-total">4.2</span>
                                        <span className="rating-overview-box-percent">out of 5.0</span>
                                        <div className="star-rating" data-rating="5"><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i>
                                        </div>
                                    </div>

                                    <div className="rating-bars">
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Service</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating high" data-rating="4.7">
                                                    <span className="rating-bars-rating-inner" style={{ width: "85%" }}></span>
                                                </span>
                                                <strong>4.7</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Value for Money</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating good" data-rating="3.9">
                                                    <span className="rating-bars-rating-inner" style={{ width: "75%" }}></span>
                                                </span>
                                                <strong>3.9</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Location</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating mid" data-rating="3.2">
                                                    <span className="rating-bars-rating-inner" style={{ width: "52.2%" }}></span>
                                                </span>
                                                <strong>3.2</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Cleanliness</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating poor" data-rating="2.0">
                                                    <span className="rating-bars-rating-inner" style={{ width: "20%" }}></span>
                                                </span>
                                                <strong>2.0</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>102 Reviews</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <div className="author-review">
                                                <div className="comment-list">
                                                    <ul>
                                                        <li className="article_comments_wrap">
                                                            <article>
                                                                <div className="article_comments_thumb">
                                                                    <img src="https://via.placeholder.com/400x400" alt="" />
                                                                </div>
                                                                <div className="comment-details">
                                                                    <div className="comment-meta">
                                                                        <div className="comment-left-meta">
                                                                            <h4 className="author-name">Rosalina Kelian</h4>
                                                                            <div className="comment-date">19th May 2018</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="comment-text">
                                                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                                            perspiciatis unde omnis iste natus error.</p>
                                                                    </div>
                                                                </div>
                                                            </article>
                                                        </li>
                                                        <li className="article_comments_wrap">
                                                            <article>
                                                                <div className="article_comments_thumb">
                                                                    <img src="https://via.placeholder.com/400x400" alt="" />
                                                                </div>
                                                                <div className="comment-details">
                                                                    <div className="comment-meta">
                                                                        <div className="comment-left-meta">
                                                                            <h4 className="author-name">Rosalina Kelian</h4>
                                                                            <div className="comment-date">19th May 2018</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="comment-text">
                                                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab.
                                                                            perspiciatis unde omnis iste natus error.</p>
                                                                    </div>
                                                                </div>
                                                            </article>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <a href="#" className="reviews-checked theme-cl"><i className="fas fa-arrow-alt-circle-down mr-2"></i>See More Reviews</a>
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Nearby</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">

<div className="nearby-wrap">
    <div className="nearby_header">
        <div className="nearby_header_first">
            <h5>Schools Around</h5>
        </div>
        <div className="nearby_header_last">
            <div className="nearby_powerd">
                Powerd by <img src="assets/img/edu.png" className="img-fluid" alt="" />
            </div>
        </div>
    </div>
    <div className="neary_section_list">

        <div className="neary_section">
            <div className="neary_section_first">
                <h4 className="nearby_place_title">Green Iseland School<small>(3.52 mi)</small></h4>
            </div>
            <div className="neary_section_last">
                <div className="nearby_place_rate">
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star"></i>
                </div>
                <small className="reviews-count">(421 Reviews)</small>
            </div>
        </div>

        <div className="neary_section">
            <div className="neary_section_first">
                <h4 className="nearby_place_title">Ragni Intermediate College<small>(0.52 mi)</small></h4>
            </div>
            <div className="neary_section_last">
                <div className="nearby_place_rate">
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star-half filled"></i>
                </div>
                <small className="reviews-count">(470 Reviews)</small>
            </div>
        </div>

        <div className="neary_section">
            <div className="neary_section_first">
                <h4 className="nearby_place_title">Rose Wood Primary Scool<small>(0.47 mi)</small></h4>
            </div>
            <div className="neary_section_last">
                <div className="nearby_place_rate">
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star"></i>
                </div>
                <small className="reviews-count">(204 Reviews)</small>
            </div>
        </div>

    </div>
</div>

<div className="nearby-wrap">
    <div className="nearby_header">
        <div className="nearby_header_first">
            <h5>Food Around</h5>
        </div>
        <div className="nearby_header_last">
            <div className="nearby_powerd">
                Powerd by <img src="assets/img/food.png" className="img-fluid" alt="" />
            </div>
        </div>
    </div>
    <div className="neary_section_list">

        <div className="neary_section">
            <div className="neary_section_first">
                <h4 className="nearby_place_title">The Rise hotel<small>(2.42 mi)</small></h4>
            </div>
            <div className="neary_section_last">
                <div className="nearby_place_rate">
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                </div>
                <small className="reviews-count">(105 Reviews)</small>
            </div>
        </div>

        <div className="neary_section">
            <div className="neary_section_first">
                <h4 className="nearby_place_title">Blue Ocean Bar & Restaurant<small>(1.52 mi)</small></h4>
            </div>
            <div className="neary_section_last">
                <div className="nearby_place_rate">
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star filled"></i>
                    <i className="fa fa-star"></i>
                </div>
                <small className="reviews-count">(40 Reviews)</small>
            </div>
        </div>

    </div>
</div>

</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion><Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Write a Review</Accordion.Header>
                                        <Accordion.Body>
                                        <div className="block-body">
                                            <form className="simple-form">
                                                <div className="row">

                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group">
                                                            <textarea className="form-control ht-80" placeholder="Messages"></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Property Title" />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Your Name" />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" placeholder="Your Email" />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group">
                                                            <button className="btn btn-theme-light-2 rounded" type="submit">Submit Review</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12">

                                <div className="like_share_wrap b-0">
                                    <ul className="like_share_list">
                                        <li><a href="JavaScript:Void(0);" className="btn btn-likes" data-toggle="tooltip" data-original-title="Share"><i className="fas fa-share"></i>Share</a></li>
                                        <li><a href="JavaScript:Void(0);" className="btn btn-likes" data-toggle="tooltip" data-original-title="Save"><i className="fas fa-heart"></i>Save</a></li>
                                    </ul>
                                </div>

                                <div className="details-sidebar">

                                   <ContactCard />

                                   <Calculate />

                                   <FeaturedProperty />

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
