import { Router } from 'express';
import * as controller from '../controllers/users.controller.js';
import { body } from 'express-validator';
import checkAuth from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * Можно сделать Error Handler в роутинге напримере:
 * app.post('/testing', async (err, req, res, next) => {
    return next(new Error('Something broke again! 😱'))
})
 */

/**
 * Можем использовать отдельное мидделваре, либо в один прописать проверку на типы и управление ошибками или же в контроллере использовать в блоке catch мидделваре для ошибок, и там же в try validationErrors для express-validator
 * router.get(api, ...middlewares)
 */


/** 
 * @desc Get all list
 * @route GET /api/users/
 * @access public
*/

router.get('/', checkAuth, controller.getUsers);

// tokens
router.get('/activation/:link', controller.activation);
router.get('/refresh', controller.refresh);
router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32 }),
    controller.signup
);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;

