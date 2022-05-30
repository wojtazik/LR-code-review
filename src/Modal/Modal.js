import './Modal.css'
import React from "react";

import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from '../Redux/allReducers'

import Details from './SingleModals/Details'
import Login from './SingleModals/Login'
import ChangeCatName from './SingleModals/ChangeCatName'
import EditOffert from './SingleModals/EditOffert'
import AddNew from './SingleModals/AddNew'
import DeleteOffert from './SingleModals/DeleteOffert'
import Registration from './SingleModals/Registration';
import DeleteAcc from './SingleModals/DelAcc';
import AfterBuy from './SingleModals/AfterBuy';
import CantBuy from './SingleModals/CantBuy'


const Modals = (props) =>
{

  return (
    <div >
      {(() =>
      {
        const modal = props.state.ModalReducer.modal

        if (modal === 'modalDetails') {
          return (<div className='modalBody'><Details /></div>)
        } else if (modal === "login") {
          return (<div className='modalBody'><Login /></div>)
        } else if (modal === "ChangeCatName") {
          return (<div className='modalBody'><ChangeCatName /></div>)
        } else if (modal === 'EditOffert') {
          return (<div className='modalBody'><EditOffert /></div>)
        } else if (modal === "addNew") {
          return (<div className='modalBody'><AddNew /></div>)
        } else if (modal === "DelOffert") {
          return (<div className='modalBody'><DeleteOffert /></div>)
        } else if (modal === "Registration") {
          return (<div className='modalBody'><Registration /></div>)
        } else if (modal === "DelAcc") {
          return (<div className='modalBody'><DeleteAcc /></div>)
        } else if (modal === "afterBuy") {
          return (<div className='modalBody'><AfterBuy /></div>)
        } else if (modal === "cantBuy") {
          return (<div className='modalBody'><CantBuy /></div>)
        }
        
      })()} 
    </div>)
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Modals)