const express= require('express')
const router = express.Router();
const controller = require('../Controller/authenticationController')

router.route('/login').get(controller.Login)

module.exports = router