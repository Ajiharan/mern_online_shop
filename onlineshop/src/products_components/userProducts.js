import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import Axios from 'axios';
import ReactStars from 'react-rating-stars-component'
import { toast } from 'react-toastify';
const UserProducts = (props) => {
    let history = useHistory();

    const CheckAuthentication=(e)=>{
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        if(!hasToken){
            history.push('/user/Login');     
        }else{
            Axios.post('http://localhost:3000/cart/add',{uid:props.UsersData._id,pid:e._id}).then(res=>{
                console.log(res.data);
                props.UpdData();
                toast.success("Added to cart Sucessfully");
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data);
            });
          
        }
    }

    const AddWishList=(e)=>{
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        if(!hasToken){
            history.push('/user/Login');     
        }else{
            Axios.post("http://localhost:3000/wishlist/add",{uid:props.UsersData._id,pid:e._id}).then(res=>{
                console.log(res.data);
                toast.success("Added to wishlist Sucessfully");
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data);
            });
            console.log(props.UsersData);
        }
    }

    const SetRatingPage=(pdata)=>{
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        if(!hasToken){
            history.push('/user/Login');     
        }else{
            history.push({
                pathname: '/user/rating',
                state: { details:pdata,uid:props.UsersData._id } 
            })
        }
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
                            <ReactStars
                                    count={5}                                 
                                    size={24}
                                    value={e.Rating}
                                    edit={false}
                                    half={true}
                                    emptyIcon={<i className='far fa-star'></i>}
                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                    fullIcon={<i className='fa fa-star'></i>}
                                    color2={'#ffd700'} />
                                <p>{e.count} available</p>
                             <h5 className="card-title">{e.name} ${e.price}</h5>
                                <button className="btn btn-primary" onClick={()=>{CheckAuthentication(e)}}>Add to cart</button>
                                
                            </div>
                            <div className="modal-footer">
                                <h6 className="mt-1">View Review</h6>
                            <button onClick={()=>{SetRatingPage(e)}} className="btn btn-link">More</button>
                            </div>
                        </div>
                    ))
                }
            </div>
           
            
        </div>
    );
};

export default UserProducts;