const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	pk: 'pokemon.pokemon',
	pkTypes: 'pokemon.pokemon_types',
	types: 'pokemon.types',
}
const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.pk)
			.field('id')
			.field('identifier')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseExperience')
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {
		const queryString = squel.select()
			.from(tables.pk)
			.field('id')
			.field('identifier')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseExperience')
			.where(`${tables.pk}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	typeId: (id) => {
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