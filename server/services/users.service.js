import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import model from '../models/index.js';
import MailService from './mail.service.js';
import TokenService from './token.service.js';
import UserDto from '../dtos/users.dto.js';
import ValidationError from '../dtos/errors.dto.js';


// public async name // для typescript
// public - это есть сокращение this.name = name в typescript

class UserService {
    async signup(email, password) {

        /**
         * 1. Проверяем существует ли пользователь в БД
         * Если существует то выбрасываем ошибку
         * req.body.email нет потому что мы берем значения из параметров функции { email: email }
        */

        const userExist = await model.Users.findOne({ email })

        if (userExist) {
            throw ValidationError.BadRequest(`${userExist} уже занят`)
        }

        /**
         * 2) Генерируем для пользователя пароли и ссылку подтверждения, создаем запись в БД с этими параметрами
         * bcypt implementation
         * const passwordHashed = await bcrypt.hash(password, 5, (err, hash) => { console.log(err) })
         *
         * Hash password only if the password has been changed or is new
         * if(!user.isModified('password')) return next();
        */

        // Hash password
        const passwordHashed = await argon2.hash(password)

        // Generate random activation link
        const activationLink = await uuidv4();
        const user = await model.Users.create({ email, password: passwordHashed, activationLink }) // or {email} потому что {email: email}

        await MailService.sendActivationEmail(email, `${process.env.SERVER_URL}/api/v1/users/activation/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateAccessAndRefreshTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activateLink(activationLink) {
        const user = await model.Users.findOne({ activationLink })
        if (!user) {
            throw ValidationError.BadRequest('Неккоректная ссылка активации')
        }

        user.isActivated = true;

        await user.save();
    }


    async login(email, password) {
        // Find user
        const candidate = await model.Users.findOne({ email })

        // Check
        if (!candidate) {
            const error = ValidationError.BadRequest('Не правильный логин или пароль', 401)
            return next(error)
        }

        // Compare password
        const isPassEquals = await argon2.verify(candidate.password, password)

        // Check
        if (!isPassEquals) {
            const error = ValidationError.BadRequest('Не правильный логин или пароль', 401)
            return next(error)
        }

        const userDto = new UserDto(candidate)
        const tokens = TokenService.generateAccessAndRefreshTokens({ ...userDto })

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }

    }


    async logout(refreshToken) {
        const token = await TokenService.delete(refreshToken)
        return token
    }


    async refresh(refreshToken) {
        // если null или undefined т.е. пользователь неавторизован
        if (!refreshToken) {
            throw ValidationError.UnauthorizedError();
        }
        // проверка на поддердку токена и срок годности не истек для обоих токенов
        const userData = TokenService.validationRefresh(refreshToken);

        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ValidationError.UnauthorizedError(); // ! ApiError
        }
        // дергаем пользака поскольку инфа могла сильно обновиться
        const user = await model.Users.findById(userData.id);
        // как и при логине создаем ы
        const userDto = new UserDto(user);
        const tokens = TokenService.generateAccessAndRefreshTokens({ ...userDto });

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await model.Users.find();
        return users;
    }



}


export default new UserService();