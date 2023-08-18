const router = require('express').Router(),
	adminController = require('../app/controllers/AdminController')

router.get('/', adminController.index)

module.exports = router
