import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Pagination from "../components/Pagination/indes.jsx";
import { SearchContext } from "../App.jsx";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";
import sortList from "../data/sortTypes.json";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const {searchValue} = React.useContext(SearchContext);
    const currentPage = useSelector(state => state.filter.currentPage);
    const activeCategory = useSelector(state => state.filter.categoryId);
    const activeSort = useSelector(state => state.filter.sort);

    const fetchPizzas = () => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const sort = `&sortBy=${activeSort.type}&order=${activeSort.type === 'title' ? 'asc' : 'desc'}`;
        const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;

        axios.get(`https://676ff962b353db80c3240e51.mockapi.io/pizza/items?page=${currentPage + 1}&limit=4${search}${sort}${category}`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
        });
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
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.type === params.sortBy);

            dispatch(
                setFilters({
                    categoryId: params.category,
                    currentPage: params.page,
                    sort,
                })
            );

            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
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
                    isLoading ?
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