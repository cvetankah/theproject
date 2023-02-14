const mongoose = require('mongoose');
const recipes = require('../../../pkg/recipes_model/recipes');
const strings = require('../../../pkg/strings');
var path = require('path');
const fileSystem = require ('fs');

const getRecipes = async (req, res) => {
    try {
        const userId = req.query.userId;
        const category = req.query.category;
        const authUserId = req.get("UserId");// localStorage, front-end
        let allRecipes = await recipes.getAll(userId, category);
        allRecipes = allRecipes.map(recipe => {
            recipe.likes = recipe.likedBy.length;
            recipe.likedByUser = recipe.likedBy.includes(authUserId);
            delete recipe.likedBy;
            return recipe;
        });
        return res.status(200).send(allRecipes)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error')
    }
};

const getRecipeImage = async (req, res) => {
    const fileName = req.params.fileName;
    console.log(`getting recipe image ${fileName}`);
    res.sendFile(path.resolve(`${__dirname}/../../../uploads/${fileName}`));
};

const createRecipe = async (req, res) => {
    try {
        const recipeImageFile = req.files ? req.files.recipe_image_file : null;
        const recipeImageFileName = await createImageFileForRecipe(recipeImageFile);
        let createdRecipe = {
            ...req.body,
            user_id: req.auth.uid,
            created_at: new Date(),
        };
        if (recipeImageFileName) {
            createdRecipe.image_file_name = recipeImageFileName;
        }
        const data = await recipes.create(createdRecipe);
        return res.status(201).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error.')
    }
};

const getRecipeById = async (req, res) => {
    try {
        let recipe = await recipes.getById(req.params.id);
        if (recipe === null) {
            return res.status(404).send(null);
        }
        const authUserId = req.get("UserId");// localStorage, front-end
        recipe.likes = recipe.likedBy.length;
        recipe.likedByUser = recipe.likedBy.includes(authUserId);
        delete recipe.likedBy;
        return res.status(200).send(recipe);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error.')
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const authUserId = req.auth.uid;
        const recipe = await recipes.getById(recipeId);
        if (recipe === null) {
            return res.status(404).send('');
        } else if (recipe.user_id !== authUserId) {
            return res.status(403).send('');
        }
        const recipeImageFile = req.files ? req.files.recipe_image_file : null;
        const recipeImageFileName = await updateImageFileForRecipe(recipe, recipeImageFile);
        let updatedRecipe = {
            ...req.body,
            user_id: authUserId,
        }
        if (recipeImageFileName) {
            updatedRecipe.image_file_name = recipeImageFileName;
        }
        await recipes.update(recipeId, authUserId, updatedRecipe);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error.');
    }
};

const deleteRecipeById = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const authUserId = req.auth.uid;
        const recipe = await recipes.getById(recipeId);
        if (recipe === null) {
            return res.status(404).send('');
        } else if (recipe.user_id !== authUserId) {
            return res.status(403).send('');
        }
        await recipes.deleteByIdAndUserId(recipeId, authUserId);
        return res.status(200).send('')
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error.')
    }
};

const updateImageFileForRecipe = async (recipe, newRecipeImageFile) => {
    const existingRecipeImageFileName = recipe.image_file_name;
    if (existingRecipeImageFileName && newRecipeImageFile) {
        console.log(`deleting recipe image file ${existingRecipeImageFileName}`);
        try {
            fileSystem.unlinkSync(`${__dirname}/../../../uploads/${existingRecipeImageFileName}`);
        } catch (e) {
            console.log(e);
        }
    }
    return await createImageFileForRecipe(newRecipeImageFile);
}

const createImageFileForRecipe = async (recipeImageFile) => {
    if (recipeImageFile) {
        const recipeImageFileName = `${strings.random(10)}.${recipeImageFile.mimetype.split('/')[1]}`;
        console.log(`creating recipe image file ${recipeImageFileName}`);
        await recipeImageFile.mv(`${__dirname}/../../../uploads/${recipeImageFileName}`);
        return recipeImageFileName;
    }
    return null;
}

const likeRecipeWithId = async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipes.getById(recipeId);
    if (recipe === null) {
        return res.status(404).send('');
    }
    const userId = req.auth.uid;
    if (!recipe.likedBy.includes(userId)) {
        recipe.likedBy.push(userId);
    } else {
        recipe.likedBy = recipe.likedBy.filter(uid => uid !== userId);
    }
    await recipes.update(recipeId, recipe.user_id, recipe);
    return res.status(204).send('');
}

module.exports = {
    getRecipes,
    getRecipeImage,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipeById,
    likeRecipeWithId
}