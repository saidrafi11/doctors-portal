import React from 'react';


const Cards = ({card}) => {
const {name, description, icon, bgClass} =card
    
    return (
        <div className={`card text-white md:card-side  shadow-xl ${bgClass} p-6`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                   
                </div>
            </div>
        </div>
    );
};

export default Cards;