import React,{Fragment,useState,useEffect} from 'react';
import Axios from 'axios';


const Products_category_list = ({categoryData}) => {
    const [catData,setCatData]=useState([]);

  

    return (
        <Fragment>
            <ul className="list-group mt-4">

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