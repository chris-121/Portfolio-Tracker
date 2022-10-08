const express= require('express')
const router = express.Router();
const controller = require('../Controller/mainController')

router.route('/funds').post(controller.FundTransaction)
router.route('/getAllDetails').get(controller.getAllDetails)
router.route('/setTarget').post(controller.setTarget)
router.route('/BuyAndSellScrip').post(controller.buyAndSellScrip)
router.route('/updatePrice').post(controller.updatePrice)
router.route('/autoUpdate').get(controller.autoUpdate)

module.exports = router