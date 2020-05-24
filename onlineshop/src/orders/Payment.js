import React,{Fragment,useEffect} from 'react';
import formik,{useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import {useLocation,Redirect,useHistory} from "react-router-dom";
import { toast } from 'react-toastify';

const Payment = (props) => {
    const location = useLocation();
   const history=useHistory();

    useEffect(()=>{
        console.log("Location",location.state);
    },[]);

    const formik=useFormik({
        initialValues:{
           // uid:location.state.uid,
            // total:location.state.total,
            cardOwner:"",
            cardNumber:"",
            expiryMonth:"",
            expiryYear:"",
            cvv:""
        },
        validationSchema:yup.object({
            
           cardOwner:yup.string().required("Name is required.."),
           cardNumber:yup.string().required("Card Number is required..").min(16,"Invalid card Number"),
           expiryMonth:yup.number().required("Month is Required.."),
           expiryYear:yup.number().required("Year is Required"),
           cvv:yup.number().required("cvv is Required").min(3,"Invalid Number")       
           
        }),

        onSubmit:(formData,{setSubmitting,resetForm})=> {
            //console.log("FormData",formData);
            axios.post("http://localhost:3000/payment/add", {...formData,uid:location.state.uid,total:location.state.total})
            .then(async res => {
                resetForm({})
               
                await UpdateOrder();
               
            }).catch(err => {
                console.log(err)
            });
        }
    });

    const UpdateOrder=()=>{
        axios.put(`http://localhost:3000/order/update/${location.state.oid}`).then(res=>{
            console.log(res.data);
            toast.success("Successfully paid!!!");
            history.push({
                pathname: '/'
            });
        }).catch(err=>{
            console.log(err);
        })
    }

    const PayByCash=()=>{
        axios.post("http://localhost:3000/payment/add", {uid:location.state.uid,total:location.state.total})
        .then(async res => {
           
            await UpdateOrder();
        }).catch(err => {
            console.log(err)
        });
    }


    return (
        <Fragment>
            {(JSON.stringify(location.state) ===undefined)?(<Redirect  to={{
                        pathname:'/user/cart'
                    }} />):(



                   
                <div className="container">
                    <div className="row">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-warning" id="exampleModalLabel">Credit card/Debit card </h5>
                                
                                </div>
                                <div className="modal-body">
                                    <form id="frm" onSubmit={formik.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="username">
                                                <h6>Card Owner</h6>
                                            </label>
                                            <input type="text" name="cardOwner" id="cardOwner" placeholder="Card Owner Name"
                                            className="form-control" {...formik.getFieldProps('cardOwner')}  value={formik.values.cardOwner}/>

                                        </div>
                                        {
                                        (formik.errors.cardOwner && formik.touched.cardOwner)?
                                        (<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>{formik.errors.cardOwner} </h6>):(null)
                                        }
                                        <div className="form-group">
                                            <label htmlFor="cardNumber">
                                                <h6>Card number</h6>
                                            </label>
                                            <div className="input-group">
                                                <input type="text" name="cardNumber" id="cardNumber" placeholder="Valid card number" className="form-control" {...formik.getFieldProps('cardNumber')}  value={formik.values.cardNumber} />

                                                <div className="input-group-append">
                                                            <span className="input-group-text text-muted">
                                                                <i className="fab fa-cc-visa mx-1"></i>
                                                                <i className="fab fa-cc-mastercard mx-1"></i>
                                                                <i className="fab fa-cc-amex mx-1"></i>
                                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            (formik.errors.cardNumber && formik.touched.cardNumber)?
                                            (<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>
                                            {formik.errors.cardNumber} </h6>):(null)
                                        }
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <div className="form-group">
                                                    <label>
                                                        <span className="hidden-xs">
                                                            <h6>Expiration Date</h6>
                                                        </span>
                                                    </label>
                                                    <div className="input-group">
                                                        <input type="number" placeholder="MM" name="expiryMonth" id="expiryMonth" className="form-control" {...formik.getFieldProps('expiryMonth')}  value={formik.values.expiryMonth}/>

                                                        <input type="number" placeholder="YY" name="expiryYear" id="expiryYear" className="form-control" {...formik.getFieldProps('expiryYear')}  value={formik.values.expiryYear}/>

                                                    </div>
                                                </div>
                                                    {
                                                        (formik.errors.expiryMonth && formik.touched.expiryMonth)?
                                                        (<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>
                                                        {formik.errors.expiryMonth} </h6>):(null)
                                                    }
                                                    {
                                                        (formik.errors.expiryYear && formik.touched.expiryYear)?
                                                        (<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>
                                                        {formik.errors.expiryYear} </h6>):(null)
                                                    }
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group mb-4">
                                                    <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                        <h6>CVV <i className="fa fa-question-circle d-inline"></i></h6>
                                                    </label>

                                                    <input type="text" name="cvv" id="cvv" className="form-control" {...formik.getFieldProps('cvv')}  value={formik.values.cvv}/>

                                                </div>
                                                {
                                                        (formik.errors.cvv && formik.touched.cvv)?
                                                        (<h6 className={"text-danger"}><i className="fas fa-exclamation"></i>
                                                        {formik.errors.cvv} </h6>):(null)
                                                    }
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="subscribe btn btn-primary btn-block shadow-sm">Confirm Payment</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <h5 className="text-center text-danger">Or</h5>
                            <button  onClick={PayByCash} className="btn btn-outline-dark">Cash on Delivery</button>
                        </div>
                           
                    </div>
                </div>
                 )}
        </Fragment>
    );
};

export default Payment;