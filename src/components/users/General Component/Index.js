import React, { Component } from 'react'

export default class Index extends Component {
    render() {
        return (
            <div>
               <Modal size="xl" isOpen={this.state.contactModal} toggle={() => this.AgentContactModal()}>
                    <ModalHeader className="header-less ml-3" toggle={() => this.AgentContactModal()}>
                    Contact Agent
                    </ModalHeader>
                    <ModalBody className="border-0">
                    <div className="modal-body p-4">
                                <div className="form-submit">
                                    <div className="form-group">
                                        <label>Name </label>
                                        <input
                                            className="form-control"
                                            required=""
                                            type="text"
                                            name="name"
                                            placeholder="First Name"
                                            value={this.state.userInfo.name}
                                            onChange={this.onChangehandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            placeholder="Contact"
                                            value={this.state.phone}
                                            // onChange={this.handlephone()}
                                            onChange={this.onChangehandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            className="form-control"
                                            required=""
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={this.state.userInfo.email}
                                            onChange={this.onChangehandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            className="form-control"
                                            required=""
                                            type="textarea"
                                            name="message"
                                            placeholder="Message"
                                            value={this.state.userInfo.message}
                                            onChange={this.onChangehandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            value={this.state.check}
                                            id="a-2"
                                            className="checkbox-custom"
                                            name="a-2"
                                            type="checkbox"
                                            onClick={this.handleCooling}
                                        />
                                        <label htmlFor="a-2" className="checkbox-custom-label">I want financing information</label>
                                    </div>
                                    <p className="small">
                                        By pressing Contact Agent, you agree that Zillow Group and its affiliates, and <a href=""> real estate professionals</a> may call/text you about your inquiry, which may involve use of automated means and prerecorded/artificial voices. You don't need to consent as a condition of buying any property, goods or services. Message/data rates may apply. You also agree to our <a href="">Terms of Use</a>. Zillow does not endorse any real estate professionals. We may share information about your recent and future site activity with your agent to help them understand what you're looking for in a home.
                                    </p>
                                </div>
                            </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex justify-content-end w-100">
                        <Button type="button" onClick={() => this.AgentContactModal()} className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
                        <Button color="info"  onClick={() => this.SubmitContactForm()} type="button" className="btn btn-theme">Contact Agent</Button>
                            
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
