const router = require('express').Router(),
	siteController = require('../app/controllers/SiteController'),
	MaxSize = +process.env.MAX_FILE_SIZE_UPLOAD,
	multer = require('multer'),
	storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, `${global.appRoot}/public/uploads`)
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + '-' + file.originalname)
		},
	}),
	upload = multer({
		storage: storage,
		limits: {
			fileSize: MaxSize,
		},
	})

router.get('/logout', siteController.logout)
router.get('/login', siteController.login)
router.post('/login', siteController.loginHandle)
router.get('/forgot-pass', siteController.forgotPass)
router.post('/forgot-pass', siteController.forgotPassHandle)
router.get('/reset-pass', siteController.resetPass)
router.post('/reset-pass', siteController.resetPassHandle)
router.post('/upload', upload.single('image'), siteController.uploadHandle)

module.exports = router
