const os = require('os')

let globalVariables = async (req, res, next) => {
	res.locals._hostname = os.hostname()

	next()
}
module.exports = {
	globalVariables,
}
