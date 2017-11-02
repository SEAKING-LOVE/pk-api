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
	},
	abilityId: (id) => {
		const queryString = squel.select()
			.from(tables.pkAbilities)
			.field(`${tables.pkAbilities}.pokemon_id`)
			.field(`${tables.pkAbilities}.is_hidden`)
			.field(`${tables.abilities}.identifier`)
			.join(tables.abilities, null, `${tables.pkAbilities}.ability_id = ${tables.abilities}.id`)
			.where(`${tables.pkAbilities}.ability_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	moveId: (id) => {
		const queryString = squel.select()
			.from(tables.pkMoves)
			.field(`${tables.pkMoves}.pokemon_id`)
			.field(`${tables.pkMoves}.move_id`)
			.field(`${tables.pkMoves}.pokemon_move_method_id`)
			.field(`${tables.pkMoves}.level`)
			.field(`${tables.moves}.identifier`)
			.join(tables.moves, null, `${tables.pkMoves}.move_id = ${tables.moves}.id`)
			.where(`${tables.pkMoves}.move_id = ${id}`)

		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;