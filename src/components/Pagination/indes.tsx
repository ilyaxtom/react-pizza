import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
    return <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(event) => onChangePage(event.selected)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={currentPage}
        renderOnZeroPageCount={null}
    />
}

export default Pagination;