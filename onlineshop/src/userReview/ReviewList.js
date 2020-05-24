import React,{Fragment,useEffect,useState} from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component'
const ReviewList = (props) => {

    const [reviewData,setReviewData]=useState([]);

    useEffect(()=>{
        console.log("Changed");
        axios.get(`http://localhost:3000/rating/ProductData/${props.AllData.details._id}`).then(res=>{
            console.log("Myres",res.data);
            setReviewData(res.data.reverse());
        }).catch(err=>{
            console.log(err);
        })

    },[props]);

    const DeleteItem=(id)=>{
        props.Del(id);
    }
    const UpdateItem=(comment)=>{
        props.upd(comment);
    }

    return (
        <Fragment>
           {
                (reviewData.length > 0)?(
              <div className="rate-list-container mt-4">
                <div className="store-list">     
                    {
                        reviewData.map((e,i)=>(
                            <div className="row mt-4 card"  id="reviewlist" key={i}>
                                <div className="col col-12">
                                    <span className="text-danger">User Id : {e.uid}</span>
                                    <h6 style={{marginTop:'8px'}} className="text-dark">{e.comment}</h6>
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
                                { props.AllData.uid===e.uid?(
                                    <div className="col col-12">
                                    <i onClick={()=>{DeleteItem(e._id)}} style={{margin:'20px',cursor:'pointer'}} className="fas fa-trash-alt"></i>
                                    <i onClick={()=>{UpdateItem(e.comment)}} style={{cursor:'pointer'}} className="far fa-edit"></i>

                                    </div>):(null)
                                }
                               
                            </div>
                        ))
                    }                   
                </div>
            </div> 
            ):(null)} 
        </Fragment>
    );
};

export default React.memo(ReviewList);