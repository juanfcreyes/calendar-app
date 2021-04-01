import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: '',
        loginPassword: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword1: '',
        registerPassword2: '',
    });

    const { loginEmail, loginPassword } = formLoginValues;

    const { registerName, registerEmail, registerPassword1, registerPassword2 } = formRegisterValues;

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(startLogin(formLoginValues.loginEmail, formLoginValues.loginPassword));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (registerPassword1 !== registerPassword2) {
            Swal.fire('Error', 'Passwords must be the same','error');
            return;
        }
        dispatch(startRegister({
            email: registerEmail,
            name: registerName,
            password: registerPassword1
        }));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin} id='loginSubmit'>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={loginEmail}
                                name='loginEmail'
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={loginPassword}
                                name='loginPassword'
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={registerName}
                                name='registerName'
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={registerEmail}
                                name='registerEmail'
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Paswword"
                                value={registerPassword1}
                                name='registerPassword1'
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                                value={registerPassword2}
                                name='registerPassword2'
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Sing in" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}