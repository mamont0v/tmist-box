// import ValidationError from './errorHandlers.middleware.js';
import TokenService from '../services/token.service.js';

//Authorization: Bearer <token>
// err если передать то не будет работать middleware
const checkAuth = async (req, res, next) => {
    try {
        //req.headers["x-access-token"] || req.headers.authorization () || req.body.token;
        //or headers.authorization  
        const authorizedHeader = await req.headers.authorization || req.headers["x-access-token"] || req.body.token;
        if (!authorizedHeader) {
            next(new Error('UnauthorizedError'));
            return;
        }
        
        // обеспечить правильную проверку типа, добавив проверки, чтобы убедиться, что authorizedHeaderстрока действительно является строкой и содержит хотя бы один пробел, прежде чем пытаться ее разделить
        if (typeof authorizedHeader !== 'string' || !authorizedHeader.includes(' ')) {
            next(new Error('UnauthorizedError'));
            return;
        }

        const accessToken = authorizedHeader.split(' ')[1];
        if (!accessToken) {
            next(new Error('UnauthorizedError'));
            return;
        }

        const userData = TokenService.validationAccess(accessToken)
        if (!userData) {
            next(new Error('UnauthorizedError'));
            return;
        }
        req.user = userData;
        next();
    } catch (err) {
        next(err); // ! ValidationError.UnauthorizedError
    }
}

export default checkAuth;