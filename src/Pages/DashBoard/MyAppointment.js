import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Button } from 'react-day-picker';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext)

    const url = `https://doctors-portal-server-sooty-five.vercel.app/bookings?email=${user?.email}`;

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn:async () => {
            const res = await fetch(url,{
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })
    return (
        <div>
            <h1 className='text-center
          text-3xl p-5'>My Appointment</h1>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead className='text-white'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Treatment</th>
        <th>Date</th>
        <th>Time</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      {/* <!-- row 1 --> */}
      {
        bookings?.length && bookings.map((booking, i)=> <tr key={booking._id}>
        <th>{i+1}</th>
        <td>{booking.patient}</td>
        <td>{booking.treatment}</td>
        <td>{booking.appointmentDate}</td>
        <td>{booking.slot}</td>
        <td>

          {
            booking.price && !booking.paid &&<Link to={`/dashboard/payment/${booking._id}`} className='btn btn-primary'>Pay</Link>
          }
          {
            booking.price && booking.paid && 
            <p>Paid</p>
          }
        </td>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;