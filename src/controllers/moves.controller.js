const Moves = require('../models/moves.model.js');

const Controller = {
	all: (req, res) => {
		Moves.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	description: (req, res) => {
		Moves.description(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	pokemon: (req, res) => {
		Moves.pokemon(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},

};

module.exports = Controller;