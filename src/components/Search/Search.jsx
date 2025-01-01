import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss'
import {SearchContext} from "../../App.jsx";
import crossIcon from "./cross.png";

function Search() {
    const [value, setValue] = React.useState('');
    const {searchValue, setSearchValue} = React.useContext(SearchContext);
    const inputRef = React.useRef();

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 500),
        []
    )

    const handleChange = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    }

    const crossClick = () => {
        setValue('');
        setSearchValue("");
        inputRef.current.focus();
    }

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                placeholder="Поиск"
                value={value}
                onChange={handleChange}
            />
            {searchValue !== "" && <img src={crossIcon} alt="cross" onClick={crossClick}/>}
        </div>
    )
}

export default Search;