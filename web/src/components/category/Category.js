import './Category.css';
import React, {useEffect, useState} from "react";
import RecipesList from "../recipes_list/RecipesList";
import {Navigate, useLocation, useParams} from "react-router-dom";
import {api} from "../../BabysFoodPlaceAPI";
import RecipeWindow from "../recipe_window/RecipeWindow";

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function Category() {
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const validCategories = ["breakfast", "brunch", "lunch", "dinner"];
    const params = useParams();
    const category = params.category;
    const [recipeWindow, setRecipeWindow] = useState(null);
    useEffect(() => {
        async function getRecipesFromApi() {
            const recipesForCategory = await api.getAllRecipesByCategory(category);
            setRecipes(recipesForCategory);
        }
        getRecipesFromApi();
    }, [category]);
    useEffect(() => {
        const recipeId = new URLSearchParams(location.search).get("showRecipe"); // kreiram url search parametars kade sto so .get("") go definiram value-to na query parametarot
        setRecipeWindow(recipeId ? <RecipeWindow recipeId={recipeId}/> : null);
    }, [location.search]);
    if (!validCategories.includes(category)) {
        return <Navigate to={{pathname: "/recipes"}}/>;
    }
    return (
        <div className="content">
            <RecipesList title={capitalizeFirstLetter(category)} recipes={recipes}/>
            {recipeWindow}
        </div>
    );
}

export default Category;