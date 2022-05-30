


import React from 'react'

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux/allReducers'

import Home from './Pages/Home.js'
import UserProfil from './Pages/UserProfil'

   const Test = (props) => //someone is logged in
   {    
       const logged = props.state.Users.logged
       
       if (logged >= 0) {
           return <UserProfil/>
       } else {
           return <Home/>
       }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Test)