import React,{useState,useEffect,useContext} from 'react';
import firebase from '../firebase/index'
import { toast } from 'react-toastify';
import ProgressBar from '../progressBar/Progress';
import {UserUpdateContext} from '../App';
const Profile_configuration = (props) => {

    const [files,setFile]=useState('');
    const[progress,setProgress]=useState(0);
    const[url,setUrl]=useState('');
    const [userData,setUserData]=useState(null);
    const puser=useContext(UserUpdateContext);
   
    const Changed=(event)=>{
        console.log(event.target.files[0]);
        let output=document.querySelector("#img_profiles");
        setFile(event.target.files);
         
        if(event.target.files[0] !==undefined){
            output.src=URL.createObjectURL(event.target.files[0]);
            output.onload=function(){
                URL.revokeObjectURL(output.src);
            }
        }
        
    }

    useEffect(()=>{
        if(JSON.stringify(props.sendData) !==JSON.stringify(userData)){
           
            setUserData(props.sendData);
            console.log("Profile Conf",props.sendData);
        }
      
        if(userData){
            
            document.querySelector("#name").value=userData.name;
            document.querySelector("#email").value=userData.email;
        }
    },[props.sendData,userData]);

    const Upload_profile=()=>{
        let bucketName='images';
        let file=files[0];
        if(file){
            let storageRef=firebase.storage().ref(`${bucketName}/${file.name}`);
            let uploadTask=storageRef.put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
               
               
            },(err)=>{
                console.log(err);
            },()=>{
                let storageRef=firebase.storage();
                storageRef.ref('images').child(files[0].name).getDownloadURL().then(url => {
                    console.log(url);
                    setProgress(progress);
                    setUrl(url);
                    let mydata={email:userData.email,imageUrl:url,name:userData.name};
                     props.setData(mydata);         
                });
               
            });
        }else{
            toast.warn("Please Upload your profile");
        }
        
    }
   
    const FormSubmit =(event)=>{
        event.preventDefault();
        let uname=document.querySelector("#name").value;
        if(!uname){
           
            toast.error("UserName is Mandatory");
 
        }else{
            props.sendUdata({name:uname,email:userData.email});
            puser({name:uname,email:userData.email});
        }
    }
    
    return (
        <div className="container card mt-5 pt-2" id="profile-user-container">
            <h3 className="text-center text-info">My Profile</h3>
            <div className="my_image">
              
              
                    <img src={props.sendData.imageUrl} id="img_profiles"
                    style={{widht:'200px',height:'200px',margin:'15px'}} className="img-thumbnail" alt="Cinque Terre"/>
                
                
            </div>
            <div className="my_image mb-3" id="prf_button" >
               <ProgressBar percentage={progress}/>
            </div>
            <div className="custom-file mb-3 my_image">
                <label htmlFor="upload" id="file-upload" 
                style={{padding:'5px',borderRadius:'10px',cursor:'pointer'}}  className="bg-info text-light">
                    <span ><i className="fas fa-upload"></i></span>
                    <input type="file" onChange={Changed} id="upload" style={{display:"none"}} />
                </label>
            </div>

            <div className="my_image" id="prf_button">
                <input type="button" className="btn btn-info" onClick={Upload_profile}  value="update profile"/>
            </div>
            <form id="frm" onSubmit={FormSubmit}>
               
                <div className="form-group">
                     <label htmlFor="name">User Name</label>
                     <input   id="name" className="form-control" type="text" name="name"/>
                 </div>
                

               <div className="form-group">
                     <label htmlFor="email">Email</label>
                      <input id="email" className="form-control" type="email" name="email" disabled/>
               </div>
                
               
               <button type="submit"  className="btn btn-info">Save changes</button> 
            </form>
        </div>
    );
};

export default React.memo(Profile_configuration);