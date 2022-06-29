import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
const Login = () => {
    const dispatch = useDispatch()
    const loginSubmitHandler = (ev) => {
        ev.preventDefault();
        const form = new FormData(ev.target)
        const user = {
            email: form.get('email'),
            password: form.get('password'),
        }
        dispatch(authActions.login(user))
    }
    return (
        <div className='container d-flex align-items-center justify-content-center' style={{ height: `100vh` }}>
            <form className="container w-50" onSubmit={loginSubmitHandler}>
                <div className="mb-3">
                    <h5>
                        Login
                    </h5>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" />
                </div>

                <button type='submit' className="btn btn-primary">Login</button>

            </form>

        </div >
    )
}

export default Login