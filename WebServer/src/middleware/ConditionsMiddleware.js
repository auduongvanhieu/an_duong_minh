const Video = require('../app/models/Video'),
	ObjectId = require('mongoose').Types.ObjectId

const checkStamp = async (req, res, next) => {
	try {
		let arg = ObjectId.isValid(req.params.slug) ? '_id' : 'slug',
			stamp = req.query.stamp,
			video = await Video.findOne({ [arg]: req.params.slug })
		if (video && video.stamp === stamp) return next()
		else
			return res.status(403).json({
				success: false,
				message: 'Video đã có sự thay đổi trước đó!',
			})
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error!' })
	}
}

module.exports = {
	checkStamp,
}
