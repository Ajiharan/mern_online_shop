import React,{Fragment,useEffect,useState} from 'react';
import UserProduct from '../products_components/userProducts'
import axios from 'axios';
import CategoryList from '../products_components/products_category_list';
let tempProductData=[];
let tempcategoryData=[];
const Home = (props) => {
    const [productData,SetData]=useState([]);
    const[categoryData,setCategoryData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/product/view").then(res=> {
           SetData(res.data);
        })

        axios.get("http://localhost:3000/product/getAll").then(res=> {
            setCategoryData(res.data);
         })

         getUserProductDatas();
         
         
    },[]);

    const getUserProductDatas=()=>{
        setInterval(()=>{
            axios.get("http://localhost:3000/product/view_home").then(res=> {
                tempProductData=res.data;
             });
     
             axios.get("http://localhost:3000/product/getAll").then(res=> {
                tempcategoryData=res.data
              });

              if((JSON.stringify(productData) !==JSON.stringify(tempProductData))){
                SetData( tempProductData);
               
              }
              if((JSON.stringify(categoryData) !==JSON.stringify(tempcategoryData))){
                setCategoryData(tempcategoryData);
              }
        },30000)

    }

    return (
    <div className="container-fluid">
        <div className="row" id="home-category-nav">
            <div>
                <CategoryList categoryData={categoryData}/>
            </div>
            <div >
                 <UserProduct ProductData={productData}/>
             </div>
        </div>
    </div>    
   
       
    );
};

export default Home;