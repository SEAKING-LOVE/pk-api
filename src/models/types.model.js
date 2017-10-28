const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	types: 'pokemon.types',
	effectiveness: 'pokemon.type_efficacy',

};


const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.types)
			.field(`${tables.types}.id`)
			.field(`${tables.types}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {

	},
	effectivenessAll: () => {

	},
	effectivenessId: (id) => {

	}
};

module.exports = Model;