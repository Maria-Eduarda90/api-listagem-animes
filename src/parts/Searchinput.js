import React, { useState } from 'react';
import useDebounce from '../useDebounced';
import '../searchinput.css';
{/**/}
const SearchInput = ({ value, onChange }) => {
    const [ displayValue, setDisplayValue ] = useState(value);
    const debouncedChange = useDebounce(onChange, 500);

    function heandleChange(event) {
        setDisplayValue(event.target.value);
        debouncedChange(event.target.value);
    }

    return(
        <input className="search" type="search" placeholder="pesquise por um anime" value={displayValue} onChange={heandleChange}/>
    );
}

export default SearchInput;