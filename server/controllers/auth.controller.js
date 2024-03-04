// @desc Get all list
// @route GET /api/users/
// @access public

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" }); //({ path: path.join(__dirname, '.env') });
const __dirname = path.resolve();

// @desc Get all list
// @route GET /api/users/
// @access public


// const getUsers = (req, res) => {
//     const basicAuth = { username, password } = req.body;
//     console.log(username)
//     if ((username === 'test') && (password === 'test')) {
//         res.redirect("/app");

//     } else {
//         res.status(401);
//         res.send('Access forbidden');
//     }
// }

// module.exports = {
//     getUsers
// }