import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.js";

const categories = [
    {
        title: "Все",
        id: 0
    },
    {
        title: "Мясные",
        id: 1
    },
    {
        title: "Вегетарианская",
        id: 2
    },
    {
        title: "Гриль",
        id: 3
    },
    {
        title: "Острые",
        id: 4
    },
    {
        title: "Закрытые",
        id: 5
    }
];

const Categories: React.FC = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state: any) => state.filter.categoryId);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => onChangeCategory(category.id)}
                            className={categoryId === category.id ? 'active' : ''}
                        >{category.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;