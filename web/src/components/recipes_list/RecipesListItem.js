import React, { useState } from "react";
import "./RecipesListItem.css";
import imageTime from '../../icon_time.svg';
import imagePlate from '../../icon_plate.svg';
// import imageStar from '../../icon_star.svg';
import imageArrows from '../../icon_arrows_white.svg'
import { useNavigate } from "react-router-dom";
import { api } from "../../BabysFoodPlaceAPI";

function shortenDescription(description) {
    return description.length <= 230 ? description : description.slice(0, 230) + '...';
}

const RecipesListItem = (props) => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(props.recipe);
    const handleShowRecipeClick = (recipeId) => {
        navigate({
            search: `?showRecipe=${recipeId}`
        })
    };
    const handleLikeRecipeClick = (recipeId) => {
        api.likeRecipeWithId(recipeId).then(response => {
            if (response.ok) {
                const likes = recipe.likedByUser ? recipe.likes - 1 : recipe.likes + 1;
                const likedByUser = !recipe.likedByUser;
                setRecipe(recipe => {
                    return {...recipe, likes: likes, likedByUser: likedByUser};
                });
            }
        });
    }
    return (
        <div className="card">
            <div className="card-label">{recipe.category}</div>
            <div className="card-image">
                <img src={api.getRecipeImageBaseUrl(recipe.image_file_name)} alt="Recipe Card"/>
            </div>
            <div className="card-text">
                <div className="card-text-title">{recipe.title}</div>
                <div className="card-text-description">{shortenDescription(recipe.description)}</div>
            </div>
            <div className="card-info">
                {/* <span className="card-info-icon">&#10711;</span> <span>{recipe.preparationTime} minutes</span> */}
                <span className="card-info-icon"><img src={imageTime}/></span> <span className="card-element-info">{recipe.preparation_time} minutes</span>
                {/* <span className="card-info-icon">&#127869;</span> <span>{recipe.numberOfPeople} person</span> */}
                <span className="card-info-icon"><img src={imagePlate}/></span> <span className="card-element-info">{recipe.no_people} persons</span>
                {/* <span className="card-info-icon">&#9734;</span> <span>{recipe.likes}</span> */}
                <span className={`card-info-icon ${recipe.likedByUser ? 'gold-star' : 'star'}`}
                      onClick={() => handleLikeRecipeClick(recipe._id)}>&#9733;</span>
                <span>{recipe.likes}</span>
            </div>
            <div className="card-button">
                {/* <button>&gt;&gt;</button> */}
                <button onClick={() => {handleShowRecipeClick(recipe._id)}}><img src={imageArrows}/></button>
            </div>
        </div>
    )
};

export default RecipesListItem;