import React,{useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

const AdminNavbar = () => {
    const history = useHistory();
    useEffect(()=>{
        document.querySelector("#container-dashboard").addEventListener("click",()=>{
            closeNav();
        });
    });

     const openNav=()=> {
        document.getElementById("mySidepanel").style.width = "250px";
      }
      
      const closeNav=()=> {
        document.getElementById("mySidepanel").style.width = "0";
      }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">  <button className="openbtn nav-link" onClick={()=>{openNav()}}>☰</button>  </a>
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
                                    <Link className="nav-link" to="/admin/Categories">Category</Link>
                                </li>
                            </div>
                            <div>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/mail">Mail</Link>
                                </li>
                            </div>
                        </div>
                      
                        <div>
                            <li className="nav-item">
                                <button className="nav-link btn btn-info text-light" onClick={()=>{localStorage.clear(); history.push('/admin/Login');}}>Logout</button>
                            </li>
                        </div>

                    </div>
             </div>
            </nav>
            <div className="container" id="container-dashboard">
                <div id="mySidepanel" className="sidepanel">
                <a href="#" className="closebtn" onClick={()=>{closeNav()}}>×</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contacts</a>
                
                </div>
            </div>
            <div className="container">
                <h2 className="text-center">Admin Dashboard</h2>
            </div>

         </div>
    );
};

export default React.memo(AdminNavbar);
