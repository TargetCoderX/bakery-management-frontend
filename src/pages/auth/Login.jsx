import React from 'react';
import Guestlayout from '../layouts/Guestlayout';

function Login() {
    return (
        <Guestlayout>
            <form className="card card-md" autocomplete="off" novalidate>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Create new account</h2>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter Email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" />
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
