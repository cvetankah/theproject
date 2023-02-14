const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipe', {
        title: String,
        category: String,
        preparation_time: Number,
        no_people: Number,
        description: String,
        recipe: String,
        user_id: String,
        created_at: Date,
        image_file_name: String,
        likedBy: {
            type: Array,
            default: []
        }
    },
    'recipes'
);

const create = async (data) => {
    const r = await new Recipe(data);
    return r.save(data)
};

const getAll = async (userId, category) => {
    let filter = {};
    if (userId !== undefined) {
        filter = {
            user_id: userId
        };
    }
    if (category !== undefined) {
        filter = {
            ...filter,
            category: category
        };
    }
    return Recipe.find(filter).lean();
};

const getById = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return Recipe.findOne({_id: id}).lean();
    }
    return null;
};

const update = async (id, userId, updatedRecipe) => {
    return Recipe.updateOne({_id: id, user_id: userId}, updatedRecipe)
};

const deleteByIdAndUserId = async (id, userId) => {
    return Recipe.deleteOne({_id: id, user_id: userId})
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteByIdAndUserId
}