import React from 'react';
import ReactDOM from 'react-dom';
import './css/admin.css';
import './css/manager.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import './css/user.css';
class Index extends React.Component{
  
  constructor(props){
    
    super(props);
      this.timeInterval="";
      this.userhasToken="";
      this.adminhasToken="";
      this.managerhasToken="";
    this.state={
      uTokens:"",
      aTokens:"",
      sTokens:"",
    }
  }

  getAll(){
    this.userhasToken=JSON.parse(localStorage.getItem('auth'));
    this.adminhasToken=JSON.parse(localStorage.getItem('auth_admin'));
    this.managerhasToken=JSON.parse(localStorage.getItem('auth_manager'));

    this.setState({
      uTokens:this.userhasToken,
      aTokens:this.adminhasToken,
      sTokens:this.userhasToken
    });
  }

  setTime(){
    this.timeInterval=setInterval(()=>{
    //  console.log("sdsd");
      this.userhasToken=JSON.parse(localStorage.getItem('auth'));
      this.adminhasToken=JSON.parse(localStorage.getItem('auth_admin'));
      this.managerhasToken=JSON.parse(localStorage.getItem('auth_manager'));
          // console.log("state asdminas TOken",this.state.aTokens);
          // console.log("AdminHas TOken",this.adminhasToken);
      if((this.state.uTokens !==this.userhasToken) || (this.state.aTokens !==this.adminhasToken) ||  (this.state.sTokens !==this.managerhasToken)){
        console.log("state changed");
        // console.log("Manager",this.managerhasToken);
        this.setState({
          uTokens:this.userhasToken,
          aTokens:this.adminhasToken,
          sTokens:this.managerhasToken
        });
      }
    },10)
  }
  componentDidMount(){
    console.log("Component Did Mount()");
    this.getAll();
    this.setTime();   
  }
  componentWillUnmount(){
    clearInterval(this.timeInterval);
  }

  render(){
    return(
      <BrowserRouter>
      <App uToken={this.state.uTokens} aToken={this.state.aTokens} sToken={this.state.sTokens}/>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(
 <Index/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
