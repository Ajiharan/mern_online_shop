import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
const StoreManagerProtected = ({component,...rest}) => {
    let RenderComponent=component;
    console.log(Component);
    let managerhasToken=JSON.parse(localStorage.getItem('auth_manager'));
    console.log("userToken",managerhasToken);
    return (
      <Route
        {...rest}
        render={
            props=>{
                console.log("Component",props);
                return managerhasToken !==null ?(<RenderComponent {...props}/>):(  <Redirect
                    to={{
                        pathname:'/manager/Login'
                    }}
                    />)

            }
        }
      
      
      />
    );
};

export default StoreManagerProtected;