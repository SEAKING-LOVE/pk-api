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
	effectivenessAll: (req, res) => {
		Types.effectivenessAll()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	effectivenessId: (req, res) => {
		Types.effectivenessId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	pokemon: (req, res) => {
		Types.pokemon(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	}
};

module.exports = Controller;