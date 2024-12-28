import React from 'react';
import './scss/app.scss';
import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
import Skeleton from "./components/Skeleton.jsx";

function App() {
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
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                isLoading ?
                [... new Array(6)].map((_, i) => (<Skeleton key={i} />)) :
                items.map((pizzaObj, index) => (
                    <PizzaBlock key={index} {...pizzaObj} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
}

export default App;