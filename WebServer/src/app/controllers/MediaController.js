const Media = require('../models/Media')
const fs = require('fs')

class SiteControllers {
	// GET: /list
	async list(req, res) {
		try {
			const files = await Media.find({}).sort({ createdAt: -1 })
			let fileList = []
			for (let i = 0; i < files.length; i++) {
				const newFile = files[i]._doc
				newFile.url = `${process.env.REACT_APP_API_URL}/uploads/${newFile.fileName}`
				newFile.exist = fs.existsSync(`${global.appRoot}/public/uploads/${newFile.fileName}`)
				fileList.push(newFile)
			}
			res.status(200).json({
				success: true,
				message: 'Media list',
				data: fileList,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// POST: /delete
	async delete(req, res) {
		try {
			if (!req.body.ids) {
				return res.status(400).json({
					success: false,
					message: 'Ids is required',
				})
			}
			const files = await Media.find({ _id: { $in: req.body.ids } })
			const result = []
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				result.push({ fileName: file.fileName })
				await Media.deleteOne({ _id: file._id })
				fs.unlinkSync(`${global.appRoot}/public/uploads/${file.fileName}`)
			}
			res.status(200).json({
				success: true,
				message: 'Xoá thành công',
				data: result,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
}

module.exports = new SiteControllers()
