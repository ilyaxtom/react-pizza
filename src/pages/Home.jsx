import React from 'react';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://676ff962b353db80c3240e51.mockapi.io/pizza/items')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });
    }, []);

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
        </>
    )
}

export default Home;