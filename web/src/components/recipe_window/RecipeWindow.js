import React, {useEffect, useState} from "react";
import './RecipeWindow.css'
import {api} from "../../BabysFoodPlaceAPI";
import {useNavigate} from "react-router-dom";
import icon from "../../icon_close.svg";

function RecipeWindow({recipeId}) {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        api.getRecipeById(recipeId).then(retrievedRecipe => setRecipe(retrievedRecipe));
    }, [recipeId]);
    const handleOnCloseWindowClick = () => {
        navigate({
            search: ''
        });
    };
    return <>
        {
            !recipe
                ? <></>
                : <div className="window">
                    <div className="window-content">
                        <div className="window-header">
                            <div className="window-title">{recipe.title}</div>
                            <div className="window-close" onClick={handleOnCloseWindowClick}><img src={icon} /></div>
                        </div>
                        <div className="window-body">
                            <div className="window-info">
                                <img src={api.getRecipeImageBaseUrl(recipe.image_file_name)} alt="Recipe"/>
                                <div className="window-info-category">
                                    <span className="window-info-category-text">Best Served For</span>
                                    <div className="window-info-category-label">{recipe.category}</div>
                                </div>
                                <p className="window-paragraph">{recipe.description}</p>
                                <div className="window-info-stats">
                                    <span className="card-info-icon">&#10711;</span>
                                    <span>{recipe.preparation_time} minutes</span>
                                    <span className="card-info-icon">&#127869;</span>
                                    <span>{recipe.no_people} persons</span>
                                    <span className="card-info-icon star">&#9733;</span> <span>{recipe.likes}</span>
                                </div>
                            </div>
                            <div className="window-text">
                                <h4 className="window-text-title">Recipe Details</h4>
                                <p className="window-paragraph">{recipe.recipe}</p>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </>;
}

export default RecipeWindow;