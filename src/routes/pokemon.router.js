const router = require('express').Router();
const Pokemon = require('../controllers/pokemon.controller.js');

router.get('/type/:id', Pokemon.typeId);
router.get('/ability/:id', Pokemon.abilityId);
router.get('/move/:id', Pokemon.moveId);
router.get('/', Pokemon.all);
router.get('/:id', Pokemon.id);


module.exports = router;