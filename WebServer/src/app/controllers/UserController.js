const User = require('../models/User'),
	Part = require('../models/Part'),
	Banner = require('../models/Banner'),
	ObjectId = require('mongoose').Types.ObjectId,
	rgEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

class UserControllers {
	// GET: /user/:id|username|email
	async showUser(req, res) {
		let arg = ObjectId.isValid(req.params.user)
			? '_id'
			: rgEmail.test(req.params.user.trim().toString().toLowerCase())
			? 'email'
			: 'username'
		try {
			const data = await User.findOne({
				[arg]: req.params.user,
			}).select('-password')
			if (data)
				res.status(200).json({
					success: true,
					message: `Found a user`,
					data,
				})
			else
				res.status(404).json({
					success: false,
					message: 'User does not exist!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// GET: /user/current
	async showUserCurrent(req, res) {
		try {
			const data = await User.findById(req.jwtDecoded.data._id).select(
				'-password'
			)
			if (data)
				res.status(200).json({
					success: true,
					message: `User informations`,
					data,
				})
			else
				res.status(404).json({
					success: false,
					message: 'User does not exist!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// PUT: /user/:id|username|email
	async updateUser(req, res) {
		let arg = ObjectId.isValid(req.params.user)
			? '_id'
			: rgEmail.test(req.params.user.trim().toString().toLowerCase())
			? 'email'
			: 'username'
		try {
			let user = await User.findOne({ [arg]: req.params.user })
			if (user) {
				let emailExist = await User.findOne({
					email: req.body.email.trim(),
					_id: { $ne: user._id },
				})
				if (user.email != req.body.email && emailExist)
					res.status(400).json({
						success: false,
						message:
							'Địa chỉ email mới đã được sử dụng cho tài khoản khác!',
					})
				else {
					const result = await User.findOneAndUpdate(
						{ [arg]: req.params.user },
						req.body,
						{
							new: true,
							upsert: true,
							rawResult: true,
						}
					)
					const data = await User.findOne({
						[arg]: req.params.user,
					}).select('-password')
					if (result.lastErrorObject.updatedExisting)
						res.status(200).json({
							success: true,
							message: `Cập nhật thông tin tài khoản thành công!`,
							data,
						})
					else
						res.status(500).json({
							success: false,
							message:
								'Không thể cập nhật thông tin tài khoản, vui lòng thử lại sau!',
						})
				}
			} else
				return res.status(400).json({
					success: false,
					message: 'Tài khoản không tồn tại!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// PUT: /user/changepassword/:id|username|email
	async changePassword(req, res) {
		let arg = ObjectId.isValid(req.params.user)
			? '_id'
			: rgEmail.test(req.params.user.trim().toString().toLowerCase())
			? 'email'
			: 'username'
		try {
			let user = await User.findOne({ [arg]: req.params.user }),
				message = []
			if (user) {
				if (!user.validPassword(req.body.currentPassword))
					message = [...message, 'Mật khẩu hiện tại không chính xác!']
				else if (req.body.newPassword !== req.body.confirmPassword)
					message = [
						...message,
						'Mật khẩu mới và mật khẩu xác nhận không khớp!',
					]

				if (!message.length) {
					let newPass = user.encryptPassword(req.body.confirmPassword)
					const result = await User.findOneAndUpdate(
						{ [arg]: req.params.user },
						{ password: newPass, $unset: { timeReset: 1 } },
						{
							new: true,
							upsert: true,
							rawResult: true,
						}
					)
					const data = await User.findOne({
						[arg]: req.params.user,
					}).select('-password')
					if (result.lastErrorObject.updatedExisting)
						res.status(200).json({
							success: true,
							message: `Mật khẩu đã được thay đổi!`,
							data,
						})
					else
						res.status(404).json({
							success: false,
							message:
								'Mật khẩu chưa được thay đổi. Vui lòng thử lại sau!',
						})
				} else
					res.status(500).json({
						success: false,
						message,
					})
			} else
				res.status(500).json({
					success: false,
					message: 'User không tồn tại!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// PUT: /user/set-allow?id=userId&value=true
	async updateActive(req, res) {
		let arg = ObjectId.isValid(req.query.id)
			? '_id'
			: rgEmail.test(req.query.id.trim().toString().toLowerCase())
			? 'email'
			: 'username'
		try {
			let user = await User.findOne({ [arg]: req.query.id }),
				message = ''
			if (user) {
				if (user.role === 'admin')
					message =
						'Bạn không có quyền thực hiện thao tác. Vui lòng liên hệ quản trị viên!'

				if (!message) {
					const result = await User.findOneAndUpdate(
						{ [arg]: req.query.id },
						{ allow: req.query.value },
						{
							new: true,
							upsert: true,
							rawResult: true,
						}
					)
					const data = await User.findOne({
						[arg]: req.query.id,
					}).select('-password')
					if (result.lastErrorObject.updatedExisting)
						res.status(200).json({
							success: true,
							message: `Cập nhật quyền truy cập thành công`,
							data,
						})
					else
						res.status(500).json({
							success: false,
							message:
								'Không thể thực hiện thao tác. Vui lòng thử lại sau!',
						})
				} else
					res.status(400).json({
						success: false,
						message,
					})
			} else
				res.status(404).json({
					success: false,
					message: 'User không tồn tại!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// GET: /user
	async listUser(req, res) {
		try {
			let data = await User.find({}).select('-password -deleted')
			res.status(200).json({
				success: true,
				message: `Found ${data.length} users`,
				data,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// POST: /user
	async createUser(req, res) {
		try {
			let message = []
			if (req.body.email.trim()) {
				if (await User.findOne({ email: req.body.email.trim() }))
					message = [
						...message,
						`Email ${req.body.email.trim()} đã tồn tại!`,
					]
			} else message = [...message, 'Email không được để trống!']
			if (req.body.username.trim()) {
				if (await User.findOne({ username: req.body.username.trim() }))
					message = [
						...message,
						`Username ${req.body.username.trim()} đã tồn tại!`,
					]
			} else message = [...message, 'Username không được để trống!']
			if (!message.length) {
				let newUser = new User(req.body)
				newUser.password = newUser.encryptPassword(req.body.password)
				let resultUser = await newUser.save(req.body)
				if (resultUser) {
					res.status(200).json({
						success: true,
						message: `Created a user!`,
						data: await User.findById(resultUser._id).select(
							'-password -deleted'
						),
					})
				} else
					res.status(500).json({
						success: false,
						message: 'User creation failed!',
					})
			} else
				res.status(403).json({
					success: false,
					message,
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// DELETE: /user/:id|username|email
	async deleteUser(req, res) {
		let userDels = req.body.users ? req.body.users : []
		let deleted = 0
		try {
			if (userDels.length) {
				for (let i in userDels) {
					let argUserDel = ObjectId.isValid(userDels[i])
						? '_id'
						: rgEmail.test(
								userDels[i].trim().toString().toLowerCase()
						  )
						? 'email'
						: 'username'
					let userDel = await User.delete({
						[argUserDel]: ObjectId.isValid(userDels[i])
							? ObjectId(userDels[i])
							: userDels[i].toString(),
					})
					if (userDel.modifiedCount) deleted++
				}
				if (deleted)
					res.status(200).json({
						success: true,
						message: `Đã xóa ${deleted}/${userDels.length} user!`,
					})
				else
					res.status(500).json({
						success: false,
						message:
							'Thao tác chưa được hoàn thành. Vui lòng thử lại sau!',
					})
			} else
				res.status(404).json({
					success: false,
					message: '404 Not found!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}
}

module.exports = new UserControllers()
