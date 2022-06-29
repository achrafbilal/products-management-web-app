import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

const Register = () => {
    const dispatch = useDispatch()
    const registerSubmitHadnler = (ev) => {
        ev.preventDefault();
        const form = new FormData(ev.target)
        let password = form.get('password')
        let passwordConfirmation = form.get('passwordConfirmation')
        if (password !== passwordConfirmation) {
            alert('Passwords are not the same')
            return
        }

        const setData = async () => {
            const user = {
                email: form.get('email'),
                password: form.get('password'),
                fullName: form.get('fullName'),
                roleId: 2
            }
            try {
                const { data } = await axios.post('http://localhost:3000/users', user)
                dispatch(authActions.register(data))
            } catch (error) {
                console.error(error);
            }
        }

        setData()
    }
    return (
        <div className='container d-flex align-items-center justify-content-center' style={{ height: `100vh` }}>
            <form className="container w-50" onSubmit={registerSubmitHadnler}>
                <div className="mb-3">
                    <h5>
                        Register
                    </h5>
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name='fullName' id="fullName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='passwordConfirmation' id="passwordConfirmation" />
                </div>
                <button type='submit' className="btn btn-primary">Register</button>

            </form>
        </div>
    )
}

export default Register