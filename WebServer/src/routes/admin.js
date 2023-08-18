const router = require('express').Router(),
	adminController = require('../app/controllers/AdminController.js')

router.get('/', adminController.index)

module.exports = router
