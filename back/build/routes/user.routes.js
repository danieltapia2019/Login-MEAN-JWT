"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var userCtrl = require('../controllers/userController');

router.get('/', userCtrl.getAll);
router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);
module.exports = router;