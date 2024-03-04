import jwt from 'jsonwebtoken';
import model from '../models/index.js';

// В базе можно хранить сколько угодно refresh токенов на один userId
// payload = {id, password, name}
// jwt (data, signature, time);

class TokenService {
    generateAccessAndRefreshTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '28d' })
        return {
            accessToken,
            refreshToken
        }
    }

    // @Desc Сохранение в базу данных refresh roken
    // Удаление экспайрет токены
    // ? feature req: реализовать выйти со всех устройств для того чтобы удалить все refresh токены
    // ? проблема с забиванием базы устаревшими токенами решается написанием утилиты, которая раз в сутки / неделю / месяц чекает каждый токен на живучесть и сносит его, если помер.

    async saveToken(userId, refreshToken) {
        const token = await model.Token.findOne({ user: userId })
        if (token) {
            token.refreshToken = refreshToken;
            return token.save();
        }
        // Если пользак логинится впервые то создадим ему новую пару токенов
        const newToken = await model.Token.create({ user: userId, refreshToken })
        return newToken;
    }

    // при каждом запросе на поиск токена проверка срока его действия и удаления из БД, если он протух
    // ? что по производительности что дергается БД постояно либо лучше отдельный скриптик который раз в неделю запускается
    //  расписание задач для периодической очистки протухших токенов. Например, node-cron
    async findUserByToken(token) {
        const newToken = await model.Token.findOneAndDelete({ refreshToken: token, expiresAt: { $lt: new Date() } });
        return newToken;
    }

    async delete(token) {
        const newToken = await model.Token.deleteOne({ refreshToken: token });
        return newToken;
    }

    validationRefresh(token) {
        try {
            const refreshToken = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
            return refreshToken;
        } catch (err) {
            return null;
        }
    }

    validationAccess(token) {
        try {
            const accessToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            return accessToken;
        } catch (err) {
            return null;
        }
    }

    async findToken(token) {
        // можно передать refreshToken в функцию и вызвать просто refreshToken
        const newToken = await model.Token.findOne({ refreshToken: token });
        return newToken;
    }

}

export default new TokenService();