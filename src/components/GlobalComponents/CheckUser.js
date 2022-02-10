import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class CheckUser extends Component {
    constructor(){
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type:JSON.parse(localStorage.getItem("user_type")),
            navigate:false
        }
    }

    componentDidMount(){
        this.setState({
            navigate:true
        })
    }
    render() {
        
        if(this.state.navigate){
            if(this.state.user_type=== "Buyer"){
                return <Redirect to="/buyer" />;
            }
            if(this.state.user_type === "Agent"){
                return <Redirect to="/agent" />;
            }
            if(this.state.user_type === "Seller"){
                return <Redirect to="/seller" />;
            }
            if(this.state.user_type === "Admin"){
                return <Redirect to="/admin" />;
            }
            if(!this.state.user_type){
                return <Redirect to="/signIn" />;
            }
        }
        return (
            <div>
               
            </div>
        )
    }
}
