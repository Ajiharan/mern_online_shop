import React,{Fragment,useEffect,useState,useRef} from 'react';
import UserProduct from '../products_components/userProducts'
import axios from 'axios';
import CategoryList from '../products_components/products_category_list';
let tempProductData=[];
let tempcategoryData=[];
export const ProductContent=React.createContext();
const Home = (props) => {
    const intervalRef=useRef();
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
         
         return()=>{
            clearInterval(intervalRef.current);
         }
    },[]);

    const ViewProducts=(product_data)=>{
        clearInterval(intervalRef.current);
        axios.get(`http://localhost:3000/product/getByCategory/${product_data}`).then(res=>{
            SetData(res.data);
        })
    }

    const getUserProductDatas=()=>{
        intervalRef.current=setInterval(()=>{
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
    <div className="container">
        <div className="row" id="home-category-nav">
            <div id="home-category-nav-sub">
                <ProductContent.Provider value={ViewProducts}>
                     <CategoryList categoryData={categoryData}/>
                </ProductContent.Provider>            
            </div>
            <div >
                 <UserProduct ProductData={productData}/>
             </div>
        </div>
    </div>    
   
       
    );
};

export default React.memo(Home);