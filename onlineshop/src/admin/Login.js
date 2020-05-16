import React,{useEffect} from 'react';
import formik,{useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import {Route,Redirect} from 'react-router-dom';

const Login = (props) => {
    let hasToken=JSON.parse(localStorage.getItem('auth_admin'));
    useEffect(()=>{
       
        let temail= document.querySelector("#email");
        let tpass= document.querySelector("#password");
       
 
       
 
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
         
     });
     const formik=useFormik({
         initialValues:{
            
             email:"",
             password:""
            
         },
         validationSchema:yup.object({
            
             email:yup.string()
             .required("Email is Mandatory")
             .email()
             .strict()
             .trim(),
             
             password:yup.string()
             .strict()
             .trim()
             .required("Password is Mandatory")
            
         }),
         onSubmit:(formData,{setSubmitting})=>{ 
             
            axios.post("http://localhost:3000/admin/login",formData).then(res=>{
                toast.success("Successfully login!!!", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  localStorage.setItem('auth_admin',JSON.stringify(res.data));
                  props.history.push('/');
              }).catch(err=>{
                toast.error(err.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                  });
              }); 
         }
     });
     return (
         <div className="container">
                       {
                hasToken===null?(null):(
                    <Redirect
                    to={{
                        pathname:'/admin/home'
                    }}
                    />
                )
            }
              <div className="row" id="container-image">
                <div>
                     <img src={require('../images/logo.png')} alt="Smiley face" height="150px;" width="150px;" />
                </div>
               
            </div>
             <div className="container-main-row row">        
                 <div className="login-main-container">
                     <h2 className="text-center">Admin Sign-in </h2>
                     <form  id="frm" onSubmit={formik.handleSubmit}>
                        
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
                                      
                             <div id="button-group" className="row">   
                                 <div>
                                     <button type="submit" id="subButton" className="btn  btn-dark  btn1">Sign in</button>               
                                 </div>                    
                             </div>
                             <div className="container-privacy">
                             <p className="container-condition"> By contuning you agree to Darkz's 
                                 <a href="#"> condition of use</a> and  <a href="#"> privacy Policy</a></p>
                             </div>
                                     
                     </form>
                 </div>
            
             </div>
         
         </div>
     );
};

export default Login;