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
        <div className="container">
            <h2 className="text-dark">WishList</h2>
            {
                wishlist.map((e,i)=>(
                     <div className="card my-card" key={i}>
                        
                        <img style={{width:'200px',height:'200px'}} className='card-img-top' src={e.imageUrl}/>
                        <div className="card-body">
                             <p>{e.count} available</p>
                             <h5 className="card-title">{e.name} ${e.price}</h5>
                            <button className="btn btn-primary">Add to cart</button>
                         </div>
                     </div>
                 ))
            }
        </div>
    );
};

export default React.memo(Home);