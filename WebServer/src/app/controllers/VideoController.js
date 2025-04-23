const Video = require('../models/Video'),
	Part = require('../models/Part'),
	User = require('../models/User'),
	{ genCode } = require('../../helpers/generator'),
	ObjectId = require('mongoose').Types.ObjectId
class VideoControllers {
	// GET: /video/:slug|id
	async showVideo(req, res) {
		let arg = ObjectId.isValid(req.params.slug) ? '_id' : 'slug'
		try {
			await Video.findOneAndUpdate(
				{ [arg]: req.params.slug },
				{ $inc: { views: 1 } }
			)
			const data = await Video.findOne({
				[arg]: req.params.slug,
			})
				.populate({
					path: 'createdBy',
					select: '-password',
				})
				.populate('banners')
				.populate('parts')
			if (data)
				res.status(200).json({
					success: true,
					message: `Found a video`,
					data,
				})
			else
				res.status(404).json({
					success: false,
					message: 'Video does not exist!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// GET: /video/stamp
	async getStamp(req, res) {
		let stamp = genCode(8)
		try {
			const result = await Video.findOneAndUpdate(
				{ _id: req.query.video },
				{ stamp },
				{
					new: true,
					upsert: true,
					rawResult: true,
				}
			)
			if (result.lastErrorObject.updatedExisting)
				res.status(200).json({
					success: true,
					message: `Video stamp updated!`,
					data: { stamp },
				})
			else
				res.status(404).json({
					success: false,
					message: 'Video stamp update failed!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// PUT: /video/:slug|id
	async updateVideo(req, res) {
		let arg = ObjectId.isValid(req.params.slug) ? '_id' : 'slug'
		try {
			let parts = req.body.parts && req.body.parts,
				video = await Video.findOne({ [arg]: req.params.slug }),
				newParts = []
			if (video) {
				if (parts && parts.length) {
					for (let i in parts) {
						if (!parts[i]._id) {
							parts[i].videoId = video._id
							let part = await Part.create(parts[i])
							newParts = [...newParts, part._id]
						} else {
							let partUpdate = await Part.findOneAndUpdate(
								{ _id: parts[i]._id },
								parts[i]
							)
							newParts = [...newParts, partUpdate._id]
						}
					}
					req.body.parts = newParts
					const result = await Video.findOneAndUpdate(
						{ [arg]: req.params.slug },
						req.body,
						{
							new: true,
							upsert: true,
							rawResult: true,
						}
					)
					const data = await Video.findOne({
						[arg]: req.params.slug,
					})
						.populate({
							path: 'createdBy',
							select: '-password',
						})
						.populate('banners')
						.populate('parts')
						.populate({
							path: 'access',
							select: 'videoname fullname avatar',
						})
					if (result.lastErrorObject.updatedExisting)
						res.status(200).json({
							success: true,
							message: `Video updated!`,
							data,
						})
					else
						res.status(404).json({
							success: false,
							message: 'Video update failed!',
						})
				}
			} else
				return res.status(500).json({
					success: false,
					message: 'Video does not exist!',
				})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// DELETE: /video/:slug|id
	async deleteVideo(req, res) {
		let videoDels = req.body.videos ? req.body.videos : []
		let deleted = 0
		try {
			if (videoDels.length) {
				for (let i in videoDels) {
					let argVideoDel = ObjectId.isValid(videoDels[i])
						? '_id'
						: 'slug'
					let videoDel = await Video.delete({
						[argVideoDel]: ObjectId.isValid(videoDels[i])
							? ObjectId(videoDels[i])
							: videoDels[i].toString(),
					})
					if (videoDel.modifiedCount) deleted++
				}
				if (deleted)
					res.status(200).json({
						success: true,
						message: `Đã xóa ${deleted}/${videoDels.length} video!`,
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

	// GET: /video
	async listVideo(req, res) {
		let curUser = await User.findById(req.jwtDecoded.data._id),
			condition = curUser.role !== 'admin' ? { access: curUser._id } : {},
			sort = req.query.hasOwnProperty('top')
				? { views: -1 }
				: { createdAt: -1 },
			limit = req.query.hasOwnProperty('top') ? 10 : null
		try {
			let data = await Video.find(condition)
				.select('title remark isActive parts createdAt views')
				.populate({
					path: 'createdBy',
					select: 'fullname',
				})
				.populate({
					path: 'parts',
					select: 'startSeconds endSeconds thumbnail',
				})
				.sort(sort)
				.limit(limit)
			res.status(200).json({
				success: true,
				message: `Found ${data.length} videos`,
				data: data.map((item) => ({
					...item._doc,
					partsCount: item.parts.length,
				})),
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error!',
			})
		}
	}

	// POST: /video
	async createVideo(req, res) {
		try {
			const curUser = await User.findById(req.jwtDecoded.data._id);
			curUser.role !== 'admin'
				? (req.body.access = [req.jwtDecoded.data._id])
				: req.body.access;
			let parts = req.body.parts && req.body.parts
			req.body.parts = []
			const randomSlug = Math.floor(Math.random() * 10000);
			let name = req.body.title
			const nameCleaned = name.replace(/\s/g, '-')
			req.body.slug = `${nameCleaned}`;
			if (req.body.slug.length === 0) {
				req.body.slug = `${randomSlug}`;
			}
			let resultVideo = await Video.create(req.body)
			if (resultVideo) {
				if (parts && parts.length)
					for (let i in parts) {
						parts[i].videoId = resultVideo._id
						let resultPart = await Part.create(parts[i]),
							video = await Video.findById(resultVideo._id)
						await Video.updateOne(
							{ _id: resultVideo._id },
							{
								parts: [...video.parts, resultPart._id],
							}
						)
					}
				res.status(200).json({
					success: true,
					message: `Created a video`,
					data: await Video.findById(resultVideo._id)
						.populate({
							path: 'createdBy',
							select: '-password',
						})
						.populate('parts'),
				})
			} else
				res.status(500).json({
					success: false,
					message: 'Video creation failed!',
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

module.exports = new VideoControllers()
