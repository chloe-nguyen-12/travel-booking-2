import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.loggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect pathname='/' />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
