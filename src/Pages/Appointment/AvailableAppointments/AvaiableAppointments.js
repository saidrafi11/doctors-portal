import React, { useState } from 'react';
import { format} from 'date-fns'
import AppointmentOptions from '../AppointmentOptions';
import BookingModal from './BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvaiableAppointments = ({selected}) => {
    // const [appointmentOptions, setAppointmentOptions]= useState([])
    const [treatment, setTreatment] = useState(null)
    
    const date = format(selected, 'PP')

    
    const {data:appointmentOptions =[], refetch, isLoading} = useQuery({
        queryKey:['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sooty-five.vercel.app/appointmentoptions?date=${date}`);
            const data = await res.json();
            return data;
        } 
        
    })

    if(isLoading){
        return <Loading></Loading>
    }

    // useEffect(()=> {
    //     fetch('https://doctors-portal-server-sooty-five.vercel.app/appointmentoptions')
    //     .then(res => res.json())
    //     .then(data => setAppointmentOptions(data))
    // })

    return (
        <section className='mt-16'>
            <p className='font-bold text-primary'>Available appointments {format(selected, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                    appointmentOptions.map(option => <AppointmentOptions key={option._id} appointmentOption={option} setTreatment={setTreatment}
                    refetch={refetch}></AppointmentOptions>)
                }
            </div>
            {
                treatment && 
                <BookingModal selected={selected} treatment={treatment} refetch={refetch} setTreatment={setTreatment}></BookingModal>
            }
        </section>
    );
};

export default AvaiableAppointments;