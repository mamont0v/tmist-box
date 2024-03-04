import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); //({ path: path.join(__dirname, '.env') });
// const __dirname = path.resolve();


const jwtAuth = async (req, res, next) => {
    try {
        // check if auth header exists
        if (req.headers.authorization) {
            // parse token from header
            const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
            console.log('token', token);
            if (token) {
                const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
                if (payload) {
                    // store user data in request object
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "No authorization header" });
        }
        // next();
    } catch (error) {
        res.status(400).json({ error });
    }
};

export default jwtAuth;