import React,{useEffect,useState} from 'react';
import axios from 'axios';
const Table = () => {
    const[tdata,setData]=useState([]);
    useEffect(()=>{
       console.log("Worked");
        axios.get('http://localhost:3000/admin/manager/register').then(res=>{
            console.log("Data",res.data);
            setData(res.data);
        }).catch(err=>{
            console.log("Error",err);
        })

    },[]);

    return (
        <div className="container">
            <p>sd</p>
        </div>
    );
};

export default Table;