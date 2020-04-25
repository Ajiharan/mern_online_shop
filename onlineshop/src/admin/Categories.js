import React from 'react';
import InfoDetails from './table';
import InfoForm from "./form";
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
        if(!data.isEdit){
            axios.post("http://localhost:3000/category/add",data).then(res=>{
                this.getAll();
            })
        }

        else{
            axios.put("http://localhost:3000/category/update",data).then(res =>{
                this.getAll();
            })
        }

    }

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        axios.get("http://localhost:3000/category/view").then(res=> {
            this.setState({
                data : res.data
            })
        })
    }

    update = data =>{
        console.log(data);
        this.setState({
            editableData : data
        })
    }


    del = data=>{
        var option = window.confirm(`Are you sure want to delete ${data.name}`)
        if(option){
            axios.delete(`http://localhost:3000/category/del/${data._id}`).then(res =>{
                console.log(res);
                this.getAll();
            })
        }
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h5>Add Category</h5>
                        <InfoForm myData = {this.create} setForm ={this.state.editableData}/>
                    </div>
                    <div className="col-6">
                        <h5>Category Info</h5>
                        <InfoDetails getData ={this.state.data} setData ={this.update} del ={this.del}/>
                    </div>
                </div>
            </div>
        );
    }


};

export default Categories;
