import './colors.css'
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
//====================================================================
import store from './Redux/allReducers.js';

import Header from './Header/Header.js'
import Content from './Content/Content.js';
import Modal from './Modal/Modal.js';
import Api from './Api/Api.js'

function App()
{
  
  return (
    <div className='app'>
      <Header />
      <Content />
      <Modal />
      <Api />
    </div>)
}




ReactDOM.render(<Provider store={store}>
  <Router>
    <App/>
  </Router>
  
</Provider>,document.getElementById('app'));


