const router = require('express').Router();
const Types = require('../controllers/types.controller.js');

router.get('/', Types.all);
router.get('/:id', Types.id);
router.get('/effectiveness/', Types.effectivenessAll);
router.get('/effectiveness/:id', Types.effectivenessId);

module.exports = router;