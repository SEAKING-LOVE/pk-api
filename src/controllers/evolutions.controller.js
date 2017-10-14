const Evolutions = require('../models/evolutions.model.js');

const Controller = {
	all: (req, res) => {
		res.send('evolutions endpoint');
	}
};

module.exports = Controller;