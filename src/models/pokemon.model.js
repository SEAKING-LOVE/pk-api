const squel = require('squel');
const query = require('../pgconnect.js');

const Model = {
	all: () => {
		const queryString = squel.select()
			.from('pokemon.pokemon')
			.field('id')
			.field('identifier')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseExperience')
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;