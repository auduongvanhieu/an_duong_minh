const User = require('../models/User'),
	jwtHelper = require('../../helpers/jwt'),
	Media = require('../models/Media'),
	MaxSize = +process.env.MAX_FILE_SIZE_UPLOAD,
	{ sendMail } = require('../../helpers/sendMail'),
	{ genCode } = require('../../helpers/generator'),
	{ passwordTemp } = require('../../helpers/emailTemps'),
	moment = require('moment'),
	{ v4: uuidv4 } = require('uuid')

class SiteControllers {
	// GET: /login
	login(req, res) {
		global.refer = req.headers.referer
		res.render('login', {
			layout: 'first',
		})
	}

	// POST: /login
	async loginHandle(req, res) {
		var messages
		if (!req.body.username || !req.body.password) {
			messages = 'Tên đăng nhập hoặc mật khẩu không chính xác!'
		} else {
			var user = await User.findOne({ username: req.body.username })
			if (!user) {
				messages = 'Tên đăng nhập hoặc mật khẩu không chính xác!'
			} else {
				if (!user.validPassword(req.body.password)) {
					messages = 'Tên đăng nhập hoặc mật khẩu không chính xác!'
				} else {
					if (
						user.timeReset &&
						moment().isAfter(moment(user.timeReset))
					)
						messages =
							'Tên đăng nhập hoặc mật khẩu không chính xác!'
					if (!user.allow)
						messages =
							'Quyền truy cập hệ thống đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để được hỗ trợ!'
					else {
						let loggedIn = {
							time: new Date(),
							ip: req.body.ip,
							device: req.get('User-Agent'),
						}
						await User.updateOne(
							{ _id: user._id },
							{ loggedIn: [...user.loggedIn, loggedIn] }
						)
						const currentUser = user
						const accessToken = await jwtHelper.generateToken(
							currentUser,
							global.accessTokenSecret,
							global.accessTokenLife
						)
						const refreshToken = await jwtHelper.generateToken(
							currentUser,
							global.refreshTokenSecret,
							global.refreshTokenLife
						)

						global.tokenList[refreshToken] = currentUser
						// 	res.cookie('accessToken', accessToken)
						// 		.cookie('accessTokenF5', refreshToken)
						// 		.redirect('/admin')
						// res.redirect(`${global.refer}?token=${accessToken}`)
						res.status(200).json({
							success: true,
							message: 'Đăng nhập thành công!',
							token: accessToken,
						})
					}
				}
			}
		}
		if (messages) {
			// res.render('login', {
			// 	messages,
			// 	values: req.body,
			// 	layout: 'first',
			// })
			res.status(400).json({
				success: false,
				message: messages,
			})
		}
	}

	// GET: /forgot-pass
	forgotPass(req, res) {
		res.render('forgotPass', {
			layout: 'first',
		})
	}

	// POST: /forgot-pass
	async forgotPassHandle(req, res) {
		let email = req.body.email.trim(),
			message = !email.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			)
				? `Email không đúng định dạng`
				: '',
			user = await User.findOne({ email: email })
		if (!user) message = `Địa chỉ email chưa được đăng ký tài khoản!`

		if (!message) {
			/*
				let codeReset = uuidv4()
				User.updateOne(
					{
						email: email,
					},
					{
						codeReset,
						timeReset: moment().add(15, 'minutes'),
					}
				).exec(async (err, doc) => {
					if (doc) {
						let subject = `Khôi phục mật khẩu tài khoản - ${process.env.SITE_NAME}`,
							resetUrl = `${req.get('origin')}/reset-pass/?user=${
								user._id
							}&ref=${codeReset}`,
							html = resetPasswordTemp(req.get('origin'), resetUrl)
						const sentMail = await sendMail(email, subject, html)
						if (sentMail) {
							res.render('forgotPass', {
								success:
									'Email khôi phục đã được gửi tới E-mail của bạn!',
								values: req.body,
								layout: 'first',
							})
						}
					}
				})
			*/
			let min = 15,
				newPass = genCode(8)
			User.updateOne(
				{
					email: email,
				},
				{
					password: user.encryptPassword(newPass),
					timeReset: moment().add(+min, 'minutes'),
				}
			).exec(async (err, doc) => {
				if (doc) {
					let subject = `QUÊN MẬT KHẨU - ${process.env.SITE_NAME}`,
						html = passwordTemp(req.get('origin'), newPass, min)
					const sentMail = await sendMail(email, subject, html)
					if (sentMail) {
						// res.render('forgotPass', {
						// 	success:
						// 		'Mật khẩu mới đã được gửi tới E-mail của bạn!',
						// 	values: req.body,
						// 	layout: 'first',
						// })
						res.status(200).json({
							success: true,
							message:
								'Mật khẩu mới đã được gửi tới E-mail của bạn!',
						})
					}
				}
			})
		} else {
			// res.render('forgotPass', {
			// 	message,
			// 	values: req.body,
			// 	layout: 'first',
			// })
			res.status(400).json({
				success: false,
				message,
			})
		}
	}

	// GET: /reset-pass
	resetPass(req, res) {
		if (
			!req.query.hasOwnProperty('user') ||
			!req.query.user ||
			!req.query.hasOwnProperty('ref') ||
			!req.query.ref
		)
			return res.redirect('/login')
		res.render('resetPass', {
			user: req.query.user,
			ref: req.query.ref,
			layout: 'first',
		})
	}

	// POST: /reset-pass
	async resetPassHandle(req, res) {
		let user = await User.findById(req.query.user)
		if (
			!req.query.ref ||
			!user ||
			moment().isAfter(moment(user.timeReset)) ||
			user.codeReset !== req.query.ref
		)
			return res.redirect('/login')

		let newPass = req.body.newpass,
			confirmPass = req.body.confirmPass,
			message =
				newPass.length < 8 ? `Mật khẩu phải có ít nhất 8 ký tự!` : ''
		if (newPass !== confirmPass) message = `Mật khẩu xác nhận không khớp!`

		if (!message) {
			User.updateOne(
				{
					_id: user._id,
				},
				{
					password: user.encryptPassword(newPass),
				}
			).exec(async (err, doc) => {
				if (doc) {
					res.render('resetPass', {
						success: 'Thay đổi mật khẩu thành công!',
						values: req.body,
						layout: 'first',
					})
				}
			})
		} else {
			res.render('resetPass', {
				message,
				values: req.body,
				user: req.query.user,
				ref: req.query.ref,
				layout: 'first',
			})
		}
	}

	// GET: /logout
	logout(req, res) {
		if (req.cookies.accessToken) {
			res.clearCookie('accessToken')
			res.redirect('/login')
		}
	}

	// POST: /upload
	async uploadHandle(req, res) {
		try {
			if (req.file) {
				let sizeFile = req.file.size
				if (sizeFile <= MaxSize) {
					let result = await Media.create({
						name: req.file.originalname,
						contentType: req.file.mimetype,
						fileName: req.file.filename,
						size: req.file.size,
					})
					if (result)
						res.status(200).json({
							success: true,
							message: 'Upload image successfully',
							data: `${process.env.REACT_APP_API_URL}/uploads/${result.fileName}`,
						})
				} else {
					res.status(403).json({
						success: false,
						message: `File size too large, should be less than ${
							MaxSize / 1024 / 1024
						}MB`,
					})
				}
			} else
				res.status(400).json({
					success: false,
					message: 'Please send with a image file!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
}

module.exports = new SiteControllers()
