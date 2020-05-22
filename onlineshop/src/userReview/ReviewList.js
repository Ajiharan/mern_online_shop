import React,{Fragment,useEffect,useState} from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component'
const ReviewList = (props) => {

    const [reviewData,setReviewData]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3000/rating/ProductData/${props.AllData.details._id}`).then(res=>{
            console.log("Myres",res.data);
            setReviewData(res.data);
        }).catch(err=>{
            console.log(err);
        })

    },[props]);

    return (
        <Fragment>
              <div className="rate-list-container mt-4">
                <div className="store-list">     
                    {
                        reviewData.map((e,i)=>(
                            <div className="row mt-4 card ">
                                <div className="col col-6">
                                 <span className="text-danger">User Id : {e.uid}</span>
                                 <h6 style={{marginTop:'8px'}} className="text-dark">{e.comment}</h6>
                                </div>
                                <div className="col col-6">
                                    <ReactStars
                                    count={5}                                 
                                    size={28}
                                    edit={false}                                        
                                    value={e.rating}                            
                                    half={true}
                                    emptyIcon={<i className='far fa-star'></i>}
                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                    fullIcon={<i className='fa fa-star'></i>}
                                    color2={'#ffd700'} /> 
                                </div>
                            </div>
                        ))
                    }                   
                </div>
            </div>  
        </Fragment>
    );
};

export default ReviewList;