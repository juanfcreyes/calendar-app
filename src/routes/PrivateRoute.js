import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRouter = ( { isAuthenticated, component: Component, ...rest } ) => {
    return (
        <Route {...rest}  component={(props) => (
            (isAuthenticated)
            ? <Component {...props}></Component>
            : <Redirect to='/login'></Redirect>
        )}>
        </Route>
    )
}

PrivateRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}