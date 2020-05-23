import React, {Fragment} from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

class ViewProductFeedback extends React.Component{
    constructor() {
        super();
        this.state ={
            _id :"",
            reviewData :[]
        }
    }


    componentWillReceiveProps(props) {

            axios.get(`http://localhost:3000/rating/ProductData/${props.pid}`).then(res => {
                this.setState({
                    reviewData: res.data
                })

                console.log(this.state.reviewData);

       })
    }


    render() {
        return(
            <div className="modal fade" id="exampleModalLong2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">View feedback</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                        {
                                            this.state.reviewData.length > 0  ? (
                                                    this.state.reviewData.map((e,i)=>(
                                                        <div className="row mt-4 card"  id="reviewlist" key={i}>
                                                            <div className="col col-12">
                                                                <span className="text-danger">User Id : {e.uid}</span>
                                                                <h6 style={{marginTop:'8px'}} className="text-dark">Comment : {e.comment === null ? 'No comment' : e.comment}</h6>
                                                                <ReactStars
                                                                    count={5}
                                                                    size={28}
                                                                    edit={false}
                                                                    value={e.rating}
                                                                    half={true}
                                                                    emptyIcon={<i className='far fa-star'></i>}
                                                                    halfIcon={<i className='fa fa-star-half-alt'></i>}
                                                                    fullIcon={<i className='fa fa-star'></i>}
                                                                    color2={'#ffd700'} />
                                                            </div>
                                                        </div>
                                                    ))
                                                )

                                                :

                                                (
                                                    <h6 style={{marginTop:'8px'}} className="text-dark">It's haven't been rated yet</h6>
                                                )
                                        }

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

export default ViewProductFeedback;
