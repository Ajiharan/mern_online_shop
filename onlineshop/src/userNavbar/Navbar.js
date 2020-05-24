import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
  let currentData=null;
  
const Navbar = (props) => {
 
    const [userData,setUserData]=useState({});
    const[CartCount,setCartCount]=useState(0);
    const history = useHistory();

    useEffect(()=>{
        console.log("FirstData..",props.firstData);
        
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        
        if((JSON.stringify(currentData) !== JSON.stringify(userData)) || (JSON.stringify(props.firstData) !== JSON.stringify(userData))){
            if(hasToken){
                axios.get("http://localhost:3000/user/getUser",{headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}}).then(res=>{ 
                    console.log(res.data);   
                    currentData=res.data;
                   setUserData(res.data);
                   setCartCount(props.cartCountData); 
                  }).catch(err=>{
                    console.log(err);        
                  }); 
            }
            
        }
       
        if( props.updateData !==undefined){
            if(Object.keys(props.updateData).length !==0 ){
                let temData={...userData,...props.updateData};
                if(JSON.stringify(temData) !== JSON.stringify(userData)){
                    console.log("UNavbar data",props.updateData);
                    setUserData({...userData,...props.updateData});
                }
            }
         
        }
    },[props]);

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
                 <div className="nav-item display-4" style={{margin:'5px',fontSize:'20px'}}>
                  <Link to="/user/cart" className="text-light nav-link" > <i className="fas fa-shopping-cart" style={{position:'relative',marginRight:'20px'}}>
                      <span className="text-dark bg-warning text-center" style={{width:'18px',borderRadius:'100px',
                      padding:'1px',position:'absolute',marginTop:'-10px',opacity:'0.8'}}>{props.cartCountData}</span> </i></Link> 
                </div>
                <div className="nav-item" id="profile">
                <div className="dropdown">
                     <a href="#" className="nav-link dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hi {userData.name}</a>
                     <div className="dropdown-menu dropdown-menu-right profile_drop" aria-labelledby="dropdownMenu2">
                        <Link className="dropdown-item" type="button" to="/user/dashboard"><i className="fas fa-user"> </i>  My Account</Link>
                        <Link className="dropdown-item" type="button" to="/user/wishlist"><i className="fas fa-list-alt"> </i>  Wishlist</Link>
                        <Link className="dropdown-item" type="button" to="/order/myOrders"><i className="fab fa-first-order"></i>  Orders</Link>
                        
                    </div>
                </div>
                    
                </div>
                
                <div className="nav-item">
                    <button onClick={()=>{localStorage.clear(); history.push('/user/Login');}} className="btn btn-dark">Logout</button>
                </div>

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
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="u_dropdown">
                        <Link className="dropdown-item" to="/user/Login"><i className="fas fa-sign-in-alt"></i> User login</Link>
                        <Link className="dropdown-item" to="/admin/Login"><i className="fas fa-sign-in-alt"></i> Admin login</Link>
                        <Link className="dropdown-item" to="/manager/Login"><i className="fas fa-sign-in-alt"></i> Store Manager login</Link>

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

export default React.memo(Navbar);
