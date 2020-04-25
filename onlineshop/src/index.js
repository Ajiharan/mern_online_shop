import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

class Index extends React.Component{
  
  constructor(props){
    super(props);
      this.userhasToken="";
      this.adminhasToken="";
    this.state={
      uTokens:"",
      aTokens:""
    }
  }

  getAll(){
    this.userhasToken=JSON.parse(localStorage.getItem('auth'));
    this.adminhasToken=JSON.parse(localStorage.getItem('auth_admin'));
   
    this.setState({
      uTokens:this.userhasToken,
      aTokens:this.adminhasToken
    });
  }

  setTime(){
    setInterval(()=>{
    //  console.log("sdsd");
      this.userhasToken=JSON.parse(localStorage.getItem('auth'));
      this.adminhasToken=JSON.parse(localStorage.getItem('auth_admin'))
          // console.log("state asdminas TOken",this.state.aTokens);
          // console.log("AdminHas TOken",this.adminhasToken);
      if((this.state.uTokens !==this.userhasToken) || (this.state.aTokens !==this.adminhasToken)){
        console.log("state changed");
        this.setState({
          uTokens:this.userhasToken,
          aTokens:this.adminhasToken
        });
      }
    },10)
  }
  componentDidMount(){
    console.log("Component Did Mount()");
    this.getAll();
    this.setTime();   
  }

  


  render(){
    return(
      <BrowserRouter>
      <App uToken={this.state.uTokens} aToken={this.state.aTokens} />
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
