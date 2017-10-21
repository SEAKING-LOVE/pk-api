const Pokemon = require('../models/pokemon.model.js');

const Controller = {
	all: (req, res) => {
		Pokemon.all();
		res.send('pokemon endpoint');
	}
};

module.exports = Controller;