import { updateCurrentUser } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import {toast} from 'react-hot-toast'
import useToken from '../../../Hooks/useToken';


const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {createUser, updateUser} = useContext(AuthContext)
    const [signUpErr, setSignUpErr] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token]= useToken(createdUserEmail)
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])
    

    const handleSignUp = data => {
        setSignUpErr('')
        console.log(data)
        createUser(data.Email, data.Password)
        .then(result =>{
            const user= result.user
            console.log(user)
            toast('User')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=>{
                saveUser(data.Name, data.Email)
               
                
            })
            .catch(err => console.log(err))
        })
        .catch(error => {
            console.log(error)
            setSignUpErr(error.message)
        })
    }

    const saveUser = (name, email) =>{
        const user = {name, email};
        fetch('https://doctors-portal-server-sooty-five.vercel.app/users', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)

        }).then(res => res.json())
        .then(data=>{
            setCreatedUserEmail(email)
            // getUserToken(email)
            // console.log(data)
           
        })
    }
    // const getUserToken = email=>{
    //     fetch(`https://doctors-portal-server-sooty-five.vercel.app/jwt?email=${email}`)
    //     .then(res => res.json())
    //     .then(data =>{
    //         if(data.accessToken){
    //             localStorage.setItem('accessToken', data.accessToken)
    //             navigate('/');
    //         }
    //     })
    // }

    return (
        <div className=' h-[800px] flex justify-center items-center text-black'>

            <div className='w-96 p-7'>
                <h2 className='text-xl'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>

                        </label>
                        <input type="text" {...register("Name", { required: "Name is required" })} placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        {errors.Name && <p className='text-red-600 text-sm' role="alert">{errors.Name?.message}</p>}
                    </div>



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
                        <input type="password" {...register("Password", {
                            required: "Password is required", minLength: {
                                value: 6, message: "Password must be 6 characters long",


                                // password validation
                                
                            }
                            // , 
                            // pattern: { value: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/, message: "password must be strong" }
                        })} placeholder="Password" className="input input-bordered w-full max-w-xs" />
                        {errors.Password && <p className='text-red-600 text-sm' role="alert">{errors.Password?.message}</p>}
                        {/* {errors.Password?.type==="pattern" && <p className='text-red-600 text-sm' role="alert">{errors.Password?.message}</p>} */}

                    </div>

                    <input className='btn btn-accent w-full' type="submit" value='Signup' />
                </form>

                <p>Already have an account <Link to='/login' className='text-secondary'>Please login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Continue with google</button>
            </div>
        </div>
    );
};

export default Signup;