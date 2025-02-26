import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.js";
import styles from './Search.module.scss'
import crossIcon from "./cross.png";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 500),
        []
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    const crossClick = () => {
        setValue('');
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    }

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                placeholder="Поиск"
                value={value}
                onChange={handleChange}
            />
            {value !== "" && <img src={crossIcon} alt="cross" onClick={crossClick}/>}
        </div>
    )
}

export default Search;