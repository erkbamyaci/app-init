import {Redirect, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

export const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (

    <Route
        {...rest}
        render={(props) => (
            isAuthenticated ? (
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

export const LoginRoute = ({component: Component, isAuthenticated, ...rest}) => (

    <Route
        {...rest}
        render={(props) => (
            !isAuthenticated ? (
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
