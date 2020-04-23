import React from 'react';

import './App.css';
import Register from './user/Register';
import Login from './user/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Register" component={Register}/>
      </Switch>
      <ToastContainer autoClose={1400} />   
    </div>
  );
}

export default App;
