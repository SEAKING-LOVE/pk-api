const Moves = require('../models/moves.model.js');

const Controller = {
	all: (req, res) => {
		Moves.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	id: (req, res) => {
		Moves.id(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	}

};

module.exports = Controller;