const Pokemon = require('../models/pokemon.model.js');

const Controller = {
	all: (req, res) => {
		Pokemon.all()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
		// res.send('pokemon endpoint');
	}
};

module.exports = Controller;