import React, { Component } from 'react'
import '../src/css/style.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Index'
import Listing from './components/Listings/Index'
import Features from './components/Features/Index'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Test from "./components/GlobalComponents/Test";
import Viewproperty from "./components//Viewproperty/Index";
import Slider from './components/Viewproperty/details/Slider'
import Contact from './components/contact/Index'
import About from './components/About/Index'

import Agent from './components/users/Agent/DashBoard';
import AgentProperty from './components/users/Agent/Property'
import AgentContact from './components/users/Agent/ContectAgent'
import AgentTakeTour from './components/users/Agent/TakeTourEnq'
import AgentChangePassword from './components/users/Agent/ChangePassword';
import AgentApproval from './components/users/Admin/AgentApproval'
import PropertyRequest from './components/users/Agent/AssignedProperty'
import AgentSellerContract from './components/users/Agent/ContractForms/SellerContract/AgentSeller'
import AgentContractBuyer from './components/users/Agent/ContractForms/BuyerContract/BuyerContract'
import SellerPurchaseList from './components/users/Agent/ContractForms/SellerPurchase/SellerPurchaseList'
import BuyerPurchaseList from './components/users/Agent/ContractForms/BuyerPurchase/BuyerPurchaseList'
import SellerContractList from './components/users/Agent/ContractForms/SellerContract/ContractList';
import buyerContractList from './components/users/Agent/ContractForms/BuyerContract/ContractList';
import SellerPurchaseContract from './components/users/Agent/ContractForms/SellerPurchase/SellerPurchaseContract'
import BuyerPurchaseContract from './components/users/Agent/ContractForms/BuyerPurchase/BuyerPurchaseContract'


import Seller from './components/users/Seller/Index';
import SellerProperty from './components/users/Seller/PropertyList'
import SellerVerifiedProperty from './components/users/Seller/VerifiedProperty'
import SellerVerifiedPropertyView from './components/users/Seller/ViewVerifiedProperty'
import SellerAddProperty from './components/users/Seller/Property/AddProperty';
import SellerEnquiry from './components/users/Seller/Enquiry'
import SellerProfile from './components/users/Seller/Profile';
import SellerChangePassword from './components/users/Seller/ChangePassword';
import SellerAgentContractList from './components/users/Seller/ContractForms/agentSellerContract'
import SellerPurchaseConList from './components/users/Seller/ContractForms/sellerPurchaseList'

import Admin from './components/users/Admin/Index';
import Cms from './components/users/Admin/Cms/PageList';
import EditCms from './components/users/Admin/Cms/EditPage'
import Users from './components/users/Admin/UserManagement.js';
import ReceiveEnquiry from './components/users/Admin/ReceiveEnquiry';
import AdminProperty from './components/users/Admin/Property';
import AdminEnquiry from './components/users/Admin/Enquiry';
import AdminProfile from './components/users/Admin/Profile';
import VerifiedPropertyAdmin from './components/users/Admin/Property/verifiedProperty';
import AssignProperty from './components/users/Admin/Property/AssignProperty';
import RequestedAssignPropery from './components/users/Admin/Property/RequestedAssignPropery'
import AdAssignedPropertyView from './components/users/Admin/Property/AssignedPropertyView';
import AdVerifiedPropertyView from './components/users/Admin/Property/VerifiedPropertyView';
import AdRequestedAssignProperyView from './components/users/Admin/Property/RequestedPropertyView';
import AdminChangePassword from './components/users/Admin/ChangePassword';

import Buyer from './components/users/Buyer/Index';
import BuyerMyWishlist from './components/users/Buyer/WishList'
import BuyerPropertyEnquiry from './components/users/Buyer/PropertyEnquiry/ContactAgent'
import BuyerPropertyEnquiryTour from "./components/users/Buyer/PropertyEnquiry/TakeTour"
import BuyerProfile from './components/users/Buyer/MyProfile';
import BuyerChangePassword from './components/users/Buyer/ChangePassword';
import BuyerAgentContractList from './components/users/Buyer/ContractForms/BuyerAgentContract'
import BuyerPurchaseConList from './components/users/Buyer/ContractForms/BuyerPurchase'

import AgentProfile from './components/users/Agent/Profile';
import ForgotPassword from './components/ForgotPassword';

import ErrorPage from './components/GlobalComponents/ErrorPage'
import permissionDenied from './components/GlobalComponents/PermissionDenied'
import CheckUser from './components/GlobalComponents/CheckUser';
import ResetPassword from './components/ResetPassword';
import ViewPropertyDetails from './components/users/Agent/ViewPropertyDetails';
import VerifiedProperty from './components/users/Agent/VerifiedProperties';
import VerifiedPropertyView from './components/users/Agent/VerifiedPropertyView'


