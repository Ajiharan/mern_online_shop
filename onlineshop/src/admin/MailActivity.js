import React from 'react';
import Table from '../admin-mail-components/Table';
import axios from 'axios';
import PropTypes from 'prop-types';

class MailActivity extends React.Component {
    constructor(props){
        super(props);
        this.timeInt="";
        this.timeData=[];
        this.state={
            tableData:[]
        }
    }

    setTime(){
        this.timeInt=setInterval(()=>{
            axios.get('http://localhost:3000/admin/manager/register').then(res=>{
                // console.log("Data",res.data);
                this.timeData=res.data;       
            }).then(()=>{
                if(this.state.tableData.length !==this.timeData.length){
                    console.log("state changed",  this.timeData.length);
                    console.log("Table Data",  this.state.tableData.length);
                    this.setState({
                        tableData: this.timeData
                    });
                }
            }).catch(err=>{
                console.log("Error",err);
            });
        

        },300000);
    }
    componentWillUnmount(){
        console.log("componentWillUnmount()");
        clearInterval(this.timeInt);
    }
    getTableData=()=>{
       
        axios.get('http://localhost:3000/admin/manager/register').then(res=>{
            console.log("Data",res.data);
            this.setState({
                tableData:res.data
            });
        }).catch(err=>{
            console.log("Error",err);
        })
    }

    updateTableData=(event)=>{
        let url="http://localhost:3001/manager/Login"
        let postData={message:url,tomail:event.email}
       axios.post('http://localhost:3000/admin/mail/sender',postData).then(res=>{
           alert("Message Sent Successfully");
           this.getTableData();
       }).catch(err=>{
        alert("Message UnSccessfully");
       });      
    }

    componentDidMount(){
        this.getTableData();
        this.setTime();
    }
    render() {
        return (
            <div>
                <Table Tdata={this.state.tableData} UpdateData={this.updateTableData}/>
            </div>
        );
    }
}




export default MailActivity;