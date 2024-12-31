import React from 'react';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Pagination from "../components/Pagination/indes.jsx";
import {SearchContext} from "../App.jsx";

const SortContext = React.createContext();
const CategoryContext = React.createContext();

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [sortType, setSortType] = React.useState({ type: 'rating', title: 'популярности'})
    const [activeCategory, setActiveCategory] = React.useState({ title: "Все", id: 0 });

    const {searchValue} = React.useContext(SearchContext);

    const search = searchValue ? `&search=${searchValue}` : '';
    const sort = `&sortBy=${sortType.type}&order=${sortType.type === 'title' ? 'asc' : 'desc'}`;
    const category = activeCategory.id === 0 ? "" : `&category=${activeCategory.id}`;

    React.useEffect(() => {
        fetch(`https://676ff962b353db80c3240e51.mockapi.io/pizza/items?page=${currentPage + 1}&limit=4${search}${sort}${category}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [currentPage, searchValue, sortType, activeCategory]);

    return (
        <>
            <div className="content__top">
                <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
                    <Categories/>
                </CategoryContext.Provider>
                <SortContext.Provider value={{sortType, setSortType}}>
                    <Sort/>
                </SortContext.Provider>
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

export {SortContext};
export {CategoryContext};
export default Home;