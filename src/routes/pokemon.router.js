const router = require('express').Router();
const Pokemon = require('../controllers/pokemon.controller.js');

router.get('/types/:id', Pokemon.types);
router.get('/abilities/:id', Pokemon.abilities);
router.get('/moves/:id', Pokemon.moves);
router.get('/stats/:id', Pokemon.stats)
router.get('/', Pokemon.all);
router.get('/:id', Pokemon.general);


module.exports = router;