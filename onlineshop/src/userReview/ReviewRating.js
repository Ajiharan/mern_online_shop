import React,{useEffect, useState,Fragment} from 'react';
import {useLocation,Redirect} from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewList from './ReviewList';
const ReviewRating = (props) => {
   const[productRating,setRating]=useState(0);
   const[userCount,setUserCount]=useState(0);
   const[CurrentuserRate,setCurrentUserRate]=useState(0);
   const[isTrue,setVerify]=useState(true);
   const[userComment,setComment]=useState("");
   const[userId,setUserId]=useState(0);
   const[isEdit,setEdit]=useState(false);
    const location = useLocation();
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/rating/getAverage/${location.state.details._id}`).then(res=>{
            setRating(res.data[0].totalAverage);
            setUserCount(res.data[0].count);
        }).catch(err=>{
            console.log(err);
        });
        axios.get('http://localhost:3000/rating/getUserRate',{params:{pid:location.state.details._id,uid:location.state.uid}})
        .then(urest=>{
           
            if(urest.data.rating > 0){
                setVerify(false);
            }
             console.log("Ures",urest.data.rating)
            setCurrentUserRate(urest.data.rating);
            setUserId(urest.data._id);
           
        }).catch(err=>{
            console.log(err);
        });
        
    },[]);

    const ratingChanged = (newRating) => {
        console.log("UserId",userId);
        if(userId===0){
            axios.post('http://localhost:3000/rating/add',{uid:location.state.uid,pid:location.state.details._id,rating:newRating})
            .then(result=>{
                axios.get(`http://localhost:3000/rating/getAverage/${location.state.details._id}`).then(res=>{
                    axios.put('http://localhost:3000/product/updateRate',{id:location.state.details._id,rating:res.data[0].totalAverage}).then(ures=>{                    
                            setRating(res.data[0].totalAverage);
                            setUserCount(res.data[0].count);                    
                             UpdateUi(); 
                            toast.success(result.data);                            
                    }).catch(err=>{
                        console.log(err);
                    });
                   
                  }).catch(err=>{
                      console.log(err);
                });             
            }).catch(err=>{
                toast.error(err.response.data);      
            });
        }else{
            axios.put('http://localhost:3000/rating/updateRate',{id:userId,rating:newRating})
            .then(result=>{
                axios.get(`http://localhost:3000/rating/getAverage/${location.state.details._id}`).then(res=>{
                    axios.put('http://localhost:3000/product/updateRate',{id:location.state.details._id,rating:res.data[0].totalAverage}).then(ures=>{                    
                            setRating(res.data[0].totalAverage);
                            setUserCount(res.data[0].count);                          
                             UpdateUi(); 
                            toast.success(result.data);                            
                    }).catch(err=>{
                        console.log(err);
                    });
                   
                  }).catch(err=>{
                      console.log(err);
                });             
            }).catch(err=>{
                toast.error(err.response.data);      
            });
        }
       

        UpdateUi();
    }

    const UpdateUi=()=>{
        axios.get('http://localhost:3000/rating/getUserRate',{params:{pid:location.state.details._id,uid:location.state.uid}})
        .then(urest=>{
                console.log("urest.data.Id",urest.data);
                if(urest.data.rating > 0){
                    setVerify(false);
                }
                setCurrentUserRate(urest.data.rating);
                setUserId(urest.data._id);
               
        }).catch(err=>{
            console.log(err);
        });
    }
    const InfoChange=(event)=>{
        setComment(event.target.value);
    }

    const UpdateComment=async (e)=>{
        e.preventDefault();
        if(isEdit){
            await axios.put('http://localhost:3000/rating/editComment',{id:userId,comment:userComment}).then(res=>{
                toast.success(res.data);
                
            }).catch(err=>{
                toast.error(err.response.data);
            })
        }else{
            if(CurrentuserRate > 0){
                await axios.put('http://localhost:3000/rating/updateComment',{id:userId,comment:userComment}).then(res=>{
                     toast.success(res.data);
                 }).catch(err=>{
                     toast.error(err.response.data);
                 })
             }else{
                await axios.post('http://localhost:3000/rating/addComment',
                 {uid:location.state.uid,pid:location.state.details._id,comment:userComment}).then(res=>{
                     toast.success(res.data);
                 }).catch(err=>{
                     toast.error(err.response.data);
                 })
                 
             }
        }
       
       await UpdateUi();
       setComment("");
       setEdit(false);
        document.getElementById("frm").reset();
        
    }

    const UpdateReview=(comment)=>{
            setEdit(!isEdit)
            setComment(comment);
    }

    const DeleteComment=(id)=>{
        axios.delete(`http://localhost:3000/rating/delete/${id}`).then(async res=>{
            toast.success(res.data);
            setVerify(true);
            setCurrentUserRate(0);
            await UpdateUi();
            setComment("");
            setUserId(0);
        }).catch(err=>{
            console.log(err);
        })      
    }
   
    return (
        <div className="container">
            {
                location.state !==undefined?(
                  <Fragment>       
                    <div className="row reviewContainer mt-4">
                                             
                           <div className="card"> 
                                <div className="card-body"> 
                                    <img style={{width:'300px',height:'300px'}} className='card-img-top' src={location.state.details.imageUrl}/>
                                    <h4 className="text-success text-center">{location.state.details.name} ${location.state.details.price}</h4>                             
                                        <div className="containerStar">
                                        <div><h5 style={{marginTop:'12px'}} className="text-primary">({userCount})</h5></div>
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
                                            <div><h5 style={{marginTop:'12px'}} className="text-primary">({productRating}/5)</h5></div>
                                             
                                        </div>
                                       
                                                
                                </div>
                            </div>
                           
                       
                   </div>
                   <div className="row reviewContainer mt-4">
                        <div className="col col-2  mt-4"></div>     
                        <div className="col col-8  mt-4">                                                                                                        
                            <ReactStars
                                count={5}                                 
                                size={28}
                                edit={isTrue}                                        
                                value={CurrentuserRate}
                                onChange={ratingChanged}
                                half={true}
                                emptyIcon={<i className='far fa-star'></i>}
                                halfIcon={<i className='fa fa-star-half-alt'></i>}
                                fullIcon={<i className='fa fa-star'></i>}
                                color2={'#ffd700'} /> 
                            <form id="frm" style={{marginBottom:'40px'}} onSubmit={UpdateComment}>
                                <div className="form-group">
                                    <label htmlFor="txtComment">Comment</label>
                                    <textarea value={userComment} onChange={InfoChange} name="txtComment" placeholder="Add your Comment" rows={3} id="txtComment" className="form-control" required/>
                                </div>
                                {
                                    isEdit?(<input type="submit" className="btn btn-warning" value="Update"/>)
                                    :(<input type="submit" className="btn btn-success" value="Add"/>)
                                }
                                
                            </form> 
                        </div>
                        <div className="col col-2  mt-4"></div>   
                   </div>
                   <div className="row">
                       <ReviewList upd={UpdateReview} Del={DeleteComment} CommentData={userComment} StarRating={CurrentuserRate} AllData={location.state}/>
                       
                    </div>
                   </Fragment>
                ):(<Redirect to={{
                    pathname:'/'
                }}/>)
            }
          
        </div>
    );
};

export default React.memo(ReviewRating);