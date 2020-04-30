import React,{useEffect,useState} from 'react';

const Table = (props) => {
    const[tdata,setData]=useState([]);
    useEffect(()=>{
       //console.log("PrData",props.Tdata);
        setData(props.Tdata);
    },[props.Tdata]);

    
    return (
        <div className="container table-responsive">
             <table className="table table-dark table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email id</th>
                    <th>Manager</th>
                    <th>Store-Manager</th>
                </tr>
                </thead>
                <tbody>
                    {
                        tdata.map((e,i)=>(
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.isManager?(<i className="fa fa-check text-success" aria-hidden="true"></i>):(<i className="fa fa-window-close text-danger" aria-hidden="true"></i>)}</td>
                                <td><button className="btn btn-info" onClick={()=>{props.UpdateData(e)}} >Send Login</button></td>
                            </tr>
                        ))

                    }
                   
                </tbody>
            </table>
        </div>
    );
};

export default Table;