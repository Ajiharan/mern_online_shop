import React from 'react';
import formik,{useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import {Route,Redirect} from 'react-router-dom';

const Register = (props) => {
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
            .min(8,"password must be atleast 8 characters"),


            conformpassword:yup.string()
            .strict()
            .trim()
            .required("conform password is required")
            .oneOf([yup.ref('password'),null],"password must match")

        }),
        onSubmit:(formData,{setSubmitting})=>{ 
            
            //   axios.post("http://localhost:3000/user/register",formData).then(res=>{
            //     toast.success("Successfully registered!!!", {
            //         position: toast.POSITION.TOP_RIGHT
            //       });
            //       props.history.push('/Login');
            //   }).catch(err=>{
            //   //  console.log(JSON.stringify(err.response.data));
            //     toast.error(err.response.data, {
            //         position: toast.POSITION.TOP_RIGHT
            //       });
            //   }); 
        }
    });
    return (
        <div className="container">
            <div className="container-main-row row">
           
            <div className="main-container">
                <h2 className="text-center">Create Account</h2>
                <form  id="frm" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input {...formik.getFieldProps('name')}  value={formik.values.name} className="form-control" type="text" name="name"/>
                    </div>
                    {
                        (formik.errors.name && formik.touched.name)?(<h6 className={"text-danger"}><i class="fas fa-exclamation"></i>{formik.errors.name} </h6>):(null)
                    }
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input {...formik.getFieldProps('email')}  value={formik.values.email} className="form-control" type="email" name="email"/>
                    </div>
                    {
                        (formik.errors.email && formik.touched.email)?(<h6 className={"text-danger"}><i class="fas fa-exclamation"></i>{formik.errors.email} </h6>):(null)
                    }
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input {...formik.getFieldProps('password')}  value={formik.values.password} className="form-control" type="password" name="password"/>
                    </div>
                    {
                        (formik.errors.password && formik.touched.password)?(<h6 className={"text-danger"}><i class="fas fa-exclamation"></i>{formik.errors.password} </h6>):(null)
                    }
                    <div className="form-group">
                        <label htmlFor="conformpassword">Re-enter password</label>
                        <input {...formik.getFieldProps('conformpassword')}  value={formik.values.conformpassword} className="form-control" type="password" name="conformpassword"/>
                    </div>
                    {
                        (formik.errors.conformpassword && formik.touched.conformpassword)?(<h6 className={"text-danger"}><i class="fas fa-exclamation"></i>{formik.errors.conformpassword} </h6>):(null)
                    }                   
                        <div id="button-group" className="row">   
                            <div>
                             <button type="submit" id="subButton" className="btn  btn-dark  btn1">Create Your Darzk Account</button>               
                            </div>                    
                        </div>
                        <div className="container-privacy">
                           <p class="container-condition"> By creating an account, you agree to Darzk's 
                            <a href="#"> condition of use</a> and  <a href="#"> privacy Policy</a></p>
                        </div>
                 
                        {/* <a href="#" onClick={()=>{window.location.href="Login"}}>
                            Login
                        </a> */}
                
                </form>
            </div>
           
            </div>
        
        </div>
    );
};

export default Register;