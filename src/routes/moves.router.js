const router = require('express').Router();
const Moves = require('../controllers/moves.controller.js');

router.get('/', Moves.all);
router.get('/:id', Moves.id);
module.exports = router;