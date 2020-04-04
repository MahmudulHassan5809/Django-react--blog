import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const Header = ({auth:{isAuthenticated,user},logout}) => {
    const onLogout = () => {
        logout();

    }
    const authLinks = (
            <Fragment>
                <li className="nav-item">
                    <Link to="/my/dashboard" className="nav-link">My Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/add/article" className="nav-link">Add Article</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link btn btn-info btn-sm text-light" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </Fragment>
        );

    const guestLinks = (
            <Fragment>
                <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </Fragment>
        );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">React Django</Link>
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                           <Link to="/" className="nav-link">Home</Link>
                        </li>
                        { isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Header.propTypes = {
    auth : PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps,{logout})(Header);
