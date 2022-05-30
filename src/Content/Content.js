import './Content.css'
import React, {useState} from 'react'

import { Routes, Route } from "react-router-dom";

// import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

import { connect } from 'react-redux';

import { mapStateToProps,mapDispatchToProps } from '../Redux/allReducers'

import Home from './Pages/Home.js'
import Offert from './Pages/Offert'
import Basket from './Pages/Basket'
import Contact from './Pages/Contact'

import AddOffert from './Pages/AddOffert'
import Ussers from './Pages/Ussers'
import ContactChange from './Pages/ContactChange'
import ColorsSet from './Pages/ColorsSet';

import UserProfil from './Pages/UserProfil'

import Test from './AuthTest'



const Content = (props) =>
{
    
    return (

        <div className='contentBody'>        
            
            <Routes >

                <Route exact path='/' element={<Home />} />
                <Route exact path='/Offert' element={<Offert />} />
                <Route exact path='/Basket' element={<Basket />} /> 
                <Route exact path='/Contact' element={<Contact />} />

                <Route exact path='/UserProfil' element={<Test> <UserProfil /></Test>} />
            
                <Route exact path='/AddOffert' element={<AddOffert /> } />
                <Route exact path='/Ussers' element={<Ussers />} />
                <Route exact path='/ContactChange' element={<ContactChange />} />
                <Route exact path='/ColorsSet' element={<ColorsSet />} />

            </Routes >

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)

