import React,{Fragment,useEffect,useState} from 'react';
import UserProduct from '../products_components/userProducts'
import axios from 'axios';
import CategoryList from '../products_components/products_category_list';
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
        let productList=[];
        let categoryList=[];

        setInterval(()=>{
            axios.get("http://localhost:3000/product/view").then(res=> {
               productList=res.data;
             });
     
             axios.get("http://localhost:3000/product/getAll").then(res=> {
                 categoryList=res.data
              });

              if((JSON.stringify(productData) !==JSON.stringify(productList))||(JSON.stringify(categoryData) !==JSON.stringify(categoryList))){
                SetData( productList);
                setCategoryData(categoryList);
              }
        },3000)

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