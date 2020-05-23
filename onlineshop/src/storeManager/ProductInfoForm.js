import React from "react";
import {storage} from "../firebase";


class ProductInfoForm extends React.Component {
    constructor() {
        super();
        this.state= {
            _id: "",
            name: "",
            category: "",
            price: "",
            count: "",
            imageUrl: "",
            progress: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }


    infoChange = event=>{
        const {name,value} = event.target;

        this.setState({
            [name]:value,
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


    infoSubmit =event =>{
        event.preventDefault();
            let data = {
                name: this.state.name,
                category: this.state.category,
                price: this.state.price,
                count :this.state.count,
                imageUrl: this.state.url
            }

            this.props.myData(data);

    }

    Clear = () =>{
        document.getElementById('img').value = ''
        // document.getElementById('name').value = ''
        // document.getElementById('category').value = ''
        // document.getElementById('price').value = ''
        // document.getElementById('count').value = ''

        this.setState({
            name: "",
            category:"",
            price: "",
            count : "",
            imageUrl: "",
            progress : 0
        })

    }


    render() {
        return (
            <div  className="container" style={{height:"200px",width:"500px"}}>

                <label htmlFor="Name">Product Image:</label>
                <br/>
                <img src={this.state.imageUrl || 'http://via.placeholder.com/200x200'} id="img-fire" alt="Uploaded images" height="150" width="150"/>
                <br/>
                <progress  value={this.state.progress} max="100"/>
                <br/>
                <input type="file" id ="img" onChange={this.handleChange}/>
                <button className="btn" onClick={this.handleUpload}>Upload</button>
                <br/><br/>

                <form id="myForm" onSubmit={this.infoSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="Name">Product Name:</label>
                        <input type="text" id="name" className="form-control"
                               onChange={this.infoChange}
                               name = "name"
                               value = {this.state.name}/>
                        <br/>
                        <label htmlFor="Name">Category Type:</label>

                        <div>
                            <select onChange={this.infoChange} id="category" name="category" value={this.state.category}>
                                <option>Select Category</option>
                                {
                                    this.props.getCategories.map((e) => <option key={e._id} value={e.name}>{e.name}</option>)
                                }
                            </select>
                        </div>
                        <br/>


                        <label htmlFor="Name">Product Price:</label>

                        <input type="text" id="price" className="form-control"
                               onChange={this.infoChange}
                               name = "price"
                               value = {this.state.price}/><br/>

                        <label htmlFor="Name">Product Count:</label>

                        <input type="text" id="count" className="form-control"
                               onChange={this.infoChange}
                               name = "count"
                               value = {this.state.count}/><br/>

                        <button type="submit" className="btn">Add</button> <input type="button" className="btn" value="Clear" onClick={this.Clear}/>

                    </div>
                </form>
            </div>
        );
    }

}

export default ProductInfoForm;
