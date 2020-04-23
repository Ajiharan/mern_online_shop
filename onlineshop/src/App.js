import React from 'react';
import './App.css';
import Register from './user/Register';
import Login from './user/Login';
import Home from './user/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch} from 'react-router-dom';
import PageNotFound from './errors/PageNotFound.js';
import Navbar from './userNavbar/Navbar';
import UserProtected from './user/UserProtected';
import UserDashboard from './user/Dashboard';

function App() {

  const UserNavigation=<div className="App">
  <Navbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/user/Register" component={Register}/>
    <Route exact path="/user/Login" component={Login}/> 
    <UserProtected exact path="/user/dashboard" component={UserDashboard}/>    
    <Route exact component={PageNotFound}/>
  </Switch>
  <ToastContainer autoClose={1400} />   
</div>
  return (
    UserNavigation
    
  );
}

export default App;
