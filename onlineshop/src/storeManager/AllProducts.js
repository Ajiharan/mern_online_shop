import React from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import ViewProductFeedback from "./ViewProductFeedback";
class AllProducts extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data : [],
            pdata : [],
            prodID :""
        }
    }



    getAllProducts(){
             axios.get("http://localhost:3000/product/view").then(res=> {
                 this.setState({
                      data : res.data
                  })
             })
    }


    componentDidMount() {
        this.getAllProducts();
    }

    Edit= (e) =>{
        let pid = e._id
        console.log(pid)
        axios.get(`http://localhost:3000/product/getProduct/${pid}`).then(res=> {
            this.setState({
               pdata : res.data
            })
        })

    }

    View = (e) =>{
        let pid = e._id;
        axios.get(`http://localhost:3000/product/getProduct/${pid}`).then(res=> {
            this.setState({
                prodID : res.data._id
            })
        })
    }

    render() {
        return (
            <div className="container mt-4" >
                <div className="row" id="product_doc">
                    {
                    this.state.data.length > 0  ?
                        (
                            this.state.data.map(e =>
                                <div className="card my-card" key={e._id}>
                                    <img style={{width:'200px',height:'200px'}} className='card-img-top' src={e.imageUrl}/>
                                        <div className="card-body">

                                            <h5 className="card-title"> Name : {e.name} </h5>
                                            <h5 className="card-title"> Price : ${e.price}</h5>
                                            <h5 className="card-title"> Count : {e.count}</h5>


                                        <div className="modal-footer">

                                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                                    data-target="#exampleModalLong1" onClick={()=> {
                                                          this.Edit(e)
                                            }}>Edit</button>

                                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                                    data-target="#exampleModalLong2" onClick={()=> {
                                                this.View(e)
                                            }}>View</button>

                                        </div>

                                        </div>
                                </div>

                            )

                        )
                        :
                        (
                            <tr>
                                <td>No Products</td>
                            </tr>
                        )
                }

                </div>
            <EditProduct productData = {this.state.pdata}/>
            <ViewProductFeedback pid = {this.state.prodID}/>
             </div>
        )
    }

}

export default AllProducts
