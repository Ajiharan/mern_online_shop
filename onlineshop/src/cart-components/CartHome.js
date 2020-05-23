import React,{Fragment,useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {UserCartContext} from '../App';
import {useFormik} from "formik";
import {toast} from "react-toastify";

const CartHome = (props) => {
    const[cardlist,setCart]=useState([]);
    const[tempCount,setCount]=useState(1); 
    const[totalPrice,setPrice]=useState(0);
    const myref=useRef([]);

    useEffect(()=>{
        setCart(props.CartData);
        console.log("Props.CartData",props.CartData);
        SetDatas();
    },[props.CartData,props.updateData]);

    const SetDatas=()=>{
        if(props.CartData._id !==undefined){
            axios.get(`http://localhost:3000/cart/view/${props.CartData._id}`).then(res=>{
                myref.current=res.data;
                let tot=res.data.reduce((acc,e)=>acc+(e.count > 3 ? (e.count*e.cartDetails[0].price - (e.count-3)*e.cartDetails[0].price/10)  :  (e.count*e.cartDetails[0].price)),0)
                setCart(res.data);
                setPrice(tot);
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const DeleteFromcart=(id)=>{
        axios.delete(`http://localhost:3000/cart/delete/${id}`).then(res=>{
            SetDatas();          
        }).catch(err=>{
            console.log(err);
        })     
        props.UpdateData();   
    }


    const InfoChange=(event,id)=>{
        axios.put("http://localhost:3000/cart/update",{id:id,count:event.target.value}).then(res=>{         
           SetDatas();
          props.UpdateData();
        }).catch(err=>{
            console.log(err);
        })

    }

    return (
        <div className="container mt-4 pt-1 wishlist-container"> 
        { cardlist.length > 0?(
            <Fragment>
            <h4 className="text-center bg-danger text-light" style={{opacity:'0.8'}}>My Cart</h4>
            <div className="row">
                <div className="col text-center">
                <button type="submit" className="btn btn-warning text-white" data-toggle="modal" data-target="#exampleModal">Proceed to CheckOut</button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Billing details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {
                                        cardlist.map((e,i)=>(
                                            (e!==null)?(

                                                e.count > 3 ? (
                                                    <div className="row mt-4" key={i}>
                                                        <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop:'25px'}}>
                                                            <h6 className="card-title">Product : {e.cartDetails[0].name} </h6>
                                                            <h6 className="card-title" style={{color:'green'}}>Discount : ${e.cartDetails[0].price/10 * (e.count -3)} </h6>
                                                            <h6 className="card-title">Amount : ${e.cartDetails[0].price} x {e.count} - ${e.cartDetails[0].price/10 * (e.count -3)}  </h6>
                                                        </div>

                                                    </div>
                                                    )
                                                    :

                                                    (
                                                        <div className="row mt-4" key={i}>
                                                            <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop:'25px'}}>
                                                                <h6 className="card-title">Product : {e.cartDetails[0].name} </h6>
                                                                <h6 className="card-title" style ={{color : 'red'}}>No discount</h6>
                                                                <h6 className="card-title">Amount: ${e.cartDetails[0].price} x {e.count} </h6>
                                                            </div>

                                                        </div>
                                                    )

                                            ):(null)
                                        ))
                                    }
                                    <div>
                                        <h5>Total Amount : ${totalPrice}</h5>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">Make an order</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="store-list-container mt-4">
                <div className="store-list">     
                    {
                        cardlist.map((e,i)=>(
                            (e!==null)?(
                            <div className="row mt-4" key={i}>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                        <img  className='card-img-top' src={e.cartDetails[0].imageUrl}/>               
            
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop:'25px'}}>
                                    <p>{e.cartDetails[0].count} available</p>
                                    <h5 className="card-title">{e.cartDetails[0].name} ${e.cartDetails[0].price}</h5>
                                   
                                    <button onClick={()=>{DeleteFromcart(e._id)}} className="btn btn-danger mt-4">Remove Item</button>
                                    
                                        <div className="form-group mt-4">
                                            <input min="1" defaultValue={e.count} type="number" onChange={(event)=>{InfoChange(event,e._id)}} className="form-control"/>
                                           
                                        </div>                                     
                                    
                                </div>
                                
                            </div>):(null)                   
                        ))
                    }
                </div>
            </div>
            </Fragment>):(<h4 className="text-center bg-danger text-light" style={{opacity:'0.8'}}>No items are Added in list</h4>)
            }

            
        </div>

    );
};

export default React.memo(CartHome);
