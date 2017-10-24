const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	abilities: 'pokemon.abilities',
	abilitiesDesc: 'pokemon.ability_flavor_text'
}
const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			.field(`${tables.abilitiesDesc}.flavor_text`)
			// .field(`max(${tables.abilitiesDesc}.version_group_id)`)
			.join(tables.abilitiesDesc, null, `${tables.abilities}.id = ${tables.abilitiesDesc}.ability_id`)
			.where(`${tables.abilitiesDesc}.language_id = 9`)
			// .group(`${tables.abilitiesDesc}.ability_id`)
			.order(`${tables.abilities}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {

	}
}

module.exports = Model;