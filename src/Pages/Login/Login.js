import React, { useContext, useEffect } from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';



const Login = () => {
    const {user} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginErr, setLoginErr] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'
    useEffect(()=>{
        if(token){
            navigate(from, {replace: true})
            // console.log(token)
        }
    },[token])
    // console.log(loginUserEmail);
    const { signIn } = useContext(AuthContext)

    const handleLogin = data => {
        
        setLoginErr('')
        console.log(data)
        signIn(data.Email, data.Password)
            .then(result => {
                const user = result.user
                setLoginUserEmail(data.Email)
                // console.log(user)
               
            })
            .catch(error => {
                setLoginErr(error.message)
            })
    }


    return (
        <div className=' h-[800px] flex justify-center items-center text-black'>

            <div className='w-96 p-7'>
                <h2 className='text-xl'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>



                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input type="text" {...register("Email", { required: "Email Address is required" })} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        {errors.Email && <p className='text-red-600 text-sm' role="alert">{errors.Email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input type="password" {...register("Password", { required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters long" } })} placeholder="Password" className="input input-bordered w-full max-w-xs" />
                        {errors.Password && <p className='text-red-600 text-sm' role="alert">{errors.Password?.message}</p>}

                        {
                            loginErr && <p className='text-red-600 text-sm'>{loginErr}</p>
                        }
                        <label className="label">
                            <span className="label-text">Forget password</span>

                        </label>
                    </div>

                    <input className='btn btn-accent w-full' type="submit" value='login' />
                </form>

                <p>New to doctors portal <Link to='/signup' className='text-secondary'>Signup</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Continue with google</button>
            </div>
        </div>
    );
};

export default Login;