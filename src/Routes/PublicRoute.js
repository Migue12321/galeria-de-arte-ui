import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
const PublicRoute = ({component: Component, ...rest} )=>(  
    <Route
        {...rest}
        render= {props =>
            !sessionStorage.getItem("role")   ? (
            <Component {...props}/>
           
        ) : (
            <Redirect exact to="/home"/>
        )
    }/>
);
export default PublicRoute;