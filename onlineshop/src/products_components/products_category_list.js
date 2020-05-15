import React,{Fragment,useState,useContext} from 'react';
import Axios from 'axios';
import $ from 'jquery';
import {findDOMNode} from 'react-dom';
import {ProductContent} from '../user/Home';

const Products_category_list = ({categoryData}) => {
    const [catData,setCatData]=useState([]);
    const [isToggle,setToggle]=useState(false);
    const productData=useContext(ProductContent);
    const ToggleContainer=()=>{
        let box=findDOMNode(document.querySelector(".myToggle"));
        $(box).slideToggle();
        setToggle(!isToggle);

    }

    const getProductDetails=(name)=>{
        // console.log(name)
        productData(name);
    }

    return (
        <Fragment>
           
            <ul className="list-group mt-4">
                <div className="card bg-info" id="tog_cat" style={{height:'40px',borderRadius:'0px',borderTopLeftRadius:'20px'}}>
                    <div>
                        <h5 className="text-light mt-1 pt-1"><i className="fa fa-list-alt" aria-hidden="true">
                        </i> Categories </h5>
                    </div>
                    <div>
                        {!isToggle ?( <i style={{cursor:'pointer'}} onClick={ToggleContainer} className="fa fad fa-angle-up text-right text-light" aria-hidden="true"></i>)
                        :( <i style={{cursor:'pointer'}} onClick={ToggleContainer} className="fa fad fa-angle-down text-right text-light" aria-hidden="true"></i>)
                        }
                       
                    </div>
                </div>
                <div className="myToggle" >
                {
                    categoryData.map((e,i)=>(
                    <li onClick={()=>{getProductDetails(e._id.name)}} style={{borderRadius:'0px'}} className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        {e._id.name}
                    <span className="badge badge-primary badge-pill">{e.count}</span>
                      </li>
                    ))
                }
                </div>            
            </ul>
        </Fragment>
    );
};

export default Products_category_list;