const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	MediaSchema = new Schema(
		{
			name: String,
			fileName: String,
			contentType: String,
			createdBy: {
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
			size: Number,
		},
		{
			timestamps: true,
		}
	)
MediaSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('Media', MediaSchema)
