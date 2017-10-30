const Types = require('../models/types.model.js');

const Controller = {
	all: (req, res) => {
		Types.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	id: (req, res) => {
		Types.id(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	pokemon: (req, res) => {
		Types.pokemon(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	effectAll: (req, res) => {
		Types.effectAll()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	effectDamageId: (req, res) => {
		Types.effectDamageId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	
	effectTargetId: (req, res) => {
		Types.effectTargetId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
};

module.exports = Controller;