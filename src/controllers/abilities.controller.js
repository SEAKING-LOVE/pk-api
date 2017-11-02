const Abilities = require('../models/abilities.model.js');

const Controller = {
	all: (req, res) => {
		Abilities.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	description: (req, res) => {
		Abilities.description(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	pokemon: (req, res) => {
		Abilities.pokemon(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},

};

module.exports = Controller;