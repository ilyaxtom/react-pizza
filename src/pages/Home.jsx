import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Pagination from "../components/Pagination/indes.jsx";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";
import sortList from "../data/sortTypes.json";
import { fetchPizzas } from "../redux/slices/pizzaSlice.js";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { items, status } = useSelector(state => state.pizza);

    const searchValue = useSelector(state => state.filter.searchValue);
    const currentPage = useSelector(state => state.filter.currentPage);
    const activeCategory = useSelector(state => state.filter.categoryId);
    const activeSort = useSelector(state => state.filter.sort);

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
        if (isMounted.current) {
            const queryParams = qs.stringify({
                sortBy: activeSort.type,
                category: activeCategory,
                page: currentPage,
            });

            navigate(`?${queryParams}`);
        }
        isMounted.current = true;
    }, [currentPage, activeSort, activeCategory]);

    React.useEffect(() => {
        // if (window.location.search) {
        //     const params = qs.parse(window.location.search.substring(1));
        //
        //     const sort = sortList.find(obj => obj.type === params.sortBy);
        //
        //     dispatch(
        //         setFilters({
        //             categoryId: params.category,
        //             currentPage: params.page,
        //             sort,
        //         })
        //     );
        //
        //     isSearch.current = true;
        // }
        getPizzas();
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
             getPizzas();
        }

        isSearch.current = false;
    }, [currentPage, searchValue, activeSort, activeCategory]);

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ?
                        [...new Array(6)].map((_, i) => (<Skeleton key={i}/>)) :
                        items.map((pizzaObj, index) => (
                            <PizzaBlock key={index} {...pizzaObj} />
                        ))
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
        </>
    )
}

export default Home;