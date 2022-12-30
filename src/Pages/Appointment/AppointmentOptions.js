import React from 'react';

const AppointmentOptions = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center ">
                <h2 className="text-4xl text-primary text-center">{name}</h2>

                <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space' } available</p>

                <p className=''>Price: {price}</p>
                <div className="card-actions justify-end">
                    
                    <label disabled={slots.length === 0} htmlFor="booking-modal" className="btn btn-primary text-white" onClick={()=> setTreatment(appointmentOption)}>Book appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;