import sign from '../middlewares/sign'
import {Router} from 'express'
import authCtrl from '../controllers/authController'

const router = Router()

router.post('/signin', authCtrl.signIn)
router.post('/signup',sign.checkExistingUser, authCtrl.signUp)
module.exports= router