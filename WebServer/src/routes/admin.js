const router = require('express').Router();
const adminController = require('../app/controllers/AdminController');

router.get('/', adminController.index)

module.exports = router
