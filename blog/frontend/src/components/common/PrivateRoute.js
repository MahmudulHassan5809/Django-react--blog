import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component,auth,...rest }) => {
    return (
        <Route
        {...rest}
        render={props => {
            if(auth.isLoading){
                return <h2>Loading.....</h2>
            }else if(!auth.isAuthenticated){
                return <Redirect to="/login" />
            }else{
                return <Component {...props} />
            }

        }}
        />
    )
}

PrivateRoute.propTypes = {
    auth : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
