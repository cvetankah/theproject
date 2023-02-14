import React from "react";
import dateFormat from "dateformat";
import {api} from "../../BabysFoodPlaceAPI";
// import logo from '../../icon_trashcan.svg'

function RecipesTableRow(props) {
    const {recipe, onClick, onDelete} = props;
    const handleDeleteClick = (recipeId) => {
        api.deleteRecipeById(recipeId).then(response => {
            alert(response.ok ? 'Success' : 'Failure');
            onDelete();
        });
    };
    return <>
        <tr className="table-row">
            <td onClick={() => onClick(recipe)}>{recipe.title}</td>
            <td>
                <div className="table-category">{recipe.category}</div>
            </td>
            <td>{dateFormat(new Date(recipe.created_at), "dd.mm.yyyy")}</td>
            <td><span onClick={() => {handleDeleteClick(recipe._id)}}>&#128465;</span></td>
            {/* <td><img src={logo} onClick={() => {handleDeleteClick(recipe._id)}}/></td> */}
        </tr>
    </>;
}

export default RecipesTableRow;