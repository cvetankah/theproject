import './Home.css';
import React, { useEffect, useState } from "react";
import {useLocation } from "react-router-dom";
import RecipesList from "../recipes_list/RecipesList";
import { api } from '../../BabysFoodPlaceAPI';
import RecipeWindow from '../recipe_window/RecipeWindow';

function sortRecipesByCreatedAt(recipes) {
    return recipes.sort((r1, r2) => new Date(r2.created_at) - new Date(r1.created_at));
}

function sortRecipesByNumberOfLikes(recipes) {
    return recipes.sort((r1, r2) => r2.likes - r1.likes);
}

function Home() {
    const location = useLocation();
    const [freshAndNewRecipes, setFreshAndNewRecipes] = useState([]);
    const [mostPopularRecipes, setMostPopularRecipes] = useState([]);
    const [recipeWindow, setRecipeWindow] = useState(null);
    useEffect(() => {
        async function getRecipesFromApi() {
            const recipes = await api.getAllRecipes();
            const recipesSortedByCreatedAt = sortRecipesByCreatedAt(recipes);
            setFreshAndNewRecipes(recipesSortedByCreatedAt.slice(0, 3));
            setMostPopularRecipes(sortRecipesByNumberOfLikes(recipesSortedByCreatedAt.slice(3, recipesSortedByCreatedAt.size)));
        }
        getRecipesFromApi();
    }, []);
    useEffect(() => {
        const recipeId = new URLSearchParams(location.search).get("showRecipe");
        setRecipeWindow(recipeId ? <RecipeWindow recipeId={recipeId}/> : null);
    }, [location.search]);
    return (
        <div className="content">
            <RecipesList title="Fresh & New" recipes={freshAndNewRecipes}/>
            <RecipesList title="Most Popular Recipes" recipes={mostPopularRecipes}/>
            {recipeWindow}
        </div>
    );
}

export default Home;