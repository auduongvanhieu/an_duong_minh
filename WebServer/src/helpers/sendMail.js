const nodeMailer = require('nodemailer')
const user = 'thanhbinh.ltmt@gmail.com'
const pass = 'ossprlheqggjjhic'
const host = 'smtp.gmail.com'
const port = 587
const sendMail = (to, subject, html) => {
	const transporter = nodeMailer.createTransport({
		host,
		port,
		secure: false,
		auth: {
			user,
			pass,
		},
	})
	const options = {
		from: 'admin@spro.vn',
		to,
		subject,
		html,
	}

	return transporter.sendMail(options)
}
module.exports = {
	sendMail: sendMail,
}
