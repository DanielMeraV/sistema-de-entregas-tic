const bcrypt = require('bcrypt');
const UserService = require('./user.service');
const service = new UserService();


class AuthService {

    constructor() {}

    async login(username, password) {
        const user = await service.findByUsername(username);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        return user;
    }

    async signup(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await service.create({ ...userData, password: hashedPassword });
        return newUser;
    }

}

module.exports = AuthService;
