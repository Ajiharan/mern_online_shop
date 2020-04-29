import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
const AdminProtected = ({component,...rest}) => {
    let RenderComponent=component;
    // console.log(Component);
    let userhasToken=JSON.parse(localStorage.getItem('auth_admin'));
    // console.log("userToken",userhasToken);
    return (
      <Route
        {...rest}
        render={
            props=>{
                // console.log("Component",props);
                return userhasToken !==null ?(<RenderComponent {...props}/>):(  <Redirect
                    to={{
                        pathname:'/admin/Login'
                    }}
                    />)

            }
        }
      
      
      />
    );
};

export default AdminProtected;