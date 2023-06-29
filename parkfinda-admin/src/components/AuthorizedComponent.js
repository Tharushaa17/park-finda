import React from 'react';

const AuthorizedComponent = ({ component, roles, authUser }) => {
    return (
        roles && authUser.role && roles.includes(authUser.role) ? (
            component
        ) : (
            <></>
        )
    );
};

export default AuthorizedComponent;