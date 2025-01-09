import React from 'react';
import { useSelector } from 'react-redux'
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination/indes";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";
import {fetchPizzas, SearchPizzaParams} from "../redux/slices/pizzaSlice.js";
import { useAppDispatch } from "../redux/store";
import { sortList } from "../components/Sort";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { items, status } = useSelector((state: any) => state.pizza);

    const searchValue = useSelector((state: any) => state.filter.searchValue);
    const currentPage = useSelector((state: any) => state.filter.currentPage);
    const activeCategory = useSelector((state: any) => state.filter.categoryId);
    const activeSort = useSelector((state: any) => state.filter.sort);

    const getPizzas = async () => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const sort = `&sortBy=${activeSort.type}&order=${activeSort.type === 'title' ? 'asc' : 'desc'}`;
        const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;

        dispatch(
            fetchPizzas({
                search,
                sort,
                category,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    }

    React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryParams = {
    //             sortBy: activeSort.type,
    //             category: activeCategory > 0 ? activeCategory : null,
    //             page: currentPage,
    //         };
    //
    //         const queryString = qs.stringify(queryParams, { skipNulls: true });
    //
    //         navigate(`?${queryString}`);
    //     }

        // const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
        // const sortObj = sortList.find((obj) => obj.title === params.sort);
        // dispatch(
        //   setFilters({
        //     searchValue: params.search,
        //     categoryId: Number(params.category),
        //     currentPage: Number(params.currentPage),
        //     sort: sortObj || sortList[0],
        //   }),
        // );

        getPizzas();
    //     isMounted.current = true;
    }, [currentPage, activeSort, activeCategory, searchValue]);

    // React.useEffect(() => {
        // if (window.location.search) {
        //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
        //
        //     const sort= sortList.find(obj => obj.type === params.sort);
        //
        //     dispatch(
        //         setFilters({
        //             searchValue: params.search,
        //             categoryId: +params.category,
        //             currentPage: +params.currentPage,
        //             sort,
        //         })
        //     );
        //
        //     isSearch.current = true;
        // }
    //     getPizzas();
    // }, []);

    // React.useEffect(() => {
    //     getPizzas();
    //     window.scrollTo(0, 0);
    // }, [currentPage, searchValue, activeSort, activeCategory]);

    const skeletonBlocks = [...new Array(6)].map((_, i) => (
        <Skeleton key={i}/>
    ));
    const itemsBlocks = items.map((pizzaObj: any, index: number) => (
        <PizzaBlock key={index} {...pizzaObj} />
    ));

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { status === 'loading' ? skeletonBlocks : itemsBlocks }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(page: number) => dispatch(setCurrentPage(page))} />
        </>
    )
}

export default Home;