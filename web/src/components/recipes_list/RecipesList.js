import React, { useEffect, useState } from "react";
import './RecipesList.css';
import RecipesListItem from './RecipesListItem';

const RecipesList = (props) => {
    const {title, recipes} = props;
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards(recipes.map(recipe => <RecipesListItem key={recipe._id} recipe={recipe}/>));
    }, [recipes]);
    return (
        <>
            <div className="title">
                <span className="title-text">{title}</span>
            </div>
            <div className="cards">
                { cards }
            </div>
        </>
    )
}

export default RecipesList;