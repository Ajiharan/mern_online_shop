import React from 'react';
import {formik, useFormik} from 'formik';
import * as yup from 'yup';

const Profile_password = (props) => {
    const formik=useFormik({
        initialValues:{
            oldpassword:"",
            password:"",
            conformpassword:""
        },
        validationSchema:yup.object({
            
            oldpassword:yup.string()
            .strict()
            .trim()
            .required("Password is Mandatory")
            ,
            password:yup.string()
            .strict()
            .trim()
            .required("New Password is Mandatory")
            .min(6,"password must be atleast 6 characters")
            ,

            conformpassword:yup.string()
            .strict()
            .trim()
            .required("conform password is required")
            .oneOf([yup.ref('password'),null],"password must match")

        }),
        onSubmit:(formData,{setSubmitting,resetForm})=>{ 
            let passData={password:formData.oldpassword,newpassword:formData.password}
            document.getElementById("frm1").reset();
            resetForm({});
           props.setData(passData);
           
        }
    });
    return (
        <div className="container card mt-5 pt-1" id="profile-pass-container">
              <h3 className="text-center text-info">Reset Password</h3>
           <form id="frm1" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="oldpassword">Current password</label>
                    <input type="password" {...formik.getFieldProps('oldpassword')}  value={formik.values.oldpassword} 
                    name="oldpassword" className="form-control" placeholder="Enter Your old Password" id="oldpassword"/>
                </div>
                {
                    (formik.errors.oldpassword&& formik.touched.oldpassword)?(<div className={"alert alert-danger mt-4 pt-1"}>{formik.errors.oldpassword} </div>):(null)
                }
                <div className="form-group">
                    <label htmlFor="password">New password</label>
                    <input type="password" {...formik.getFieldProps('password')}  value={formik.values.password}
                     className="form-control" placeholder="Enter Your New Password" id="password" name="password"/>
                </div>
                {
                    (formik.errors.password&& formik.touched.password)?(<div className={"alert alert-danger mt-4 pt-1"}>{formik.errors.password} </div>):(null)
                }
                <div className="form-group">
                    <label htmlFor="conformpassword">Conform password</label>
                    <input type="password" {...formik.getFieldProps('conformpassword')} className="form-control"  value={formik.values.conformpassword}
                    placeholder="Enter  conform Password" id="conformpassword" name="conformpassword"/>
                </div>
                {
                    (formik.errors.conformpassword&& formik.touched.conformpassword)?(<div className={"alert alert-danger mt-4 pt-1"}>{formik.errors.conformpassword} </div>):(null)
                }
                <button type="submit" className="btn btn-info text-light">Update Password</button>
           </form>
        </div>
    );
};

export default React.memo(Profile_password);