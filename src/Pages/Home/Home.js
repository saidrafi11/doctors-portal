import React from 'react';
import Banner from './Banner';
import Cards from './Cards';
import InfoCards from './InfoCards';
import MakeAppointment from './Layout/MakeAppointment/MakeAppointment';
import Service from './Layout/Service/Service';
import Services from './Layout/Service/Services';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;