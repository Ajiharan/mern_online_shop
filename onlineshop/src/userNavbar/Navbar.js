import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
const Navbar = () => {
 
    const [userData,setUserData]=useState({});
    const history = useHistory();

    useEffect(()=>{
        axios.get("http://localhost:3000/user/getUser",{headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}}).then(res=>{ 
            console.log(res.data);   
           setUserData(res.data);
                
          }).catch(err=>{
            console.log(err);        
          }); 
    },[]);

    let hasToken=JSON.parse(localStorage.getItem('auth'));
    let protectedViews="";
    let publicViews="";
    if(hasToken !==null){
        protectedViews=  
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="navbar-nav" id="div1">
                <div className="nav-item active">
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </div>             
            
            </div>
            <div className="protect navbar-nav">

                <div className="nav-item" id="profile">
                     <Link className="nav-link" to="/user/dashboard">Hi {userData.name}</Link>
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
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
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
                        <Link className="dropdown-item" to="/admin/Login">Admin-login</Link>
                
                    </div>
                </div>
            
            </div>
           
        </div>;
        protectedViews=null;
    }
   
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-info" id="top-nav">
            <div className="nav-logo">
                <div>
                 <a className="navbar-brand" href="#"><img src={require('../images/logo_transparent.png')} alt="Smiley face" height="60px;" width="60px;" /></a>
                </div>
            </div>
           {publicViews}
           {protectedViews}      
         </div>
    );
};

export default Navbar;