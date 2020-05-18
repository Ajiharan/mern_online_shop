import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import Axios from 'axios';
import { toast } from 'react-toastify';
const UserProducts = (props) => {
    const history = useHistory();
    const CheckAuthentication=()=>{
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        if(!hasToken){
            history.push('/user/Login');     
        }
    }

    const AddWishList=(e)=>{
        Axios.post("http://localhost:3000/wishlist/add",{uid:props.UsersData._id,pid:e._id}).then(res=>{
            console.log(res.data);
            toast.success("Added to wishlist Sucessfully");
        }).catch(err=>{
            console.log(err);
        })

        console.log(props.UsersData);

    }

    return (
        <div className="container mt-4" >
            <div className="row" id="product_doc">
                {
                    props.ProductData.map((e,i)=>(
                        <div className="card my-card" key={i}>
                            <i className="far fa-heart" onClick={()=>{AddWishList(e)}} style={{cursor:'pointer'}}></i>
                            <img style={{width:'200px',height:'200px'}} className='card-img-top' src={e.imageUrl}/>
                            <div className="card-body">
                                <p>{e.count} available</p>
                             <h5 className="card-title">{e.name} ${e.price}</h5>

                                <button className="btn btn-primary" onClick={CheckAuthentication}>Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
           
            
        </div>
    );
};

export default UserProducts;