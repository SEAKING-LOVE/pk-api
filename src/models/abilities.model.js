const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	abilities: 'pokemon.abilities',
	abilitiesDesc: 'pokemon.ability_flavor_text'
}
const Model = {
	all: () => {
		const subQuery = squel.select()
				.from(tables.abilitiesDesc)
				.field(`${tables.abilitiesDesc}.ability_id`)
				.field(`${tables.abilitiesDesc}.language_id`)
				.field(`MAX(${tables.abilitiesDesc}.version_group_id)`)
				.where(`${tables.abilitiesDesc}.language_id = 9`)
				.group(`${tables.abilitiesDesc}.language_id`)
				.group(`${tables.abilitiesDesc}.ability_id`)

		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			.join(subQuery, "subQuery", `${tables.abilities}.id = subQuery.ability_id`)
			.order(`${tables.abilities}.identifier`)

		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {
		const subQuery = squel.select()
				.distinct(`${tables.abilitiesDesc}.ability_id`)
				.from(tables.abilitiesDesc)
				.field(`${tables.abilitiesDesc}.ability_id`)
				.field(`${tables.abilitiesDesc}.language_id`)
				.field(`${tables.abilitiesDesc}.flavor_text`)
				.field(`MAX(${tables.abilitiesDesc}.version_group_id)`)
				.where(`${tables.abilitiesDesc}.language_id = 9`)
				.group(`${tables.abilitiesDesc}.language_id`)
				.group(`${tables.abilitiesDesc}.ability_id`)
				.group(`${tables.abilitiesDesc}.flavor_text`)

		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			.field(`subQuery.flavor_text`)
			.join(subQuery, "subQuery", `${tables.abilities}.id = subQuery.ability_id`)
			.where(`${tables.abilities}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });

	}
}

module.exports = Model;