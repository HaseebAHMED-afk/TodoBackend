const { createManager, loginManager } = require('../Controllers/Manger')

const router = require('express').Router()

router.post('/createManager' , createManager)
router.post('/loginManager' , loginManager)


module.exports = router