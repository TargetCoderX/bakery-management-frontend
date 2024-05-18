import React, { useContext, useEffect, useState } from 'react';
import Guestlayout from '../layouts/Guestlayout';
import { titleContext } from '../../contextApis/TitleContext';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contextApis/LoginContext';
import Cookies from 'js-cookie';

function Login() {
    const title = useContext(titleContext);
    const login = useContext(loginContext);
    const navigate = useNavigate();

    /* setting page title using use context */
    useEffect(() => {
        title.settitle("Login");
    }, []);
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const [errors, seterrors] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value })
    }
    const submitLoginForm = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
            .then(async response => {
                let data = await response.json();
                if (data.status) {
                    Cookies.set('secret_token', data.token, { expires: 1 })
                    localStorage.setItem('user_data', JSON.stringify(data.user));
                    login.setisLoggedin(true);
                    navigate('/dashboard');
                } else {
                    seterrors(data);
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <Guestlayout>
            <form className="card card-md" autoComplete="off" noValidate onSubmit={(e) => { submitLoginForm(e) }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Create new account</h2>
                    {errors && (
                        <div class="alert alert-danger" role="alert">
                            {errors.message}
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' onChange={(e) => handleInputChange(e)} placeholder="Enter Email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' onChange={(e) => handleInputChange(e)} placeholder="Enter Password" />
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </div>
            </form>
        </Guestlayout>
    );
}

export default Login;
