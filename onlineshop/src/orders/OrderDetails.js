import React,{useState,useEffect} from 'react';
import Axios from 'axios';

const OrderDetails = (props) => {
    const[orderData,setOrderData]=useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3000/user/getUser"
        ,{headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}}).then(async res=>{ 
            Axios.get(`http://localhost:3000/order/get/${res.data._id}`).then(result=>{
                console.log("ORDer",result.data);
                setOrderData(result.data.reverse());
            }).catch(err=>{
                console.log(err);
            });

        }).catch(err=>{
            console.log(err);
        })     
    },[])
    
    return (
        
            (orderData.length > 0) ?( <div className="container">
                <h4 className="text-center text-dark mt-4">User Order lists</h4>
            <div className="store-list-container mt-4">
               <div className="store-list">    
                    {
                        orderData.map((e,i)=>(
                            <div className="card mt-4">
                                <div className="card-body">
                                     <h5 className="text-success">Order id : {e._id}</h5>
                                     <h5 className="text-success">Total : {e.total}</h5>
                                     {
                                         e.status?(<h5 className="text-success">Sucess</h5>):
                                         (<h5 className="text-danger">Cancel</h5>)
                                     }
                                </div>
                            </div>
                        ))
                    }
               </div>
           </div>
       </div>):(null)
        
       
    );
};

export default OrderDetails;