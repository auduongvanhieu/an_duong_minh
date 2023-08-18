const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongooseDelete = require('mongoose-delete'),
	ConfigTypeSchema = new Schema(
		{
			name: String,
			value: String,
		},
		{
			timestamps: true,
		}
	)
ConfigTypeSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

module.exports = mongoose.model('ConfigType', ConfigTypeSchema)
