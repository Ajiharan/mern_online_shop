import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
const UserProducts = (props) => {
    const history = useHistory();
    const CheckAuthentication=()=>{
        let hasToken=JSON.parse(localStorage.getItem('auth'));
        if(!hasToken){
            history.push('/user/Login');
            
        }
    }

    return (
        <div className="container mt-4" >
            <div className="row" id="product_doc">
                {
                    props.ProductData.map((e,i)=>(
                        <div className="card my-card" key={i}>
                            <img style={{width:'200px',height:'200px'}} className='card-img-top' src={e.imageUrl}/>
                            <div className="card-body">
                             <h5 className="card-title">{e.name} ${e.price}</h5>

                                <button className="btn btn-primary" onClick={CheckAuthentication}>Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
           
            
        </div>
    );
};

export default UserProducts;