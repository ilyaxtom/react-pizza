import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

function Pagination({currentPage, onChangePage}) {
    return <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(event) => onChangePage(event.selected)}
        pageRangeDisplayed={8}
        pageCount={3}
        pageForce={currentPage}
        renderOnZeroPageCount={null}
    />
}

export default Pagination;