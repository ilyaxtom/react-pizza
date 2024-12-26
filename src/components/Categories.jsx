import React from 'react';

function Categories () {
    const categories = ['Все', 'Мясные','Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const [activeCategory, setActiveCategory] = React.useState(0);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={activeCategory === index ? 'active' : ''}
                        >{category}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;