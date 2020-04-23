import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
const Navbar = () => {
    const history = useHistory();
    let hasToken=JSON.parse(localStorage.getItem('auth'));
    let protectedViews="";
    let publicViews="";
    if(hasToken !==null){
        protectedViews=  
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="navbar-nav" id="div1">
                <div className="nav-item active">
                    <Link to="/" className="nav-link">Home <span class="sr-only">(current)</span></Link>
                </div>             
            
            </div>
            <div className="protect navbar-nav">

                <div className="nav-item" id="profile">
                    <Link className="nav-link" to="/user/dashboard">profile</Link>
                </div>
                <div className="nav-item">
                    <button onClick={()=>{localStorage.clear(); history.push('/user/Login');}} className="btn btn-dark">Logout</button>
                </div>;

            </div>
        </div>;
        publicViews=null;
    }else{
        publicViews=  
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="navbar-nav" id="div1">
                <div className="nav-item active">
                    <Link to="/" className="nav-link">Home <span class="sr-only">(current)</span></Link>
                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/user/Register">Register</Link>
                </div>
            
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/user/Login">User-login</Link>
                        <Link className="dropdown-item" to="/user/Login">Admin-login</Link>
                
                    </div>
                </div>
            
            </div>
           
        </div>;
        protectedViews=null;
    }
   
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark" id="top-nav">
            <div className="nav-logo">
                <div>
                 <Link className="navbar-brand" href="#"><img src={require('../images/logo_transparent.png')} alt="Smiley face" height="60px;" width="60px;" /></Link>
                </div>
            </div>
           {publicViews}
           {protectedViews}      
         </div>
    );
};

export default Navbar;