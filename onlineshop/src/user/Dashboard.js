import React,{useState,useEffect} from 'react';
import Profile_configuration from '../user-profile-components/Profile_configuration';
import Profile_password_confg from '../user-profile-components/profile_password';
import axios from 'axios';
let currentUserData=null;
const Dashboard = () => {
    const [userData,setUserData]=useState({});

    useEffect(()=>{
        axios.get("http://localhost:3000/user/getUser",{headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}}).then(res=>{ 
            currentUserData=res.data;
            if(JSON.stringify(currentUserData) !==JSON.stringify(userData)){
              
                setUserData(currentUserData);
            }
        });
        console.log("UserData",userData);
        
    });

   const SetProfile=(data)=>{
        axios.put("http://localhost:3000/user/update",data).then(res=>{
            console.log("Update Result",res);
            setUserData(res.data);
        }).catch(err=>{
            console.log(err);
        })
      
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_configuration setData={SetProfile} sendData={userData}/>
                </div>
                <div className="col-md-5 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_password_confg/>
                </div>
            </div>
          
        </div>
    );
};

export default Dashboard;