import React,{Fragment,useState,useEffect} from 'react';
import Axios from 'axios';


const Products_category_list = ({categoryData}) => {
    const [catData,setCatData]=useState([]);

  

    return (
        <Fragment>
           
            <ul className="list-group mt-4">
            <div className="card bg-info" style={{height:'40px',borderRadius:'0px'}}>
                <h5 className="text-light mt-1 pt-1"><i className="fa fa-list-alt" aria-hidden="true">
                    </i> Categories <i className="fa fa-chevron-up text-right" aria-hidden="true"></i></h5></div>
                {
                    categoryData.map((e,i)=>(
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        {e._id.name}
                    <span className="badge badge-primary badge-pill">{e.count}</span>
                      </li>
                    ))
                }

                
                
               
            </ul>
        </Fragment>
    );
};

export default Products_category_list;