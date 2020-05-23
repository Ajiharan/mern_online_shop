import React,{useEffect,useState} from 'react';
import formik,{useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import {Route,Redirect,useHistory} from 'react-router-dom';
import ManagerPolicy from '../storeManager/policy';

const Register = (props) => {
    let hasToken=JSON.parse(localStorage.getItem('auth'));
    let history = useHistory();
    const [displayEvent,setDisplay]=useState(false);
    useEffect(()=>{
        console.log("useEffect");
       let tname= document.querySelector("#name");
       let temail= document.querySelector("#email");
       let tpass= document.querySelector("#password");
       let ctpass=document.querySelector("#conformpassword");

        if(formik.errors.name && formik.touched.name){
           tname.classList.add("error");
        }else{
            tname.classList.remove("error");
        }

        if(formik.errors.email && formik.touched.email){
            temail.classList.add("error");
         }else{
            temail.classList.remove("error");
         }

         if(formik.errors.password && formik.touched.password){
            tpass.classList.add("error");
         }else{
            tpass.classList.remove("error");
         }

         if(formik.errors.conformpassword && formik.touched.conformpassword){
            ctpass.classList.add("error");
         }else{
            ctpass.classList.remove("error");
         }
    },);
    
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            conformpassword:""
        },
        validationSchema:yup.object({
            name:yup.string()
            .required("Name is Mandatory")
            .strict()
            .trim(),

            email:yup.string()
            .required("Email is Mandatory")
            .email()
            .strict()
            .trim(),
            
            password:yup.string()
            .strict()
            .trim()
            .required("Password is Mandatory")
            .min(6,"password must be atleast 6 characters"),


            conformpassword:yup.string()
            .strict()
            .trim()
            .required("conform password is required")
            .oneOf([yup.ref('password'),null],"password must match")

        }),
        onSubmit:(formData,{setSubmitting})=>{
            let isUser=document.querySelector("#store-manager") .checked;
            
            if(isUser){
                axios.post("http://localhost:3000/admin/manager/register",formData).then(res=>{
                    toast.success("Successfully registered!!!", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                      props.history.push('/user/Login');
                  }).catch(err=>{
                  //  console.log(JSON.stringify(err.response.data));
                    toast.error(err.response.data, {
                        position: toast.POSITION.TOP_RIGHT
                      });
                  }); 
            }else{
                axios.post("http://localhost:3000/user/register",formData).then(res=>{
                    toast.success("Successfully registered!!!", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                      props.history.push('/user/Login');
                  }).catch(err=>{
                  //  console.log(JSON.stringify(err.response.data));
                    toast.error(err.response.data, {
                        position: toast.POSITION.TOP_RIGHT
                      });
                  }); 
            }
            
        }
    });

    const setPolicy=()=>{
       return(
           <div>
               <ManagerPolicy/>
           </div>
       )
    }


    return (
        <div className="container">
                  {
                hasToken===null?(null):(
                    <Redirect
                    to={{
                        pathname:'/'
                    }}
                    />
                )
            }
            <div className="row" id="container-image">
                <div>
                     <img src={require('../images/logo.png')} alt="Smiley face" height="150px;" width="150px;" />
                </div>
               
            </div>
            <div>
                
            </div>
            <div className="container-main-row row">        
                <div className="register-main-container">
                    <h2 className="text-center">Create Account</h2>
                    <form  id="frm" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input {...formik.getFieldProps('name')}  value={formik.values.name} id="name" className="form-control" type="text" name="name"/>
                        </div>
                        {
                            (formik.errors.name && formik.touched.name)?(<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>{formik.errors.name} </h6>):(null)
                        }
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input {...formik.getFieldProps('email')}  value={formik.values.email} id="email" className="form-control" type="email" name="email"/>
                        </div>
                        {
                            (formik.errors.email && formik.touched.email)?(<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>{formik.errors.email} </h6>):(null)
                        }
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input {...formik.getFieldProps('password')}  value={formik.values.password} className="form-control" id="password" type="password" name="password"/>
                        </div>
                        {
                            (formik.errors.password && formik.touched.password)?(<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>{formik.errors.password} </h6>):(null)
                        }
                        <div className="form-group">
                            <label htmlFor="conformpassword">Re-enter password</label>
                            <input {...formik.getFieldProps('conformpassword')}  value={formik.values.conformpassword} className="form-control" id="conformpassword" type="password" name="conformpassword"/>
                        </div>
                        {
                            (formik.errors.conformpassword && formik.touched.conformpassword)?(<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>{formik.errors.conformpassword} </h6>):(null)
                        }

                         <div className="form-group">
                         <label htmlFor="store-manager" data-toggle="modal" data-target="#myModal" className="text-info"> <input id="store-manager" type="checkbox"/>Register As StoreManager</label>
                        </div>                   
                            <div id="button-group" className="row">   
                                <div>
                                <button type="submit" id="subButton" className="btn  btn-dark  btn1">Create Your Darkz Account</button>               
                                </div>                    
                            </div>
                            <div className="container-privacy">
                            
                            <p className="container-condition"> By creating an account, you agree to Darkz's 
                                <a href="#"> condition of use</a> and  <a href="#"> privacy Policy</a></p>
                            </div>
                            <div className="container-login">
                                <p  className="container-condition">Already Have an Account<a href="#" onClick={()=>{history.push({ pathname: '/user/Login'})}}> Sign in </a> </p>
                            </div>               
                    </form>
                </div>
                       
                {setPolicy()}
           
            </div>
        
        </div>
    );
};

export default React.memo(Register);