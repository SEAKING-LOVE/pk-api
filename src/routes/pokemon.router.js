const router = require('express').Router();
const Pokemon = require('../controllers/pokemon.controller.js');

router.get('/', Pokemon.all);

module.exports = router;