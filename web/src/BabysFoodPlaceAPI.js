import decode from "jwt-decode";

const baseUrl = "http://localhost:10000/api/v1";

const decodeUserIdFromJwt = () => {
    const localStorageJwt = localStorage.getItem('jwt');
    if (localStorageJwt) {
        return  decode(localStorageJwt).uid;
    }
    return null;
};

const api = {

    getAllRecipes() {
        const requestOptions = {
            method: 'GET',
            headers: {'UserId': decodeUserIdFromJwt()}
        };
        return fetch(`${baseUrl}/recipes`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    getRecipeById(id) {
        const requestOptions = {
            method: 'GET',
            headers: {'UserId': decodeUserIdFromJwt()}
        };
        return fetch(`${baseUrl}/recipes/${id}`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    getAllRecipesByCategory(category) {
        const requestOptions = {
            method: 'GET',
            headers: {'UserId': decodeUserIdFromJwt()}
        };
        return fetch(`${baseUrl}/recipes?category=${category}`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    getAllRecipesByUserId(userId) {
        return fetch(`${baseUrl}/recipes?userId=${userId}`)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    createRecipe(recipe, recipeImageFile) {
        const recipeFormData = new FormData();
        Object.keys(recipe).forEach(key => recipeFormData.append(key, recipe[key]));
        if (recipeImageFile) {
            recipeFormData.append("recipe_image_file", recipeImageFile);
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
            body: recipeFormData
        };
        return fetch(`${baseUrl}/recipes`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    updateRecipe(recipe, recipeImageFile) {
        const recipeFormData = new FormData();
        Object.keys(recipe).forEach(key => recipeFormData.append(key, recipe[key]));
        if (recipeImageFile) {
            recipeFormData.append("recipe_image_file", recipeImageFile);
        }
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
            body: recipeFormData
        };
        return fetch(`${baseUrl}/recipes/${recipe._id}`, requestOptions)
            .then((response) => response)
            .catch((error) => console.error(error));
    },
    likeRecipeWithId(recipeId) {
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
        };
        return fetch(`${baseUrl}/recipes/${recipeId}/like`, requestOptions)
            .then((response) => response)
            .catch((error) => console.error(error));
    },
    deleteRecipeById(recipeId) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
        };
        return fetch(`${baseUrl}/recipes/${recipeId}`, requestOptions)
            .then((response) => response)
            .catch((error) => console.error(error));
    },
    loginUser(user) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        return fetch(`${baseUrl}/auth/login`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    createUser(user) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        return fetch(`${baseUrl}/users`, requestOptions)
            .then((response) => response)
            .catch((error) => console.error(error));
    },
    getLoggedInUser() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
        };
        return fetch(`${baseUrl}/users`, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    },
    updateUser(user, avatarFile) {
        const userFormData = new FormData();
        Object.keys(user).forEach(key => userFormData.append(key, user[key]));
        if (avatarFile) {
            userFormData.append("avatar_file", avatarFile);
        }
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
            body: userFormData
        };
        return fetch(`${baseUrl}/users`, requestOptions)
            .then((response) => response)
            .catch((error) => console.error(error));
    },
    getRecipeImageBaseUrl(recipeImageFileName) {
        return `${baseUrl}/recipes/images/${recipeImageFileName}`;
    }
};

export {api};