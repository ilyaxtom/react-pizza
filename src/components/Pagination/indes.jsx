import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

function Pagination({onPageChange}) {
    return <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(obj) => onPageChange(obj.selected)}
        pageRangeDisplayed={8}
        pageCount={3}
        renderOnZeroPageCount={null}
    />
}

export default Pagination;