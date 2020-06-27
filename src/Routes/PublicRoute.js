import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
const PublicRoute = ({component: Component, ...rest} )=>(  
    <Route
        {...rest}
        render= {props =>
            !sessionStorage.getItem("id")   ? (
            <Component {...props}/>
           
        ) : (
            <Redirect exact to="/user/login"/>
        )
    }/>
);
export default PublicRoute;