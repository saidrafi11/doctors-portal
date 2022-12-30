import { useQuery } from '@tanstack/react-query';
import is from 'date-fns/esm/locale/is/index.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate= useNavigate('/dashboard/managedoctors')

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-sooty-five.vercel.app/appointmentspeciality')
            const data = await res.json()
            return data;
        }
    })

    const handleAddDoctor = data => {
        console.log(data)
        const image = data.img[0];
        console.log(image)
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        console.log(url)
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res =>res.json())
        .then(imgData=>{
            console.log(imgData)
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }
                fetch('https://doctors-portal-server-sooty-five.vercel.app/doctors',{
                    method:'POST',
                    headers: {
                        'content-type':'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                }).then(res=> res.json())
                .then(result =>{
                  toast.success(`${data.name} is added succesfully`)
                })
            }
        })
    };


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            Add a doctor
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>

                    </label>
                    <input type="text" {...register("name", { required: "Name is required" })} placeholder="Name" className="input input-bordered w-full max-w-xs" />
                    {errors.Name && <p className='text-red-600 text-sm' role="alert">{errors.Name?.message}</p>}
                </div>



                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input type="text" {...register("email", { required: "Email Address is required" })} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    {errors.Email && <p className='text-red-600 text-sm' role="alert">{errors.Email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>

                    </label>
                    <select {...register("specialty", { required: "Specialty is required" })} className="select select-bordered w-full max-w-xs mb-5">
                        <option disabled selected>Please select a specialty</option>
                        {
                            specialties.map(specialty => <option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
                        }


                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>

                    </label>
                    <input type="file" {...register("img", { required: "Photo is required" })} placeholder="Photo" className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-600 text-sm' role="alert">{errors.img?.message}</p>}
                </div>

                <input className='btn btn-accent w-full' type="submit" value='Add' />
            </form>
        </div>
    );
};

export default AddDoctor;