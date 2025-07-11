const siteRouter = require('./site'),
	adminRouter = require('./admin'),
	videoRouter = require('./video'),
	userRouter = require('./user'),
	mediaRouter = require('./media'),
	AuthMiddleWare = require('../middleware/AuthMiddleware'),
	LogedIn = require('../middleware/UserLogedMiddleware'),
	Globals = require('../middleware/Global'),
	jwtHelper = require('../helpers/jwt'),
	User = require('../app/models/User')

const route = (app) => {
	app.get('/refresh-token', async (req, res) => {
		const refreshToken = req.cookies.accessTokenF5
		if (refreshToken) {
			if (refreshToken in global.tokenList) {
				try {
					const decoded = await jwtHelper.verifyToken(
						refreshToken,
						global.refreshTokenSecret
					)
					const user = await User.findOne({
						email: decoded.data.email,
					}).select('-password')
					const refreshUser = {
						email: user.email,
						name: user.fullname,
						userId: user._id,
					}

					const accessTokenNew = await jwtHelper.generateToken(
						refreshUser,
						global.accessTokenSecret,
						global.accessTokenLife
					)
					const refreshTokenNew = await jwtHelper.generateToken(
						refreshUser,
						global.refreshTokenSecret,
						global.refreshTokenLife
					)
					global.tokenList[refreshTokenNew] = refreshUser

					res.clearCookie('accessToken')
						.clearCookie('accessTokenF5')
						.cookie('accessToken', accessTokenNew)
						.cookie('accessTokenF5', refreshTokenNew)
						.redirect('/admin')
				} catch (err) {
					console.error(err)
				}
			} else {
				res.clearCookie('accessToken')
					.clearCookie('accessTokenF5')
					.redirect('/login')
			}
		} else {
			res.redirect('/login')
		}
	})
	app.use(Globals.globalVariables)
	app.use('/admin', LogedIn.isLogedIn, AuthMiddleWare.isAuth, adminRouter)
	app.use('/video', videoRouter)
	app.use('/user', AuthMiddleWare.isAuth, userRouter)
	app.use('/', siteRouter)
	app.use('/media', AuthMiddleWare.isAuth, mediaRouter)
	app.use((req, res) => {
		res.status(404).json({
			success: false,
			message: '404 not found',
		})
	})
}

module.exports = route
