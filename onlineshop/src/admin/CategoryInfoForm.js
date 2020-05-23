import React from "react";

class CategoryInfoForm extends React.Component {
    constructor() {
        super();
        this.state={
            _id :"",
            name :"",
            isEdit:false
        }
    }

    infoChange = event=>{
        const {name,value} = event.target;

        this.setState({
            [name]:value
        })
    }

    infoSubmit =event =>{
        event.preventDefault();
        if(!this.state.isEdit){
            let data ={
                isEdit: this.state.isEdit,
                name : this.state.name
            }
            this.props.myData(data);
        }

        else{
            let data ={
                isEdit: this.state.isEdit,
                _id : this.state._id,
                name : this.state.name
            }
            this.setState({
                isEdit:false
            });
            this.props.myData(data);
            
        }

    }

    componentWillReceiveProps(props) {
        if(props.setForm._id != null) {
            this.setState({
                isEdit: true,
                _id:props.setForm._id,
                name : props.setForm.name
            })
        }
    }

    Clear = () =>{
        this.setState({
            name: "",
            isEdit: false
        })

    }

    render() {
        return (
            <div  className="container" style={{height:"200px",width:"500px"}}>
                <form  onSubmit={this.infoSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="Name">Category Name:</label>
                        <input type="text" className="form-control"
                               onChange={this.infoChange}
                               name = "name"
                               value = {this.state.name}/>
                    </div>

                    <button type="submit" className="btn">{this.state.isEdit ? 'Update' :'Add'}</button> <input type="button" className="btn" value="Clear" onClick={this.Clear}/>
                </form>
            </div>
        );
    }


}

export default CategoryInfoForm
