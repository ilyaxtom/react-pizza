import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.js";
import categories from "../data/categories.json";

const Categories: React.FC = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state: any) => state.filter.categoryId);

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