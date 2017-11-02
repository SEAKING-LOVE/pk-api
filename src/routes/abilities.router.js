const router = require('express').Router();
const Abilities = require('../controllers/abilities.controller.js');

router.get('/', Abilities.all);
router.get('/description/:id', Abilities.description);
router.get('/pokemon/:id', Abilities.pokemon)
module.exports = router;