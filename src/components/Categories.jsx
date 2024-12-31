import React from 'react';
import categories from "../data/categories.json";
import {CategoryContext} from "../pages/Home.jsx";

function Categories () {
    const {activeCategory, setActiveCategory} = React.useContext(CategoryContext);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={activeCategory.id === category.id ? 'active' : ''}
                        >{category.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;