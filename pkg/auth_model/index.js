const mongoose = require('mongoose');
let fs = require('fs');

const User = mongoose.model(
    'user', {
        first_name: String,
        last_name: String,
        email: String,
        birthday: Date,
        password: String,
        avatarFileBase64: String
    },
    'users'
)

const create = async (data) => {
    const u = await new User(data);
    return u.save(data);
};

const getUserByEmail = (email) => {
    return User.findOne({email})
};

const getById = async (uid, data) => {
    return User.findOne({_id: uid}, data)
};

const changePersonalInfo = async (uid, data) => {
    // vtorniot parametar e nesto sto primam od request-ot za toa kako treba da se primaat podatodite (toa e input-ot)
    // const filter = {uid: uid}
    return User.updateOne({_id: uid}, data)
};

// const convertDefaultAvatarToBase64 = () => {
//     const fileBase64 = fs.readFileSync(`${__dirname}/../../assets/default-avatar.png`, 'base64');
//     return `data:image/png;base64,${fileBase64}`;
// };

module.exports = {
    create,
    getUserByEmail,
    getById,
    changePersonalInfo
};