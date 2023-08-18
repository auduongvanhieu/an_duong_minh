const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	VideoConfigTypeSchema = new Schema(
		{
			value: String,
			configTypeId: {
				type: Schema.Types.ObjectId,
				ref: 'ConfigType',
			},
			videoId: {
				type: Schema.Types.ObjectId,
				ref: 'Video',
			},
		},
		{
			timestamps: true,
		}
	)
VideoConfigTypeSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('VideoConfigType', VideoConfigTypeSchema)
