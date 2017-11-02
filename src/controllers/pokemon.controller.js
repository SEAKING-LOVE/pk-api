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
	type: (req, res) => {
		Pokemon.type(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	ability: (req, res) => {
		Pokemon.ability(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	move: (req, res) => {
		Pokemon.move(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));	
	}

};

module.exports = Controller;