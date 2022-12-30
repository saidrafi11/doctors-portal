import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';
import AppointmentOptions from './AppointmentOptions';
import AvaiableAppointments from './AvailableAppointments/AvaiableAppointments';

const Appointment = () => {
    const [selected, setSelected] = useState(new Date())
    return (
        <div>
            <AppointmentBanner selected={selected}
            setSelected={setSelected}></AppointmentBanner>
            <AvaiableAppointments selected={selected}></AvaiableAppointments>
            
        </div>
    );
};

export default Appointment;