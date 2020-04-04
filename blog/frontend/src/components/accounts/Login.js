import React,{useState,useEffect} from 'react';
import { Link,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const Login = ({isAuthenticated,login,history}) => {
    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
        // eslint-disable-next-line
    },[isAuthenticated,history]);

    const [user,setUser] = useState({
        username: '',
        password: ''
    });

    const { username,password } = user;

    const onChange = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });

    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(username,password);

    };

    return (
        <div>
            <div className="col-md-6 m-auto">
                <div className="card card body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={onChange}
                            value={username}
                            />
                       </div>



                       <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={onChange}
                            value={password}
                            />
                       </div>

                       <input type="submit" value="Login" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    isAuthenticated : PropTypes.bool,
    login : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);

