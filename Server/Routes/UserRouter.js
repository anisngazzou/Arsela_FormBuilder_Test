var router = require('express').Router()
const UserService = require('../BackServices/UserServices')

router.route("/login").get(UserService.loginGet).post(UserService.login)

module.exports = router;