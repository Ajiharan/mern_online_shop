import React from 'react';
import CategoryInfoDetails from './CategoryInfoDetails';
import CategoryInfoForm from "./CategoryInfoForm";
import axios from 'axios';

class Categories extends React.Component{

    constructor() {
        super();
        this.state={
            data:[],
            editableData:[]
        }
    }

    create = data =>{
        console.log("Create",data);
        if(!data.isEdit){
            axios.post("http://localhost:3000/category/add",data).then(res=>{
                this.getAll();
            })
        }

        else{
            axios.put("http://localhost:3000/category/update",data).then(res =>{
                this.getAll();
            });
            let copyData=this.state.editableData;
            copyData._id=null;
            this.setState({
               
                editableData:copyData
            })
        }

    }

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        axios.get("http://localhost:3000/category/view").then(res=> {
            this.setState({
                data : res.data,
                
            })
        })
    }

    update = data =>{
        console.log(data);
        this.setState({
            editableData : data,
        })
    }


    del = data=>{
        var option = window.confirm(`Are you sure want to delete ${data.name}`)
        if(option){
            axios.delete(`http://localhost:3000/category/del`,{params:{id:data._id,cname:data.name}}).then(res =>{
                console.log(res);
                this.getAll();
            })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row admin-category-container">
                    <div>
                        <h5 className="text-center">Add Category</h5>
                        <CategoryInfoForm myData = {this.create} setForm ={this.state.editableData}/>
                    </div>
                    <div >
                        <h5 className="text-center">Category Info</h5>
                        <CategoryInfoDetails getData ={this.state.data} setData ={this.update} del ={this.del}/>
                    </div>
                </div>
            </div>
        );
    }


};

export default Categories;
