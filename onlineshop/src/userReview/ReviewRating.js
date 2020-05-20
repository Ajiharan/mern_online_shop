import React,{useEffect} from 'react';
import { useLocation } from "react-router-dom";
const ReviewRating = (props) => {

    const location = useLocation();

   
    return (
        <div>
           Product id- {location.state.pid}
        </div>
    );
};

export default ReviewRating;