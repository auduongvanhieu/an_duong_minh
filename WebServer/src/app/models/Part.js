const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	PartSchema = new Schema(
		{
			title: String,
			type: {
				type: String,
				enum: ['part', 'video', 'image'],
				defalt: 'part',
			},
			value: String,
			startSeconds: Number,
			endSeconds: Number,
			sortIndex: Number,
			thumbnail: String,
			isDefault: Boolean,
			videoId: {
				type: Schema.Types.ObjectId,
				ref: 'Video',
			},
		},
		{
			timestamps: true,
		}
	)
PartSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('Part', PartSchema)
