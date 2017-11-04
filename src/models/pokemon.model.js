const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	pk: 'pokemon.pokemon',
	pkTypes: 'pokemon.pokemon_types',
	types: 'pokemon.types',
	pkAbilities: 'pokemon.pokemon_abilities',
	abilities: 'pokemon.abilities',
	pkMoves: 'pokemon.pokemon_moves',
	moves: 'pokemon.moves'
};

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
	general: (id) => {
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
	type: (id) => {
		const queryString = squel.select()
			.from(tables.pkTypes)
			.field(`${tables.pkTypes}.type_id`, 'id')
			.field(`${tables.types}.identifier`)
			.join(tables.types, null, `${tables.pkTypes}.type_id = ${tables.types}.id`)
			.where(`${tables.pkTypes}.pokemon_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	ability: (id) => {
		
	},
	move: (id) => {

	}
};

module.exports = Model;