const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	slug = require('mongoose-slug-updater'),
	VideoSchema = new Schema(
		{
			title: String,
			slug: {
				type: String,
				slug: 'title',
				unique: true,
				sparse: true,
			},
			idVideoYoutube: String,
			remark: String,
			stamp: String,
			createdBy: {
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
			isActive: Boolean,
			views: {
				type: Number,
				default: 0,
			},
			parts: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Part',
				},
			],
			banners: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Banner',
				},
			],
			access: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
			column1: String,
			column2: String,
			column3: String,
			column4: String,
			column5: String,
			column6: String,
			column7: String,
			column8: String,
			column10: String,
		},
		{
			timestamps: true,
		}
	)

mongoose.plugin(slug)
VideoSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('Video', VideoSchema)
