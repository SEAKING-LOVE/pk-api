const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	abilities: 'pokemon.abilities',
	abilitiesDesc: 'pokemon.ability_flavor_text'
}
const Model = {
	all: () => {
		const queryString = squel.select()
			.distinct(`${tables.abilitiesDesc}.flavor_text`)
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			.field(`${tables.abilitiesDesc}.flavor_text`)
			.distinct() 	// figure out how to get distinc to work :S
			.join(tables.abilitiesDesc, null, `${tables.abilities}.id = ${tables.abilitiesDesc}.ability_id`)
			.where(`${tables.abilitiesDesc}.language_id = 9`)
			.order(`${tables.abilities}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {
		const queryString = squel.select()
			.distinct(`${tables.abilitiesDesc}.flavor_text`)
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			.field(`${tables.abilitiesDesc}.flavor_text`)
			.distinct() 	// figure out how to get distinc to work :S
			.join(tables.abilitiesDesc, null, `${tables.abilities}.id = ${tables.abilitiesDesc}.ability_id`)
			.where(`${tables.abilitiesDesc}.language_id = 9`)
			.where(`${tables.abilities}.id = ${id}`)
			.order(`${tables.abilities}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });

	}
}

module.exports = Model;