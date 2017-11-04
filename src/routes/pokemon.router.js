const router = require('express').Router();
const Pokemon = require('../controllers/pokemon.controller.js');

router.get('/types/:id', Pokemon.type);
router.get('/abilities/:id', Pokemon.ability);
router.get('/moves/:id', Pokemon.move);
router.get('/', Pokemon.all);
router.get('/:id', Pokemon.general);


module.exports = router;