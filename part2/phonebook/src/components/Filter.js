import React from 'react';

const Filter = (props) => {

    return (
        <div>
            filter shown with: <input value={props.searchKey} 
            onChange={props.handleSearchInput}/>
        </div>
    );
};

export default Filter;