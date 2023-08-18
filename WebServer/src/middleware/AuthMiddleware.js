const jwtHelper = require('../helpers/jwt'),
	debug = console.log.bind(console),
	User = require('../app/models/User'),
	Video = require('../app/models/Video'),
	ObjectId = require('mongoose').Types.ObjectId

const isAuth = async (req, res, next) => {
	const tokenFromClient =
		(req.header('Authorization') &&
			req.header('Authorization').split(' ')[1]) ||
		req.cookies.accessToken
	if (tokenFromClient) {
		try {
			const decoded = await jwtHelper.verifyToken(
				tokenFromClient,
				global.accessTokenSecret
			)
			if (typeof decoded === 'object' && decoded !== null) {
				req.jwtDecoded = decoded
				return next()
			} else {
				return res.status(401).json({
					success: false,
					message: 'Invalid token!',
				})
				return res.redirect('/refresh-token')
			}
		} catch (error) {
			debug('Error while verify token:', error)
			return res
				.status(403)
				.json({ success: false, message: 'Invalid token!' })
		}
	} else {
		return res
			.status(403)
			.json({ success: false, message: 'Access token not found!' })
		return res.redirect('/login')
	}
}

const isAdmin = async (req, res, next) => {
	const tokenFromClient =
		(req.header('Authorization') &&
			req.header('Authorization').split(' ')[1]) ||
		req.cookies.accessToken
	if (tokenFromClient) {
		try {
			const decoded = await jwtHelper.verifyToken(
				tokenFromClient,
				global.accessTokenSecret
			)
			if (typeof decoded === 'object' && decoded !== null) {
				req.jwtDecoded = decoded
				let user = await User.findById(decoded.data._id)
				if (user.role) {
					if (user.role === 'admin') {
						next()
					} else {
						return res.status(403).json({
							success: false,
							message: 'Access is denied!',
						})
						return res.redirect('/')
					}
				} else {
					return res
						.status(403)
						.json({ success: false, message: 'Access is denied!' })
					return res.redirect('/')
				}
			} else {
				return res.status(401).json({
					success: false,
					message: 'Invalid token!',
				})
				return res.redirect('/refresh-token')
			}
		} catch (error) {
			debug('Error while verify token:', error)
			return res
				.status(403)
				.json({ success: false, message: 'Invalid token!' })
			return
		}
	} else {
		return res
			.status(403)
			.json({ success: false, message: 'Access token not found!' })
		return res.redirect('/login')
	}
}

const isAccess = async (req, res, next) => {
	const userHandle = await User.findById(req.jwtDecoded.data._id),
		arg = ObjectId.isValid(req.params.slug) ? '_id' : 'slug',
		condition =
			userHandle.role !== 'admin'
				? { [arg]: req.params.slug, access: userHandle._id }
				: {}
	if (userHandle) {
		try {
			let videoTarget = await Video.findOne(condition)
			if (videoTarget) {
				next()
			} else {
				return res.status(401).json({
					success: false,
					message:
						'Bạn không có quyền thực hiện thao tác. Vui lòng liên hệ quản trị viên!',
				})
			}
		} catch (error) {
			debug('Error while verify token:', error)
			return res.status(403).json({
				success: false,
				message: 'Không thể xử lý thao tác. Vui lòng thử lại sau!',
			})
		}
	} else {
		return res.status(403).json({
			success: false,
			message:
				'Bạn không có quyền thực hiện thao tác. Vui lòng liên hệ quản trị viên!',
		})
	}
}

module.exports = {
	isAuth,
	isAdmin,
	isAccess,
}
