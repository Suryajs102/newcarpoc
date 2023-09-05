const controllers = require('../controller/index.js')
 const router = require('express').Router()

 router.get('/get', controllers.getCarsData)
 router.post('/purchase',controllers.createpurchaseData)
/*router.get('/query', controllers.)*/
 
 module.exports = router 