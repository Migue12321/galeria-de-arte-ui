import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("role") && sessionStorage.getItem("id") ? (
        <Component {...props} />
      ) : (
        <Redirect exact to="/user/login" />
      )
    }
  />
);
export default PrivateRoute;
