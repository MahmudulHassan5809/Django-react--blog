import React,{useState,useEffect} from 'react';
import { Link,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


import { createMessage } from '../../actions/messageActions';

import { connect } from 'react-redux';
import { register } from '../../actions/authActions';

const Register = ({isAuthenticated,register,history,createMessage}) => {

    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
        // eslint-disable-next-line
    },[isAuthenticated,history]);

    const [user,setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username,email,password,password2 } = user;

    const onChange = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });

    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(password != password2){
            createMessage({passwordNotMatch: 'Password Does Not Match'});
        }else{
            const newUser = {
                username,
                password,
                email
            }
            register(newUser);
        }

    };

    return (
        <div>
            <div className="col-md-6 m-auto">
                <div className="card card body mt-5">
                    <h2 className="text-center">Register</h2>
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
                            <label htmlFor="email">Email</label>
                            <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={onChange}
                            value={email}
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

                       <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                            type="password"
                            name="password2"
                            className="form-control"
                            onChange={onChange}
                            value={password2}
                            />
                       </div>

                       <input type="submit" value="Register" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    isAuthenticated : PropTypes.bool,
    register : PropTypes.func.isRequired,
    createMessage : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps,{register,createMessage})(Register);
