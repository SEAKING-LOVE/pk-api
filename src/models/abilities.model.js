const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	abilities: 'pokemon.abilities',
	abilitiesDesc: 'pokemon.ability_flavor_text'
}
const Model = {
	all: () => {
		// select ability_id, language_id, max(version_group_id)
		// from ability_flavor_text 
		// where language_id = '9' group by language_id, ability_id;
		const subQuery = squel.select()
				.from(tables.abilitiesDesc)
				.field(`${tables.abilitiesDesc}.ability_id`)
				.field(`${tables.abilitiesDesc}.language_id`)
				.field(`MAX(${tables.abilitiesDesc}.version_group_id)`)
				.where(`${tables.abilitiesDesc}.language_id = 9`)
				.group(`${tables.abilitiesDesc}.language_id`)
				.group(`${tables.abilitiesDesc}.ability_id`)
				//.toString();

		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`)
			//.field(`${tables.abilitiesDesc}.flavor_text`)
			
			// .join(tables.abilitiesDesc, null, `${tables.abilities}.id = ${tables.abilitiesDesc}.ability_id`)
			.join(subQuery, "subQuery", `${tables.abilities}.id = subQuery.ability_id`)
			//.where(`${tables.abilitiesDesc}.language_id = 9`)
			.order(`${tables.abilities}.identifier`)
			// .toString();
		// console.log(queryString.toString());
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
			//.where(`${tables.abilitiesDesc}.language_id = 9`)
			.where(`${tables.abilities}.id = ${id}`)
			//.order(`${tables.abilities}.identifier`)
			//.toString();
		console.log(subQuery.toString());
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });

	}
}

module.exports = Model;