import React from "react";

class InfoDetailsProduct extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    this.props.getData.length > 0 ?
                        (
                            this.props.getData.map(e =>
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.category}</td>
                                    <td>{e.price}</td>
                                    <td>{e.count}</td>
                                    <td><img style={{height:"35px",width:"50px"}} src={e.imageUrl} alt="No image"/></td>
                                    <td><button
                                        onClick ={event =>{
                                            this.props.del(e)
                                        }}
                                    >Remove</button></td>
                                </tr>
                            )

                        )
                        :
                        (
                            <tr>
                                <td>No Data</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        );
    }


}

export default InfoDetailsProduct
