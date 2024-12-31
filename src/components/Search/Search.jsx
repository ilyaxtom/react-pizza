import React from 'react';
import styles from './Search.module.scss'
import {SearchContext} from "../../App.jsx";

function Search() {
    const {searchValue, setSearchValue} = React.useContext(SearchContext);

    return (
        <input
            className={styles.root}
            placeholder="Поиск"
            value={searchValue}
            onChange={(event) => {setSearchValue(event.target.value)}}
        />
    )
}

export default Search;