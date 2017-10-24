const Abilities = require('../models/abilities.model.js');

const Controller = {
	all: (req, res) => {
		Abilities.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	},
	// id: (req, res) => {
	// 	Abilities.id(req.params.id)
	// 	.then((data) => res.send(data))
	// 	.catch((err) => res.send(err));
	// }

};

module.exports = Controller;