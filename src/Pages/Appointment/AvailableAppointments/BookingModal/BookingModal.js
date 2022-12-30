import React, { useContext } from 'react';
import { format } from 'date-fns'
import { AuthContext } from '../../../../Context/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, selected, refetch }) => {
    
    const { name: treatmentName, slots, price } = treatment;
    const date = format(selected, 'PP');
    const {user} = useContext(AuthContext)
    console.log(user)


const handleBooking = event =>{
    event.preventDefault();
    const form= event.target
    const PatientName= form.name.value
    const email = form.email.value
    const slot = form.slot.value
    const phone = form.phone.value

    const booking = {
        appointmentDate : date,
        treatment: treatmentName,
        patient: PatientName,
        slot,
        phone,
        email,
        price
    }
    fetch('https://doctors-portal-server-sooty-five.vercel.app/bookings', {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(booking)
    }).then(res=> res.json())
    .then(data => {
        console.log(data)
        if(data.acknowledged){
            toast.success('Booking confirmed')
            setTreatment(null)
            refetch()
        }
        else{
            toast.error(data.message)
        }
        
        
    })
    
}
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10 text-white'>
                        <input type="text" value={date} disabled className="input w-full input-bordered" />
                        <select name='slot' className="select w-full text-black">
                            
                            {
                                slots.map(slot =><option value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" placeholder="Your name" className="input w-full input-bordered text-black" defaultValue={user?.displayName} />
                        <input name='email' type="email" placeholder="Email" className="input w-full input-bordered text-yellow" defaultValue={user?.email} disabled/>
                        <input name='phone' type="text" placeholder="Type here" className="input w-full input-bordered text-black" />
                        <br />
                        <input className='w-full input-bordered btn btn-accent w-full input-bordered' type="submit" value='submit' />

                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;