const Pokemon = require('../models/pokemon.model.js');

const Controller = {
	all: (req, res) => {
		Pokemon.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	general: (req, res) => {
		Pokemon.general(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	types: (req, res) => {
		Pokemon.types(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	abilities: (req, res) => {
		Pokemon.abilities(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	moves: (req, res) => {
		Pokemon.moves(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));	
	},
	stats: (req, res) => {
		Pokemon.stats(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));	
	},

};

module.exports = Controller;