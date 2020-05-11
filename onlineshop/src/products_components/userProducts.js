import React,{useState} from 'react';

const userProducts = ({ProductData}) => {
    return (
        <div className="container mt-4" >
            <div className="row" id="product_doc">
                {
                    ProductData.map((e,i)=>(
                        <div className="card" key={i}>
                            <img style={{width:'200px',height:'200px'}} className='card-img-top' src={e.imageUrl}/>
                            <div className="card-body">
                             <h5 className="card-title">{e.name} ${e.price}</h5>

                                <button className="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
           
            
        </div>
    );
};

export default userProducts;