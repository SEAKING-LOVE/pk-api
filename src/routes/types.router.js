const router = require('express').Router();
const Types = require('../controllers/types.controller.js');

router.get('/', Types.all);

module.exports = router;