import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';

const Home = (props) => {
    const[wishlist,setList]=useState([]);
    const myref=useRef([]);

    useEffect(()=>{
        console.log("UseEffect called",props.sendData);
        if(props.sendData._id !==undefined){
            axios.get(`http://localhost:3000/wishlist/view/${props.sendData._id}`).then(res=>{
                myref.current=res.data
                setList(res.data);
            }).catch(err=>{
                console.log(err);
            })
        } 
    },[]);

    return (
        <div className="container mt-4 pt-1 wishlist-container">  
            <h4 className="text-center bg-danger text-light" style={{opacity:'0.8'}}>My Wishlist</h4>
            <div className="store-list-container mt-4">
                <div className="store-list">     
                    {
                        wishlist.map((e,i)=>(
                            <div className="row mt-4" key={i}>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                        <img  className='card-img-top' src={e.imageUrl}/>               
            
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop:'25px'}}>
                                    <p>{e.count} available</p>
                                    <h5 className="card-title">{e.name} ${e.price}</h5>
                                    <button className="btn btn-primary">Add to cart</button>
                                </div>
                                
                            </div>                   
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Home);