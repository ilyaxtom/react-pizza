import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.js";
import categories from "../data/categories.json";

function Categories () {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => dispatch(setCategoryId(category.id))}
                            className={categoryId === category.id ? 'active' : ''}
                        >{category.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;