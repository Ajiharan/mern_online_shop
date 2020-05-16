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
import StoreManagerNavbar from "./managerNavbar/Navbar";
import ManagerProtected from "./storeManager/StoreManagerProtected";
import ManagerHome from "./storeManager/Home";
import ManagerLogin from "./storeManager/Login";
import Product from "./storeManager/Product";
export const UserUpdateContext=React.createContext();
function App(props) {

 const [mydata,setData]=useState({});
  let UserNavigation="";

  const UpdateUi=(udata)=>{
    console.log("Udata",udata)
    setData(udata);
  }
  

  if(props.uToken){
    UserNavigation=<div className="App">
    
        <Navbar updateData={mydata}/>
  
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/user/Register" component={Register}/>
      <Route exact path="/user/Login" component={Login}/>
      <UserUpdateContext.Provider value={UpdateUi} >
          <UserProtected exact path="/user/dashboard" component={UserDashboard}/>    
      </UserUpdateContext.Provider>
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
  }else if(props.sToken){
    UserNavigation= <div className="App">
    <StoreManagerNavbar/>
      <Switch>
      <ManagerProtected  exact path="/" component={ManagerHome}/>
      <ManagerProtected exact path="/manager/AddProduct" component={Product}/>

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
      <Route exact path="/manager/Login" component={ManagerLogin}/>
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

export default React.memo(App);
