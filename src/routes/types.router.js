const router = require('express').Router();
const Types = require('../controllers/types.controller.js');


router.get('/effectiveness/', Types.effectivenessAll);
router.get('/effectiveness/:id', Types.effectivenessId);
router.get('/pokemon/:id', Types.pokemon);
router.get('/', Types.all);

module.exports = router;