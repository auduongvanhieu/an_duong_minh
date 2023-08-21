const router = require('express').Router(),
	videoController = require('../app/controllers/VideoController'),
	AuthMiddleWare = require('../middleware/AuthMiddleware'),
	ConditionsMiddleware = require('../middleware/ConditionsMiddleware')

router.get('/list', AuthMiddleWare.isAuth, videoController.listVideo)
router.get('/stamp', videoController.getStamp)
router.get('/:slug', videoController.showVideo)
// router.put('/:slug', AuthMiddleWare.isAuth, AuthMiddleWare.isAccess, ConditionsMiddleware.checkStamp, videoController.updateVideo)
router.put('/:slug', AuthMiddleWare.isAuth, ConditionsMiddleware.checkStamp, videoController.updateVideo)
router.delete('/', videoController.deleteVideo)
// router.post('/', AuthMiddleWare.isAdmin, videoController.createVideo)
router.post('/', AuthMiddleWare.isAuth, videoController.createVideo)

module.exports = router
