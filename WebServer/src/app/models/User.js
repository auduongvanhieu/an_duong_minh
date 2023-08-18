const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	mongooseDelete = require('mongoose-delete'),
	UserSchema = new Schema(
		{
			fullname: { type: String },
			username: {
				type: String,
				required: true,
				unique: true,
				sparse: true,
			},
			password: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
				sparse: true,
			},
			phoneNumber: { type: String },
			gender: { type: String },
			avatar: { type: String },
			role: {
				type: String,
				required: true,
				enum: ['admin', 'member'],
				default: 'member',
			},
			allow: { type: Boolean, default: true },
			loggedIn: [
				{
					time: { type: Date },
					ip: { type: String },
					device: { type: String },
				},
			],
			codeReset: { type: String },
			timeReset: { type: Date },
		},
		{
			timestamps: true,
		}
	)

UserSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
})

UserSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
