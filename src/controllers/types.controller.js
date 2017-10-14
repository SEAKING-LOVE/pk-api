const Types = require('../models/types.model.js');

const Controller = {
	all: (req, res) => {
		res.send('Types endpoint');
	}
};

module.exports = Controller;