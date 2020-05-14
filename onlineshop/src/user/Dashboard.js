import React,{useState,useEffect} from 'react';
import Profile_configuration from '../user-profile-components/Profile_configuration';
import Profile_password_confg from '../user-profile-components/profile_password';
import axios from 'axios';
import { toast } from 'react-toastify';

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
            toast.success("Sucessfully Updated");
            setUserData(...userData,...res.data);
        }).catch(err=>{
            console.log(err);
        })
      
    }

    const setPassword=(data)=>{
        let myData={...data,email:userData.email};
        axios.post("http://localhost:3000/user/resetPassword",myData).then(res=>{
            toast.success("Password Sucessfully Updated");
            
        }).catch(err=>{
            toast.error(err.response.data);
        })
    }

    const setUserName=(data)=>{
        // console.log(data);
        axios.put("http://localhost:3000/user/updateUser",data).then(res=>{
            console.log("Update Result",res);
            toast.success("Sucessfully Updated");
            setUserData(...userData,...res.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_configuration setData={SetProfile} sendData={userData} sendUdata={setUserName}/>
                </div>
                <div className="col-md-5 col-xs-12 col-sm-12 col-lg-6">
                    <Profile_password_confg setData={setPassword}/>
                </div>
            </div>
          
        </div>
    );
};

export default Dashboard;