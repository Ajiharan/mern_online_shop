import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
const UserProtected = ({component,...rest}) => {
    let RenderComponent=component;
    console.log(Component);
    let userhasToken=JSON.parse(localStorage.getItem('auth'));
    return (
      <Route
        {...rest}
        render={
            props=>{
                console.log("Component",props);
                return userhasToken !==null ?(<RenderComponent {...props}/>):(  <Redirect
                    to={{
                        pathname:'/Login'
                    }}
                    />)

            }
        }
      
      
      />
    );
};

export default UserProtected;