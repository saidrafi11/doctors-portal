import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking= useLoaderData();
const { treatment, price, appointmentDate, slot} = booking
    return (
        <div>
            <h1>Payment for {treatment}</h1>
            <h1>Please pay {booking.price} for your appointment on {appointmentDate}</h1>
        </div>
    );
};

export default Payment;