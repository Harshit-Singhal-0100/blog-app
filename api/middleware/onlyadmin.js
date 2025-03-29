import jwt from 'jsonwebtoken'
export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(403, 'Unathorized')
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            return next(403, 'Unathorized')
        }
    } catch (error) {
        next(500, error.message)
    }
}