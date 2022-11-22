import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./user";

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Outlet
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 0 ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
