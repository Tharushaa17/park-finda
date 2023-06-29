import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

const AuthorizedRoute = ({ component: Component, roles, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                roles && authUser.role && roles.includes(authUser.role) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/app/company',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default AuthorizedRoute;