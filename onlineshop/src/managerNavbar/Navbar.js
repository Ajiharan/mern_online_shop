import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

const Navbar = (props) => {
    const history = useHistory();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav" id="admin-div">
                        <div className="admin-navbar-top">
                            <div>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/" href="#">Home <span className="sr-only">(current)</span></Link>
                                </li>
                            </div>
                            <div>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/manager/AddProduct">Add Product</Link>
                                </li>
                            </div>

                            <div>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/manager/Orders">Orders</Link>
                                </li>
                            </div>
                          
                        </div>
                      
                        <div>
                            <li className="nav-item">
                                <button className="nav-link btn btn-info text-light" onClick={()=>{localStorage.clear(); history.push('/manager/Login');}}>Logout</button>
                            </li>
                        </div>

                    </div>
             </div>
            </nav> 
        </div>
    );
};

export default React.memo(Navbar);
