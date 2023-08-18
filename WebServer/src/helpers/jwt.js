const jwt = require('jsonwebtoken')

let generateToken = (user, secretSignature, tokenLife) => {
	return new Promise((resolve, reject) => {
		// Thông tin user đi kèm token
		const userData = {
			_id: user._id,
			name: user.fullname,
			email: user.email,
			username: user.username,
			avatar: user.avatar,
		}
		// Tạo token
		jwt.sign(
			{ data: userData },
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
			(error, token) => {
				if (error) {
					return reject(error)
				}
				resolve(token)
			}
		)
	})
}

let verifyToken = (token, secretKey) => {
	return jwt.verify(token, secretKey, (err, decoded) => {
		return err ? err.name == 'TokenExpiredError' : decoded
	})
}
module.exports = {
	generateToken,
	verifyToken,
}
