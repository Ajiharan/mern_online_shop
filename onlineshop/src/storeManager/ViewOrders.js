import React from "react";
import axios from "axios";

class ViewOrders extends React.Component{

    constructor() {
        super();
        this.state={
            orderData :[],
            cartData:[]
        }
    }

    getOrderData(){
        axios.get("http://localhost:3000/order/getOrdersData").then(res=> {
            this.setState({
                orderData : res.data
            })
        })
    }

    componentDidMount() {
        this.getOrderData();
    }

    render() {
        return(
            <div className="container mt-4" >
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Order details</th>
                        <th>Total amount</th>
                        <th>Order status</th>
                    </tr>
                    </thead>
                    {
                            this.state.orderData.length > 0 ? (
                                this.state.orderData.map(e =>
                                    <tr key={e._id}>
                                        <td>{e.uid}</td>
                                        <td>
                                            {
                                            e.cardlist.map((e,i)=>(
                                                (e!==null)?(
                                                                e.count > 3 ? (
                                                                        <div className="row mt-4" key={i}>
                                                                            <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop: '25px'}}>
                                                                                <h6 className="card-title">{i + 1})Product name : {e.cartDetails[0].name} </h6>
                                                                                <h6 className="card-title">Price : ${e.cartDetails[0].price} </h6>
                                                                                <h6 className="card-title">Count : {e.count} </h6>
                                                                                <h6 className="card-title" style={{color: 'red'}}>Discount : ${e.cartDetails[0].price / 10 * (e.count - 3)} </h6>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                    :
                                                                    (
                                                                        <div className="row mt-4" key={i}>
                                                                            <div className="col-md-6 col-sm-12 col-xs-12" style={{marginTop: '25px'}}>
                                                                                <h6 className="card-title">{i + 1})Product name : {e.cartDetails[0].name} </h6>
                                                                                <h6 className="card-title">Price : ${e.cartDetails[0].price} </h6>
                                                                                <h6 className="card-title">Count : {e.count} </h6>
                                                                            </div>

                                                                        </div>
                                                                    )

                                                              ):(null)
                                            ))
                                        }</td>
                                        <td>${e.total}</td>
                                        <td>{e.status ? (<i className="fa fa-check text-success" aria-hidden="true"></i>):(<i className="fa fa-window-close text-danger" aria-hidden="true"></i>)}</td>
                                    </tr>

                                )
                            )


                            :

                            (

                               <tr>
                                   <td>No orders available</td>
                               </tr>
                            )
                    }

                    <tbody>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default ViewOrders
