const squel = require('squel');
const client = require('../pgconnect.js');
client.connect();

const Model = {
	all: () => {
		const test = squel.select()
			.from('pokedex.pokemon')
			.field("name")
			.where('id < 5')
			.toString();

		console.log("TEST QUERY ", test);
	}
};

module.exports = Model;