const mongoose = require('mongoose'),
	dbUrl = process.env.MONGO_URL

async function connet() {
	try {
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('Kết nối dữ liệu thành công!')
	} catch (error) {
		console.log(error)
	}
}

module.exports = { connet }
