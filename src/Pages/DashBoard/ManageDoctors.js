import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)
    const closeModal = () => {
        setDeletingDoctor(null)
    }

    


    const { data: doctors, isLoading, refetch } = useQuery({

        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-sooty-five.vercel.app/doctors', {
                    headers: {
                        authoriztion: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json()
                console.log(data)
                return data;
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    const handleDeleteDoctor = doctor => {
        fetch(`https://doctors-portal-server-sooty-five.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(result=>{
            console.log(result)
            if(result.deletedCount){
                refetch()
                toast.success('Doctor deleted successfully')
            }
            
        })
    }


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full ">

                    <thead>
                        <tr className='text-white'>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={doctor.
                                            image
                                        } />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn btn-sm">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal  successAction={handleDeleteDoctor}
                successButtonName="Delete" modalData={deletingDoctor} title={`Are you sure you want to delete?`} message={`If you delete ${deletingDoctor.name} it cannot be undone!`} closeModal={closeModal}></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;