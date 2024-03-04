import dotenv from 'dotenv';
import usersService from '../services/users.service.js';
import { validationResult } from 'express-validator';

dotenv.config();


export const signup = async (req, res, next) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(err) // ! переделать
        }
        const { email, password } = req.body;
        // Функция signup возвращает токен и инфу о пользователе
        const userData = await usersService.signup(email, password);
        // рефреш токен храним в куках
        // для HTTPS добавить флаг secure
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        });
        // Возвращаем на клиент
        return res.json(userData)

    } catch (err) {
        next(err)
    }
}

export const activation = async (req, res, next) => {
    try {
        const activationLink = req.params.link
        await usersService.activateLink(activationLink)
        return res.redirect(process.env.SERVER_URL)
    } catch (err) {
        next(err)
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await usersService.login(email, password)

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        });
        // Возвращаем на клиент
        return res.json(userData)

    } catch (err) {
        next(err)
    }
}


export const logout = async (req, res, next) => {
    try {
        // destructuring entry "refreshToken" in cookie
        const { refreshToken } = req.cookies;

        // Do "Log Out" (optional: send "token" if needed)
        const token = await usersService.logout(refreshToken)
        // clear cookie
        res.clearCookie('refreshToken')

        // return result
        res.status(200).json({ message: 'All good' })
        //res.redirect('http://localhost:5088/') //редирект на основную 
    } catch (err) {
        next(err)
    }
}


export const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await usersService.refresh(refreshToken)

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        });
        // Возвращаем на клиент
        return res.json(userData)

    } catch (err) {
        next(err)
    }
};



export const getUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers();

        return res.json(users);
    } catch (err) {
        next(err)
    }
};

















