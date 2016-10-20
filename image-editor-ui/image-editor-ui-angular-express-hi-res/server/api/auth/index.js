var router = require('express').Router();

var controller = require('./auth.controller.js');

module.exports = router;

router.get('/creativesdkAuthObj', controller.creativesdkAuthObj);
router.get('/creativesdkKey', controller.creativesdkKey);