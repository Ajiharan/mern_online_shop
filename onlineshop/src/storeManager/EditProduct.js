import React from "react";
import axios from 'axios'
import {toast} from "react-toastify";
import {storage} from "../firebase";

class EditProduct extends React.Component{

    constructor() {
        super();
        this.state ={
            _id:"",
            name: "",
            category: "",
            price: "",
            count: "",
            imageUrl:"",
            progress: 0,
            Categorydata: [],
            data:[]
        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentWillReceiveProps(props) {
        this.setState({
            data : props.productData,
            _id:props.productData._id,
            name: props.productData.name,
            category: props.productData.category,
            price: props.productData.price,
            count: props.productData.count,
            imageUrl: props.productData.imageUrl
        })
    }


    handleChange = e => {
        if (e.target.files[0]) {
            let output=document.querySelector("#img-fire");
            // console.log("Target",URL.createObjectURL(e.target.files[0]));

            output.src=URL.createObjectURL(e.target.files[0]);
            output.onload=function(){
                URL.revokeObjectURL(output.src);
            }
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });
    }

    getAllCategories(){
        axios.get("http://localhost:3000/category/view").then(res=> {
            console.log(res)
            this.setState({
                Categorydata : res.data
            })
        })
    }

    componentDidMount() {
        this.getAllCategories();
    }


    infoChange = event=>{
        const {name,value} = event.target;

        this.setState({
            [name]:value
        })
    }

    infoSubmit =event => {

        let data = {
            _id : this.state._id,
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            count :this.state.count,
            imageUrl: this.state.url
        }

        axios.put("http://localhost:3000/product/update",data).then(res=>{
            toast.success(`${data.name} is Updated sucessfully!!!`);
        })
    }


    render() {
        return(

            <div className="modal fade" id="exampleModalLong1" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit {this.state.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                        <label htmlFor="Name">Product Image:</label>
                        <br/>
                        <img src={this.state.imageUrl || 'http://via.placeholder.com/200x200'} id="img-fire" alt="Uploaded images" height="100" width="100"/>
                        <br/>
                        <progress value={this.state.progress} max="100"/>
                        <br/>
                        <input type="file" id ="img" onChange={this.handleChange}/>
                        <button className="btn" onClick={this.handleUpload}>Upload</button>
                        <br/><br/>

                        <form  onSubmit={this.infoSubmit} autoComplete="off">
                                <div className="form-group">
                                    <label htmlFor="Name">Product Name:</label>
                                    <input type="text" className="form-control"
                                           onChange={this.infoChange}
                                           name = "name"
                                           value = {this.state.name}/>
                                    <br/>
                                    <label htmlFor="Name">Category Type:</label>

                                    <div>
                                        <select onChange={this.infoChange} name="category" value={this.state.category}>
                                            <option>{this.state.category}</option>
                                            {
                                                this.state.Categorydata.map((e) => <option key={e._id} value={e.name}>{e.name}</option>)
                                            }

                                        </select>
                                    </div>
                                    <br/>


                                    <label htmlFor="Name">Product Price:</label>

                                    <input type="text" className="form-control"
                                           onChange={this.infoChange}
                                           name = "price"
                                           value = {this.state.price}/><br/>

                                    <label htmlFor="Name">Product Count:</label>

                                    <input type="text" className="form-control"
                                           onChange={this.infoChange}
                                           name = "count"
                                           value = {this.state.count}/><br/>

                                    <button type="submit" className="btn">Save changes</button>


                                </div>
                                  </form>
                            </div>



                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProduct
