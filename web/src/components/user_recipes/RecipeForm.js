import React, {useEffect, useState} from "react";
import "./UserRecipes.css";
import {api} from "../../BabysFoodPlaceAPI";

import {useForm} from "react-hook-form";

function RecipeForm(props) {
    const [recipe, setRecipe] = useState(props.recipe);
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const setFormData = () => {
        if (recipe) {
            reset({
                title: recipe.title,
                category: recipe.category,
                no_people: recipe.no_people,
                preparation_time: recipe.preparation_time,
                description: recipe.description,
                recipe: recipe.recipe
            });
        }
    };
    useEffect(setFormData, [recipe, reset]);
    const handleOnSaveFormSubmit = (updatedRecipe) => {
        const recipeId = recipe._id;
        const recipeImageFile = updatedRecipe.recipe_image.length > 0 ? updatedRecipe.recipe_image[0] : null;
        if (recipeId) {
            updatedRecipe._id = recipeId;
            api.updateRecipe(updatedRecipe, recipeImageFile).then(response => getRecipeById(recipeId));
        } else {
            api.createRecipe(updatedRecipe, recipeImageFile).then(createdRecipe => getRecipeById(createdRecipe._id));
        }
    };
    const getRecipeById = (recipeId) => {
        api.getRecipeById(recipeId).then(recipe => setRecipe(recipe));
    };
    return <>
        <div className="recipe-save">
            <div className="recipe-image">
                <span className="label">Recipe Image</span>
                <input id="recipe_image" type="file" {...register("recipe_image", {required: !recipe._id})}
                       accept="image/*"/>
                {
                    recipe.image_file_name ?
                        <img src={api.getRecipeImageBaseUrl(recipe.image_file_name)} alt="Recipe"/> :
                        <img src={require('../../recipe-image-placeholder.avif')} alt="Recipe Placeholder"/>
                }
                <label htmlFor="recipe_image" className="label-button">
                    {errors.recipe_image?.type !== "required" ? "upload image" : "no image selected"}
                </label>
            </div>
            <div className="recipe-text">
                <form onSubmit={handleSubmit(handleOnSaveFormSubmit)} className="recipe-form">
                    <div className="recipe-form-title">
                        <label htmlFor="title">
                            Recipe Title&nbsp;
                            {
                                errors.title &&
                                <span className="error">
                                    {errors.title.type === "required" && "(required)"}
                                    {errors.title.type === "pattern" && "(should not be empty)"}
                                </span>
                            }
                        </label>
                        <input {...register("title", {required: true, pattern: /\S+/})}/>
                    </div>
                    <div className="recipe-form-category">
                        <label htmlFor="category"><br/><span className="error">&nbsp;</span>Category</label>
                        <select {...register("category")}>
                            <option value="breakfast">Breakfast</option>
                            <option value="brunch">Brunch</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                    <div className="recipe-preparation-time">
                        <label htmlFor="preparation_time">
                            <span
                                className={`error ${errors.no_people?.type !== "required" && "invisible"}`}>(required)</span><br/>
                            Preparation time
                        </label>
                        <input {...register("preparation_time", {required: true})}/>
                    </div>
                    <div className="recipe-no-people">
                        <label htmlFor="no_people">
                            <span
                                className={`error ${errors.no_people?.type !== "required" && "invisible"}`}>(required)</span><br/>
                            No. People
                        </label>
                        <input {...register("no_people", {required: true})}/>
                    </div>
                    <div className="recipe-short-description">
                        <label htmlFor="description">
                            Short Description&nbsp;
                            {
                                errors.description &&
                                <span className="error">
                                    {errors.description.type === "required" && "(required)"}
                                    {errors.description.type === "pattern" && "(should not be empty)"}
                                </span>
                            }
                        </label>
                        <textarea {...register("description", {required: true, pattern: /\S+/})}></textarea>
                    </div>
                    <div className="recipe-preparation">
                        <label htmlFor="recipe">
                            Recipe&nbsp;
                            {
                                errors.recipe &&
                                <span className="error">
                                    {errors.recipe.type === "required" && "(required)"}
                                    {errors.recipe.type === "pattern" && "(should not be empty)"}
                                </span>
                            }
                        </label>
                        <textarea {...register("recipe", {required: true, pattern: /\S+/})}></textarea>
                    </div>
                    <div className="recipe-save-button">
                        <button className="green" type="submit">save</button>
                    </div>
                </form>
            </div>
        </div>
    </>;
}

export default RecipeForm;