const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	pk: 'pokemon.pokemon',
	pkTypes: 'pokemon.pokemon_types',
	types: 'pokemon.types',
	pkAbilities: 'pokemon.pokemon_abilities',
	abilities: 'pokemon.abilities',
	pkMoves: 'pokemon.pokemon_moves',
	moves: 'pokemon.moves',
	moveMethods: 'pokemon.pokemon_move_methods',
	pkStats: 'pokemon.pokemon_stats',
	stats: 'pokemon.stats'
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
	types: (id) => {
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
	abilities: (id) => {
		const queryString = squel.select()
			.from(tables.pkAbilities)
			.field(`${tables.pkAbilities}.ability_id`, 'id')
			.field(`${tables.pkAbilities}.is_hidden`, 'hidden')
			.field(`${tables.abilities}.identifier`)
			.join(tables.abilities, null, `${tables.pkAbilities}.ability_id = ${tables.abilities}.id`)
			.where(`${tables.pkAbilities}.pokemon_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { 
				return data.map((ability) => {
					const { id, hidden, identifier } = ability;
					return {
						id,
						identifier,
						hidden: hidden == 1
					}
				})
			})
			.catch((err) => { return err; });	
	},
	moves: (id) => {
		const queryString = squel.select()
			.from(tables.pkMoves)
			.field(`${tables.pkMoves}.move_id`, 'id')
			.field(`${tables.pkMoves}.level`)
			.field(`${tables.moves}.identifier`)
			.field(`${tables.moveMethods}.identifier`, 'method')
			.join(tables.moves, null, `${tables.pkMoves}.move_id = ${tables.moves}.id`)
			.join(tables.moveMethods, null, `${tables.pkMoves}.pokemon_move_method_id = ${tables.moveMethods}.id`)
			.where(`${tables.pkMoves}.pokemon_id = ${id}`)
			.toString()

		return query(queryString)
			.then((data) => {
				let catagorized = {};
				data.forEach((moves) => {
					const method = moves.method;
					const { id, level, identifier } = moves;
					if(!catagorized[method]) catagorized[method] = [];
					catagorized[method].push({ id, level, identifier });
				});
				return catagorized;
			})
			.catch((err) => { return err; });
	},
	stats: (id) => {
		const queryString = squel.select()
			.from(tables.pkStats)
			.field(`${tables.pkStats}.base_stat`, 'value')
			.field(`${tables.stats}.identifier`, 'identifier')
			.join(tables.stats, null, `${tables.pkStats}.stat_id = ${tables.stats}.id`)
			.where(`${tables.pkStats}.pokemon_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => {
				let stats = {};
				data.forEach((stat) => {
					stats[stat.identifier] = stat.value;
				})
				return stats;
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;