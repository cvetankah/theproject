const mongoose = require('mongoose');
const user = require('../../../pkg/auth_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../pkg/config');

const create = async (req, res) => {
    const password = req.body.password ? req.body.password : "";
    if (password.trim().length === 0 || password !== req.body.repeat_password) {
        return res.status(400).send('Bad request.')
    }
    let u = await user.getUserByEmail(req.body.email);
    if (u) {
        return res.status(409).send('Conflict.')
    }
    req.body.password = bcrypt.hashSync(password);
    await user.create(req.body);
    return res.status(200).send('New user successfully created.');
};

const getById = async (req, res) => {
    try {
        let retrievedUser = await user.getById(req.auth.uid);
        retrievedUser.password = undefined;
        return res.status(200).send(retrievedUser);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error!')
    }
};

const update = async (req, res) => {
    try {
        const updatedUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday
        }
        const password = req.body.password ? req.body.password : "";
        if (password.trim().length !== 0 && password === req.body.repeat_password) {
            updatedUser['password'] = bcrypt.hashSync(password);
        }
        if (req.files) {
            updatedUser['avatarFileBase64'] = convertFileToBase64(req.files.avatar_file);
        }
        await user.changePersonalInfo(req.auth.uid, updatedUser);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error!')
    }
};

const login = async (req, res) => {
    try {
        let u = await user.getUserByEmail(req.body.email);
        if (!u) {
            return res.status(409).send('Bad request. Bad login credentials.')
        }
        if (!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Cannot login. Bad credentials.')
        }
        let payload = {
            uid: u._id,
            email: u.email,
            password: u.password,
            birthday: u.birthday,
            first_name: u.first_name,
            last_name: u.last_name
        };
        let token = jwt.sign(payload, config.get('security').jwt_secret);
        return res.status(200).send({token});
    } catch (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error.')
        }
    }
};

// const validate = async (req, res) => {
//     // express-jwt e toa sto go koristam za validacija na token. Toa mi e middleware kade sto se stava secretot i kazuvas so koi algoritmi treba da se pravi validacijata 
//     // znaci otkako ke go dekodira tokenot, gi stava podatocite vo req.auth za da mozam jas da gi procitam
//     console.log(req.auth);
//     return res.status(200).send(req.auth); // returns the token payload
// };

const convertFileToBase64 = (avatarFile) => {
    const fileBase64 = Buffer.from(avatarFile.data).toString('base64');
    return `data:${avatarFile.mimetype};base64,${fileBase64}`;
};

module.exports = {
    create,
    getById,
    update,
    login
    // validate
};