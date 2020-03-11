import React from 'react';

const Persons = (props) => {
    
    return (
        <div>
            {props.numbersToShow.map(person => 
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={props.deleteBtnClick.bind(this, person.id)}>delete</button>
                </p>
            )}
        </div>
    );
};

export default Persons;