import React, { Component } from 'react';
import Navbar from './components/navigationBar';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import HomePage from './components/homepage'
import "./App.css"
import PastData from './components/pastDataPage'



class App extends Component { 
  render() {
    return (
      <div>
      
      

      <Router>  
      <Navbar/>
      <div>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/pastData' component={PastData}/>
      </div>
      </Router>
      </div>
    );
  }
}

export default App;