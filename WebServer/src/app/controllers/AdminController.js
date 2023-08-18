class AdminControllers {
	index(req, res) {
		res.send('<h1>Admin Page</h1>')
	}
}

module.exports = new AdminControllers()
