import React,{useEffect,useState} from 'react';
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
import AdminProtected from './admin/AdminProtected';
import UserDashboard from './user/Dashboard';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AdminHome from './admin/Home';
import AdminLogin from './admin/Login';

function App() {
  const [utokens,setuserToken]=useState("");
  const [atokens,setadminToken]=useState("");

  let userhasToken="";
  let adminhasToken="";
  let UserNavigation="";

  useEffect(()=>{
    console.log("UseEffect Called....");
    userhasToken=JSON.parse(localStorage.getItem('auth'));
    adminhasToken=JSON.parse(localStorage.getItem('auth_admin'));
    setuserToken(userhasToken);
    setadminToken(adminhasToken);
  });
  

  if(utokens){
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
  }else if(atokens){

    UserNavigation=<div className="App">
    <AdminNavbar/>
      <Switch>
      <AdminProtected exact path="/admin/home" component={AdminHome}/> 
      <Route exact path="/admin/Login" component={AdminLogin}/> 
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
