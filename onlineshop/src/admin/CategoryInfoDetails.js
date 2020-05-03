import React from "react";

class InfoDetailsCategory extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.getData.length > 0 ?
                        (
                            this.props.getData.map(e =>
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td><button className="btn-btb-primary"
                                                onClick ={event =>{
                                                    this.props.setData(e)
                                                }}
                                    >Edit</button></td>
                                    <td><button
                                        onClick ={event =>{
                                            this.props.del(e)
                                        }}
                                    >Delete</button></td>
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

export default InfoDetailsCategory
