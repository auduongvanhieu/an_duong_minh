const router = require('express').Router(),
	AuthMiddleWare = require('../middleware/AuthMiddleware'),
	userController = require('../app/controllers/UserController')

router.put('/changepassword/:user', userController.changePassword)
router.get('/set-allow', userController.updateActive)
router.get('/list', AuthMiddleWare.isAdmin, userController.listUser)
router.get('/current', userController.showUserCurrent)
router.get('/:user', userController.showUser)
router.put('/:user', userController.updateUser)
router.delete('/', userController.deleteUser)
router.post('/',userController.createUser)

module.exports = router
