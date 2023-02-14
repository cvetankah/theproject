import React, {useEffect, useState} from "react";
import "./UserRecipes.css";
import decode from 'jwt-decode';
import {api} from "../../BabysFoodPlaceAPI";
import RecipesTable from "./RecipesTable";
import RecipeForm from "./RecipeForm";

function UserRecipes() {
    const [displayedRecipe, setDisplayedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const localStorageJwt = localStorage.getItem('jwt');
    const userId = decode(localStorageJwt).uid;
    useEffect(() => {
        api.getAllRecipesByUserId(userId).then(recipes => setRecipes(recipes));
    }, [userId]);
    const handleRecipesTableRowClick = (recipe) => {
        setDisplayedRecipe(recipe);
    };
    const handleRecipesTableRowDelete = () => {
        api.getAllRecipesByUserId(userId).then(recipes => setRecipes(recipes));
    }
    const handleBackButtonClick = () => {
        api.getAllRecipesByUserId(userId).then(recipes => {
            setRecipes(recipes);
            setDisplayedRecipe(null);
        });
    };
    const handleAddButtonClick = () => {
        setDisplayedRecipe({category: 'breakfast', no_people: 1, preparation_time: 10});
    };
    return <div className="user-recipes-content">
        <div className="title-nav">
            <div className="title-nav-text">My Recipes</div>
            <div className="title-nav-link">
                {
                    displayedRecipe ?
                        <button className="back" onClick={handleBackButtonClick}>&#11178;</button> :
                        <button className="add" onClick={handleAddButtonClick}>+</button>
                }
            </div>
        </div>
        {
            displayedRecipe ? <RecipeForm recipe={displayedRecipe}/> :
                <RecipesTable recipes={recipes} onRecipesTableRowClick={handleRecipesTableRowClick}
                              onRecipesTableRowDelete={handleRecipesTableRowDelete}/>
        }
    </div>;
}

export default UserRecipes;