export default class App extends Component {
  render() {
     return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route exact path="/signin" exact component={SignIn} />
            <Route exact path="/user/verify/:token" exact component={SignIn} />
            <Route exact path="/signup" exact component={SignUp} />
            <Route exact path="/forgot/password" exact component={ForgotPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword}></Route>
            <Route exact path="/checkuser" exact component={CheckUser} />
            <Route exact path="/listing" exact component={Listing} />
            <Route exact path="/features" exact component={Features} />
            <Route exact path="/viewproperty/details/:id?" exact component={Viewproperty} />
            <Route exact path="/slider" exact component={Slider} />
            <Route exact path="/contact" exact component={Contact} />
            <Route exact path="/cms/:slug" exact component={About} />
            <Route exact path="/buyer" exact component={Buyer} />
            {/* <Route exact path="/buyer/dashboard" exact component={DashBoard} /> */}
            <Route exact path="/buyer/profile" exact component={BuyerProfile} />
            <Route exact path="/buyer/wishlist" exact component={BuyerMyWishlist} />
            <Route exact path="/buyer/contact/enquiry" exact component={BuyerPropertyEnquiry} />
            <Route exact path="/buyer/taketour/enquiry" exact component={BuyerPropertyEnquiryTour} />
            <Route exact path="/buyer/contract/list" exact component={BuyerAgentContractList} />
            <Route exact path="/buyer/purchase/contract/list" exact component={BuyerPurchaseConList} />
            <Route exact path="/buyer/changepassword" exact component={BuyerChangePassword} />
            
            <Route exact path="/agent" exact component={Agent} />
            <Route exact path="/agent/profile" exact component={AgentProfile} />
            <Route exact path="/agent/property" exact component={AgentProperty} />
            <Route exact path="/agent/assigned/property" exact component={PropertyRequest} />
            <Route exact path="/agent/verified/property" exact component={VerifiedProperty} />
            <Route exact path="/agent/verified/property/details/:id?" exact component={VerifiedPropertyView} />
            <Route exact path="/agent/property/details/:id?" exact component={ViewPropertyDetails} />
            <Route exact path="/agent/enquiry" exact component={AgentContact} />
            <Route exact path="/agent/enquiry/tour" exact component={AgentTakeTour} />
            <Route exact path="/agent/changepassword" exact component={AgentChangePassword} />
            <Route exact path="/agent/seller/contract/list" exact component={SellerContractList} />
            <Route exact path="/agent/buyer/contract/list" exact component={buyerContractList} />
            <Route exact path="/agent/contract/seller" exact component={AgentSellerContract} />
            <Route exact path="/agent/contract/buyer" exact component={AgentContractBuyer} />
            <Route exact path="/agent/contract/seller/purchase/list" exact component={SellerPurchaseList} />
            <Route exact path="/agent/contract/buyer/purchase/list" exact component={BuyerPurchaseList} />
            <Route exact path="/agent/seller/purchase/contract" exact component={SellerPurchaseContract} />
            <Route exact path="/agent/buyer/purchase/contract" exact component={BuyerPurchaseContract} />
          

            <Route exact path="/seller" exact component={Seller} />
            <Route exact path="/seller/profile" exact component={SellerProfile} />
            <Route exact path="/seller/verified/property" exact component={SellerVerifiedProperty} />
            <Route exact path="/seller/verified/property/details/:id?" exact component={SellerVerifiedPropertyView} />
            <Route exact path="/seller/property" exact component={SellerProperty} />
            <Route exact path="/seller/edit-property/:id?" exact component={SellerAddProperty} />
            <Route exact path="/seller/enquiry" exact component={SellerEnquiry} />
            <Route exact path="/seller/changepassword" exact component={SellerChangePassword} />
            <Route exact path="/seller/contract/list" exact component={SellerAgentContractList} />
            <Route exact path="/seller/purchase/contract/list" exact component={SellerPurchaseConList} />

            <Route exact path="/admin" exact component={Admin} />
            <Route exact path="/cms" exact component={Cms} />
            <Route exact path="/edit/cms/:id" exact component={EditCms} />
            <Route exact path="/admin/users" exact component={Users} />
            <Route exact path="/admin/received/enquiry" exact component={ReceiveEnquiry} />
            <Route exact path="/admin/profile" exact component={AdminProfile} />
            <Route exact path="/admin/property" exact component={AdminProperty} />
            <Route exact path="/admin/enquiry" exact component={AdminEnquiry} />
            <Route exact path="/admin/approval" exact component={AgentApproval} />
            <Route exact path="/admin/verified/property" exact component={VerifiedPropertyAdmin} />
            <Route exact path="/admin/assign/property" exact component={AssignProperty} />
            <Route exact path="/admin/requested/assign/property" exact component={RequestedAssignPropery} />
            <Route exact path="/admin/changepassword" exact component={AdminChangePassword} />
            <Route exact path="/admin/verified/property/View/:id?" exact component={AdVerifiedPropertyView} />
            <Route exact path="/admin/requested/property/View/:id?" exact component={AdRequestedAssignProperyView} />
            <Route exact path="/admin/property/View/:id?" exact component={AdAssignedPropertyView} />
            
            <Route exact path="/test" exact component={Test} />
            <Route path="/permission" component={permissionDenied}></Route>
            <Route path="" component={ErrorPage}></Route>
          </Switch>
        </Router>

      </div>
    );
  }
}
