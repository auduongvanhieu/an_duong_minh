const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	BannerSchema = new Schema(
		{
			name: String,
			source: String,
			link: String,
			position: {
				type: String,
				enum: ['top', 'right', 'bottom', 'left'],
			},
			videoId: {
				type: Schema.Types.ObjectId,
				ref: 'Video',
			},
			isActive: Boolean,
		},
		{
			timestamps: true,
		}
	)
BannerSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('Banner', BannerSchema)
