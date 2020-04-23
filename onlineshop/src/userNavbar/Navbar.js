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
                        <Link className="nav-link" to="/Login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Register">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;