import React from 'react';
import fluoride from '../../../../assets/images/fluoride.png';
import cavity from '../../../../assets/images/cavity.png';
import whitening from '../../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
    const servicesData = [
        {
            id:1,
            name:'Flouride Treatment',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius id, harum a voluptates ex velit laborum, laboriosam similique doloremque iure culpa, facere ducimus accusantium at incidunt placeat! Beatae, dolor atque.',
            img: fluoride

        },
        {
            id:2,
            name:'Cavity Filling',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius id, harum a voluptates ex velit laborum, laboriosam similique doloremque iure culpa, facere ducimus accusantium at incidunt placeat! Beatae, dolor atque.',
            img: cavity

        },
        {
            id:3,
            name:'Teeth Whitening',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius id, harum a voluptates ex velit laborum, laboriosam similique doloremque iure culpa, facere ducimus accusantium at incidunt placeat! Beatae, dolor atque.',
            img: whitening

        }
    ]
    return (
        <div>
            <div className='mt-16'>
                <h2 className='text-primary uppercase text-xl font-bold'>Out Services</h2>
                <h3 className='text-3xl'>Services we provide</h3>
            
            </div>
            <div className='grid gap-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3'>
                {
                   servicesData.map(service=><Service key={service.id} s={service}></Service>) 
                }
            </div>
        </div>
    );
};

export default Services;