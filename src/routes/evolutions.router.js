const router = require('express').Router();
const Evolutions = require('../controllers/evolutions.controller.js');

// router.get('/', Evolutions.all);
router.get('/:id', Evolutions.id);

module.exports = router;