import React from 'react';

const Persons = (props) => {
    return (
        <div>
            {props.numbersToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    );
};

export default Persons;