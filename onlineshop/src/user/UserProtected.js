import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
const UserProtected = ({component,...rest}) => {
    let RenderComponent=component;
    console.log(Component);
    let userhasToken=JSON.parse(localStorage.getItem('auth'));
    console.log("userToken",userhasToken);
    return (
      <Route
        {...rest}
        render={
            props=>{
                console.log("Component",props);
                return userhasToken !==null ?(<RenderComponent {...rest} {...props}/>):(  <Redirect
                    to={{
                        pathname:'/user/Login'
                    }}
                    />)

            }
        }
      
      
      />
    );
};

export default React.memo(UserProtected);