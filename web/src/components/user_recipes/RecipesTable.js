import React, {useEffect, useState} from "react";
import RecipesTableRow from "./RecipesTableRow";

function mapRecipesToTableRows(recipes, onClick, onDelete) {
    return recipes.map(recipe => (
        <RecipesTableRow key={recipe._id} recipe={recipe} onClick={onClick} onDelete={onDelete}/>));
}

function RecipesTable({recipes, onRecipesTableRowClick, onRecipesTableRowDelete}) {
    const [tableRows, setTableRows] = useState([]);
    useEffect(() => {
        setTableRows(mapRecipesToTableRows(recipes, onRecipesTableRowClick, onRecipesTableRowDelete));
    }, [recipes, onRecipesTableRowClick, onRecipesTableRowDelete]);
    return <>
        <table className="table">
            <thead>
            <tr className="table-header">
                <th>Recipe Name</th>
                <th>Category</th>
                <th>Created On</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {tableRows}
            </tbody>
        </table>
    </>;
}

export default RecipesTable;