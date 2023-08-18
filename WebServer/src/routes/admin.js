const router = require('express').Router(),
	adminController = require('./src/app/controllers/AdminController')

router.get('/', adminController.index)

module.exports = router
