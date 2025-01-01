import React from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Pagination from "../components/Pagination/indes.jsx";
import { SearchContext } from "../App.jsx";

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const {searchValue} = React.useContext(SearchContext);
    const activeCategory = useSelector((state) => state.filter.categoryId);
    const activeSort = useSelector((state) => state.filter.sort);

    React.useEffect(() => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const sort = `&sortBy=${activeSort.type}&order=${activeSort.type === 'title' ? 'asc' : 'desc'}`;
        const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;

        axios.get(`https://676ff962b353db80c3240e51.mockapi.io/pizza/items?page=${currentPage + 1}&limit=4${search}${sort}${category}`)
        .then(res => {
            setItems(res.data);
            setIsLoading(false);
        });

        window.scrollTo(0, 0);
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
            <Pagination onPageChange={(number) => setCurrentPage(number)} />
        </>
    )
}

export default Home;