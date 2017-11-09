const Evolutions = require('../models/evolutions.model.js');

const Controller = {
	all: (req, res) => {
		Evolutions.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	id: (req, res) => {
		Evolutions.id(req.params.id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	}
};

module.exports = Controller;