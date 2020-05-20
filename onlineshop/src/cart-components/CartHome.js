import React,{Fragment,useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {UserCartContext} from '../App';
const CartHome = (props) => {
    const [cardlist,setCart]=useState([]);
    const[tempCount,setCount]=useState(1); 
    const[totalPrice,setPrice]=useState(0);
    const myref=useRef([]);
   
    useEffect(()=>{
        setCart(props.CartData);
        console.log("Props.CartData",props.CartData);
        SetDatas();
    },[props]);

    const SetDatas=()=>{
        if(props.CartData._id !==undefined){
            axios.get(`http://localhost:3000/cart/view/${props.CartData._id}`).then(res=>{
                myref.current=res.data;
                let tot=res.data.reduce((acc,e)=>acc+(e.count*e.cartDetails[0].price),0)
                setCart(res.data);
                setPrice(tot);
            }).catch(err=>{
                console.log(err);
            })
        }   
    }
    const DeleteFromcart=(id)=>{
        axios.delete(`http://localhost:3000/cart/delete/${id}`).then(res=>{
            SetDatas();          
        }).catch(err=>{
            console.log(err);
        })        
    }


    const InfoChange=(event,id)=>{
        axios.put("http://localhost:3000/cart/update",{id:id,count:event.target.value}).then(res=>{         
           SetDatas();
          // props.UpdateData();
        }).catch(err=>{
            console.log(err);
        })
           
    }

    return (
        <div className="container mt-4 pt-1 wishlist-container"> 
        { cardlist.length > 0?(
            <Fragment>
            <h4 className="text-center bg-danger text-light" style={{opacity:'0.8'}}>My Cart</h4>
            <div className="row">
                <div className="col text-center">
                    <h6>Sub Total : ${totalPrice}</h6>
                <button className="btn btn-warning text-white">Proceed to CheckOut</button>
                </div>
            </div>
           
            <div className="store-list-container mt-4">
                <div className="store-list">     
                    {
                        cardlist.map((e,i)=>(
                            (e!==null)?(
                            <div className="row mt-4" key={i}>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                        <img  className='card-img-top' src={e.cartDetails[0].imageUrl}/>               
            
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop:'25px'}}>
                                    <p>{e.cartDetails[0].count} available</p>
                                    <h5 className="card-title">{e.cartDetails[0].name} ${e.cartDetails[0].price}</h5>
                                   
                                    <button onClick={()=>{DeleteFromcart(e._id)}} className="btn btn-danger mt-4">Remove Item</button>
                                    
                                        <div className="form-group mt-4">
                                            <input defaultValue={e.count} type="number" onChange={(event)=>{InfoChange(event,e._id)}} className="form-control"/>
                                           
                                        </div>                                     
                                    
                                </div>
                                
                            </div>):(null)                   
                        ))
                    }
                </div>
            </div>
            </Fragment>):(<h4 className="text-center bg-danger text-light" style={{opacity:'0.8'}}>No items are Added in list</h4>)
            }
        </div>
    );
};

export default React.memo(CartHome);