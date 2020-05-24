import React,{useEffect,useState,useRef,useCallback,useMemo} from 'react';
import Register from './user/Register';
import Login from './user/login';
import Home from './user/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import PageNotFound from './errors/PageNotFound.js';
import Navbar from './userNavbar/Navbar';
import UserProtected from './user/UserProtected';
import AdminProtected from './admin/AdminProtected';
import UserDashboard from './user/Dashboard';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AdminHome from './admin/Home';
import AdminLogin from './admin/Login';
import CartHome from './cart-components/CartHome';
import Categories from "./admin/Categories";
import AdminMail from "./admin/MailActivity";
import StoreManagerNavbar from "./managerNavbar/Navbar";
import ManagerProtected from "./storeManager/StoreManagerProtected";
import ManagerHome from "./storeManager/Home";
import ManagerLogin from "./storeManager/Login";
import Product from "./storeManager/Product";
import ViewOrders from "./storeManager/ViewOrders";
import UserRating from "./userReview/ReviewRating"
import Wishlist from "./wishlist/home";
import Payment from "./orders/Payment";
import UserOrder from "./orders/OrderDetails";
import axios from 'axios';

export const UserUpdateContext=React.createContext();
export const UserCartContext=React.createContext();


function App(props) {

 const [mydata,setData]=useState({});
 const[userData,setUserData]=useState({});
 const[cartCount,setCartCount]=useState(0);

  let myref=useRef({});
  let UserNavigation="";

  useEffect(()=>{
    FetchDatas();
  },[props]);

  const FetchDatas=()=>{
    axios.get("http://localhost:3000/user/getUser",{headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}}).then(res=>{ 
      axios.get(`http://localhost:3000/cart/total/${res.data._id}`).then(Count_res=>{       
         //console.log("Count Data",Count_res.data.length);
         myref.current=res.data;
         let tempCurrent=0;
         if(Count_res.data.length > 0){
           console.log("Count_res.length",Count_res.data.length);
          tempCurrent=Count_res.data[0].TotalCount;
         }
         setCartCount(tempCurrent);
         setUserData(res.data);
         console.log("App Data",res.data);
       });
      
     });
  }


  const UpdateUi=useCallback((udata)=>{
    console.log("Udata",udata)
    setData(udata);
  },[])

  const UpdateCount=()=>{
   
      axios.get(`http://localhost:3000/cart/total/${myref.current._id}`).then(Count_res=>{       
       //  console.log("Count Data",Count_res.data[0].TotalCount);
      
         let tempCurrent=0;
         if(Count_res.data.length > 0){
           console.log("Count_res.length",Count_res.data.length);
          tempCurrent=Count_res.data[0].TotalCount;
         }
         setCartCount(tempCurrent);   
         
       });
      console.log("Worked")
    
  }
  

  if(props.uToken){
    UserNavigation=<div className="App">
  
      <Navbar  cartCountData={cartCount} firstData={userData} updateData={mydata}/>
    
    <Switch>
      <Route exact path="/" render={(props)=><Home {...props} UpdateData={UpdateCount}  Udata={userData}/>}/>
      <Route exact path="/user/Register" component={Register}/>
      <Route exact path="/user/Login" component={Login}/>
      <Route exact path="/user/cart" render={(props)=><CartHome {...props} UpdateData={UpdateCount} CartData={userData}/>} />  
      <Route exact path="/user/wishlist"  render={(props)=><Wishlist {...props} UpdateData={UpdateCount} sendData={userData}/>}/>
      <UserProtected exact path="/user/payment" component={Payment}/>
      <UserProtected  exact path="/user/rating" component={UserRating}/> 
     <UserProtected exact path ="/order/myOrders" component={UserOrder}/>
     
      <UserUpdateContext.Provider value={UpdateUi} >
       <UserProtected  exact path="/user/dashboard" component={UserDashboard}/>    
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
          <ManagerProtected exact path="/manager/Orders" component={ViewOrders}/>
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
