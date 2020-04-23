import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container collapse navbar-collapse">
                <Link className="navbar-brand" to="/"><img src={require('../images/logo_transparent.png')} alt="Smiley face" height="50px;" width="50px;" /></Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/Register">Register</Link>
                    </li>
                    
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                           <Link className="dropdown-item" to="/user/Login" href="#">User-login</Link>
                           <Link className="dropdown-item" to="/user/Login" href="#">Admin-login</Link>
                           
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;