const router = require('express').Router(),
	mediaController = require('../app/controllers/MediaController')

router.get('/list', mediaController.list)
router.post('/delete', mediaController.delete)

module.exports = router
