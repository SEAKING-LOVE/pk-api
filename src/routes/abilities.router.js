const router = require('express').Router();
const Abilities = require('../controllers/abilities.controller.js');

router.get('/', Abilities.all);
router.get('/:id' Abilities.id)
module.exports = router;