import React,{useEffect} from 'react';
import {useLocation,Redirect} from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
const ReviewRating = (props) => {
   
    const location = useLocation();
    
    useEffect(()=>{
        
    },[]);

    const ratingChanged = (newRating) => {
        console.log(newRating)
      }
   
    return (
        <div className="container">
            {
                location.state !==undefined?(
                   <div className="row mt-4">                     
                           <div className="card"> 
                                <div className="card-body"> 
                                    <img style={{width:'300px',height:'300px'}} className='card-img-top' src={location.state.details.imageUrl}/>
                                    <h4 className="text-success text-center">{location.state.details.name} ${location.state.details.price}</h4>                             
                                        <div className="containerStar">
                                            <div>
                                                <ReactStars
                                                    count={5}                                 
                                                    size={28}                                        
                                                    value={location.state.details.Rating}
                                                    edit={false}
                                                    half={true}
                                                    emptyIcon={<i className='far fa-star'></i>}
                                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                                    fullIcon={<i className='fa fa-star'></i>}
                                                    color2={'#ffd700'} />
                                            </div>
                                            <div><h5 style={{marginTop:'12px'}} className="text-primary">Total Rating</h5></div>
                                             
                                        </div>
                                        <div className="UserContainer-rating">
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
                ):(<Redirect to={{
                    pathname:'/'
                }}/>)
            }
          
        </div>
    );
};

export default ReviewRating;