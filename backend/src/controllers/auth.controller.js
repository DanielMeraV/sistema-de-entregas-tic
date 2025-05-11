const { models } = require('../config/connPgDB');
const { generateTokenAndSetCookie } = require('../lib/utils/generateToken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { username, password, name, userType } = req.body;

        const existingUser = await models.User.findOne({ where: { username: username } });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'El usuario ya existe' });
        }

        if (password.length < 6) {
            return res.status(400).send({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await models.User.create({ username, password: hashedPassword, name, userType });

        const newUser = await models.User.findOne({ where: { username: username } });
        generateTokenAndSetCookie(newUser.id, res);

        res.json(newUser);
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await models.User.findOne({ where: { username: username } });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!user || !isPasswordCorrect) {
            return res.status(400).send({ error: "Usuario o contraseña incorrectos" });
        }

        generateTokenAndSetCookie(user.id, res);

        res.json(user);

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(401).send({ error: "Internal Server Error" });
    }
}

module.exports = { signup, login };