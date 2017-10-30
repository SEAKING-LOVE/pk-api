const router = require('express').Router();
const Types = require('../controllers/types.controller.js');

router.get('/pokemon/:id', Types.pokemon);
router.get('/effect/', Types.effectAll);
router.get('/effect/damage/:id', Types.effectDamageId);
router.get('/effect/target/:id', Types.effectTargetId);
router.get('/:id', Types.id);
router.get('/', Types.all);

module.exports = router;