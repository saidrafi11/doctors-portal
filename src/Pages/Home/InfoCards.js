import React from 'react';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg'
import phone from '../../assets/icons/phone.svg'
import Cards from './Cards';

const InfoCards = () => {
    const cardsData = [
        {
            id:1,
            name: "Openning Hours",
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: clock,
            bgClass:'bg-primary'
        },
        {
            id:2,
            name: "Our location",
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: marker,
            bgClass:'bg-accent'
        },
        {
            id:1,
            name: "Contact us",
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: phone,
            bgClass:'bg-primary'
        },
    ]
    return (
        <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
            {
                cardsData.map(card =><Cards key={card.id} card={card}></Cards>)
            }
        </div>
    );
};

export default InfoCards;