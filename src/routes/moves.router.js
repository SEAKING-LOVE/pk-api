const router = require('express').Router();
const Moves = require('../controllers/moves.controller.js');

router.get('/', Moves.all);
router.get('/description/:id', Moves.description);
router.get('/pokemon/:id', Moves.pokemon);

module.exports = router;