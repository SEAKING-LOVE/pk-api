const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	types: 'pokemon.types',
	effectiveness: 'pokemon.type_efficacy',
	pk: 'pokemon.pokemon',
	pkTypes: 'pokemon.pokemon_types',
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
		const queryString = squel.select()
			.from(tables.types)
			.field(`${tables.types}.id`)
			.field(`${tables.types}.identifier`)
			.where(`${tables.types}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	effectivenessAll: () => {
		const queryString = squel.select()
			.from(tables.types)
			.field(`${tables.types}.id`)
			.field(`${tables.types}.identifier`)
			.field(`${tables.effectiveness}.damage_factor`, 'effect')
			.join(tables.effectiveness, null, `${tables.types}.id = ${tables.effectiveness}.damage_type_id`)
			.toString();
		console.log(queryString);
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	effectivenessId: (id) => {

	},
	pokemon: (id) => {
		const queryString = squel.select()
			.from(tables.pkTypes)
			.field(`${tables.pkTypes}.pokemon_id`, 'pokemonId')
			.field(`${tables.pkTypes}.type_id`, 'typeId')
			.field(`${tables.pk}.identifier`, 'pokemonName')
			.field(`${tables.types}.identifier`, 'typeName')
			.join(tables.pk, null, `${tables.pk}.id = ${tables.pkTypes}.pokemon_id`)
			.join(tables.types, null, `${tables.types}.id = ${tables.pkTypes}.type_id`)
			.where(`${tables.pkTypes}.type_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;