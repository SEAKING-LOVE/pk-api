const Pokemon = require('../models/pokemon.model.js');

const Controller = {
	all: (req, res) => {
		Pokemon.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	id: (req, res) => {
		Pokemon.id(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	typeId: (req, res) => {
		Pokemon.typeId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	abilityId: (req, res) => {
		Pokemon.abilityId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	moveId: (req, res) => {
		Pokemon.moveId(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));	
	}

};

module.exports = Controller;