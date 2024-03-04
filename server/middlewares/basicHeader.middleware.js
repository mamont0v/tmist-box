//Authorization: Basic <username:password (base64)>
export default function (req, res, next, err) {
    try {
        //req.headers["x-access-token"] || req.headers.authorization () || req.body.token;
        //or headers.authorization  
        const authorizedHeader = req.headers.authorization || req.headers['authorization'] || req.headers["x-access-token"] || req.body.token
        console.log('authorizedHeader', authorizedHeader)
        if (!authorizedHeader || authorizedHeader === null) {
            console.log('Error')
            return next(err)
        }

        const accessToken = authorizedHeader.split(' ')[1]
        if (!accessToken) {
            console.log('Error')
            return next(err)
        }

        const userData = TokenService.validationAccess(accessToken)
        if (!userData) {
            console.log('Error')
            return next(err)
        }

        req.user = userData

        console.log('userData', userData)
        console.log('req.user', req.user)
        next()

    } catch (err) {
        return next(err)
    }
}