import {Redirect, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import auth from "../services/auth";

export const PrivateRoute = ({component: Component, ...rest}) => (

    <Route
        {...rest}
        render={(props) => (
            auth.loggedIn() ? (
                <Component {...props}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        )}
    />
);

export const LoginRoute = ({component: Component, ...rest}) => (

    <Route
        {...rest}
        render={(props) => (
            !auth.loggedIn() ? (
                <Component {...props}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        )}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
};

LoginRoute.propTypes = {
    component: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
};
