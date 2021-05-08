const sign = require('../middlewares/sign') 
const {Router} = require('express')
const authCtrl = require('../controllers/authController')
const router = Router()

router.post('/signin', authCtrl.signIn)
router.post('/signup',sign.checkExistingUser, authCtrl.signUp)
module.exports= router