import React, { Component } from 'react'

export default class ContactCard extends Component {
    render() {
        return (
            <div>
                <div className="like_share_wrap b-0 justify-content-between d-flex">
                    <button className="btn rounded-0 btn-primary">Request a tour</button>
                    <button className="btn rounded-0 btn-outline-theme" data-toggle="modal" data-target="#exampleModal">Request to apply</button>
                </div>
                <div className="sides-widget">
                    <div className="sides-widget-header">
                        <div className="agent-photo"><img src="https://via.placeholder.com/400x400" alt="" /></div>
                        <div className="sides-widget-details">
                            <h4><a href="#">Shivangi Preet</a></h4>
                            <span><i className="lni-phone-handset"></i>(91) 123 456 7895</span>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="sides-widget-body simple-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label>Phone No.</label>
                            <input type="text" className="form-control" placeholder="Your Phone" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control">I'm interested in this property.</textarea>
                        </div>
                        <button className="btn btn-black btn-md rounded full-width">Send Message</button>
                    </div>
                </div>

                <div className="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to apply?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                       <p>Enter your contact details, and we'll let the rental manager know you want to submit an application. If they're interested, they'll contact you with next steps</p>
                       <form className="simple-form" action="">
                             <div className="form-group">
                                <label> Enter your message </label> 
                                <textarea className="form-control h-auto" rows="5"></textarea>
                             </div>   
                             <div className="form-group">
                                <label> Your First & Last Name</label> 
                                <input className="form-control" type="" name="" />
                             </div>    
                             <div className="form-group">
                                <label> Phone </label> 
                                <input className="form-control" type="" name="" />
                             </div>     
                             <div className="form-group">
                                <label> Email </label> 
                                <input className="form-control" type="" name="" />
                             </div>  
                             <button type="button" className="btn btn-primary rounded-0 my-3 btn-block">Save changes</button>

                       </form>

                       <p className="small ">You agree to Zillow's Terms of Use & Privacy Policy. By choosing to contact a property, you also agree that Zillow Group, landlords, and property managers may call or text you about any inquiries you submit through our services, which may involve use of automated means and prerecorded/artificial voices. You don't need to consent as a condition of renting any property, or buying any other goods or services. Message/data rates may apply.</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
