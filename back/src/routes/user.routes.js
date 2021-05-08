const {Router} = require('express')
const router = Router();

const userCtrl = require('../controllers/userController')


router.get('/',userCtrl.getAll)

router.post('/signup', userCtrl.signUp)

router.post('/signin',userCtrl.signIn)

module.exports = router