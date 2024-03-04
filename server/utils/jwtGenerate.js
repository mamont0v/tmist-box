// import jwt from "jsonwebtoken";

// const jwtKey = process.env.JWTKEY
// const jwtExpirySeconds = 300

// const users = {
// 	test: "test"
// }

// export default (res, userId) => {

	// Get credentials from JSON body
	// const { username, password } = req.body
	// if (!username || !password || users[username] !== password) {
	// 	return 401 error is username or password doesn't exist, or if password does
	// 	not match the password in our records
	// 	return res.status(401).end()
	// }

	// Create a new token with the username in the payload
	// and which expires 300 seconds after issue

	// const token = jwt.sign({ userId }, jwtKey, {
	// 	algorithm: "HS256",
	// 	expiresIn: '30d',
	// })

	// set the cookie as the token string, with a similar max age as the token
	// here, the max age is in milliseconds, so we multiply by 1000
	// res.cookie("jwt", token, {
	//	httpOnly: true,
		// secure: true,
// 		sameSite: 'strict',
// 		maxAge: jwtExpirySeconds * 1000
// 	})
// }

