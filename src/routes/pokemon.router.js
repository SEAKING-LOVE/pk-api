const router = require('express').Router();
const Pokemon = require('../controllers/pokemon.controller.js');

router.get('/type/:id', Pokemon.type);
router.get('/ability/:id', Pokemon.ability);
router.get('/move/:id', Pokemon.move);
router.get('/', Pokemon.all);
router.get('/:id', Pokemon.general);


module.exports = router;