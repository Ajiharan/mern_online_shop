import React,{useEffect,useState} from 'react';
import Register from './user/Register';
import Login from './user/Login';
import Home from './user/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch} from 'react-router-dom';
import PageNotFound from './errors/PageNotFound.js';
import Navbar from './userNavbar/Navbar';
import UserProtected from './user/UserProtected';
import AdminProtected from './admin/AdminProtected';
import UserDashboard from './user/Dashboard';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AdminHome from './admin/Home';
import AdminLogin from './admin/Login';
import Categories from "./admin/Categories";
import AdminMail from "./admin/MailActivity";

function App(props) {
 
 
  let UserNavigation="";

  
  

  if(props.uToken){
    UserNavigation=<div className="App">
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
  }else if(props.aToken){

    UserNavigation=<div className="App">
    <AdminNavbar/>
      <Switch>
      <AdminProtected exact path="/" component={AdminHome}/>
      <AdminProtected exact path="/admin/mail" component={AdminMail}/>
      <Route exact path="/admin/Login" component={AdminLogin}/>
      <AdminProtected exact path="/admin/Categories" component={Categories}/>
      <Route exact component={PageNotFound}/>
    </Switch>
    <ToastContainer autoClose={1400} />   
  </div>
  }else{
    UserNavigation=<div className="App">
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/user/Register" component={Register}/>
      <Route exact path="/admin/Login" component={AdminLogin}/> 
      <Route exact path="/user/Login" component={Login}/>
      <UserProtected exact path="/user/dashboard" component={UserDashboard}/>    
      <Route exact component={PageNotFound}/>
    </Switch>
    <ToastContainer autoClose={1400} />   
  </div>
  }
  
  return (
    UserNavigation
    
  );
}

export default App;
