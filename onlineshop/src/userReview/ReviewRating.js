import React,{useEffect, useState,Fragment} from 'react';
import {useLocation,Redirect} from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import axios from 'axios';
import { toast } from 'react-toastify';
const ReviewRating = (props) => {
   const[productRating,setRating]=useState(0);
   const[userCount,setUserCount]=useState(0);
    const location = useLocation();
    
    useEffect(()=>{
      axios.get(`http://localhost:3000/rating/getAverage/${location.state.details._id}`).then(res=>{
        setRating(res.data[0].totalAverage);
        setUserCount(res.data[0].count);
      }).catch(err=>{
          console.log(err);
      })
        console.log(location.state.details);
    },[]);

    const ratingChanged = (newRating) => {
        // console.log(newRating)
        axios.post('http://localhost:3000/rating/add',{uid:location.state.uid,pid:location.state.details._id,rating:newRating})
        .then(result=>{
            axios.get(`http://localhost:3000/rating/getAverage/${location.state.details._id}`).then(res=>{
                axios.put('http://localhost:3000/product/updateRate',{id:location.state.details._id,rating:res.data[0].totalAverage}).then(ures=>{
                    setRating(res.data[0].totalAverage);
                    setUserCount(res.data[0].count);
                    toast.success(result.data);
                }).catch(err=>{

                })
               
              }).catch(err=>{
                  console.log(err);
            })
            
        }).catch(err=>{
            toast.error(err.response.data);
        });
      
    }
   
    return (
        <div className="container">
            {
                location.state !==undefined?(
                  <Fragment>
                    <div className="row">
                         <div className="rate-list-container mt-4">
                                <div className="store-list">     
                                        <div className="UserContainer-rating mt-4">
                                            <ReactStars
                                                    count={5}                                 
                                                    size={28}                                        
                                                    value={location.state.details.Rating}
                                                     onChange={ratingChanged}
                                                    half={true}
                                                    emptyIcon={<i className='far fa-star'></i>}
                                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                                    fullIcon={<i className='fa fa-star'></i>}
                                                    color2={'#ffd700'} />
                                        </div>
                                </div>
                           </div>  
                    </div>
               
                    <div className="row reviewContainer mt-4">
                                             
                           <div className="card"> 
                                <div className="card-body"> 
                                    <img style={{width:'300px',height:'300px'}} className='card-img-top' src={location.state.details.imageUrl}/>
                                    <h4 className="text-success text-center">{location.state.details.name} ${location.state.details.price}</h4>                             
                                        <div className="containerStar">
                                            <div>
                                                <ReactStars
                                                    count={5}                                 
                                                    size={28}                                        
                                                    value={productRating}
                                                    edit={false}
                                                    half={true}
                                                    emptyIcon={<i className='far fa-star'></i>}
                                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                                    fullIcon={<i className='fa fa-star'></i>}
                                                    color2={'#ffd700'} />
                                            </div>
                                            <div><h5 style={{marginTop:'12px'}} className="text-primary">({userCount})</h5></div>
                                             
                                        </div>
                                       
                                                
                                </div>
                            </div>
                           
                       
                   </div>
                   </Fragment>
                ):(<Redirect to={{
                    pathname:'/'
                }}/>)
            }
          
        </div>
    );
};

export default ReviewRating;