import React from 'react';
import ProductInfoDetails from './ProductInfoDetails';
import ProductInfoForm from "./ProductInfoForm";
import axios from 'axios';
import {toast} from "react-toastify";
import EditProduct from "./EditProduct";

class Products extends React.Component{

    constructor() {
        super();
        this.state={
            data:[],
            editableData:[],
            Categorydata :[]
        }
    }

    create = data =>{
            axios.post("http://localhost:3000/product/add",data).then(res=>{
                toast.success(`${data.name} is added sucessfully!!!`)
                this.getAll();
            })

    }

    componentDidMount() {
        this.getAll();
        this.getAllCategories();
    }

    getAllCategories(){
        axios.get("http://localhost:3000/category/view").then(res=> {
            console.log(res)
            this.setState({
                Categorydata : res.data
            })
            console.log(this.state.Categorydata)
        })
    }



    getAll(){
        axios.get("http://localhost:3000/product/view").then(res=> {
            this.setState({
                data : res.data
            })
        })

    }


    del = data=>{
        var option = window.confirm(`Are you sure want to delete ${data.name}`)
        if(option){
            axios.delete(`http://localhost:3000/product/del/${data._id}`).then(res =>{
                toast.success(`${data.name} is deleted sucessfully!!!`)
                this.getAll();

            })

        }
    }


    render() {
        return (
            <div className="container">
                <div className="row manager-product-container">
                    <div>
                        <h5 className="text-center">Add Product</h5>
                        <ProductInfoForm myData = {this.create} getCategories ={this.state.Categorydata} setForm ={this.state.editableData}/>
                    </div>

                    <div>
                        <h5 className="text-center">Product Info</h5>
                        <ProductInfoDetails getData ={this.state.data} setData ={this.update} del ={this.del}/>
                    </div>

                    </div>
            </div>
        );
    }


};

export default Products;
