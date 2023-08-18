const jwtHelper = require('../helpers/jwt')
const User = require('../app/models/User')
const { mongooseToObject } = require('../helpers/mongoose')

const isLogedIn = async (req, res, next) => {
	let accessToken = req.cookies.accessToken
	if (accessToken) {
		let decoded = accessToken
			? await jwtHelper.verifyToken(accessToken, global.accessTokenSecret)
			: undefined
		if (typeof decoded === 'object' && decoded !== null) {
			let userEmail = decoded ? decoded.data.email : undefined,
				user = userEmail
					? await User.findOne({ email: userEmail }).select(
							'-password'
					  )
					: undefined
			res.locals._user = mongooseToObject(user)
			res.locals._hostname = req.headers.host
		} else {
			return res.redirect('/refresh-token')
		}
	}
	return next()
}
module.exports = {
	isLogedIn,
}
