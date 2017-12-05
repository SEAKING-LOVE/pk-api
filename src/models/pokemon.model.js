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
			.field('identifier', 'name')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseexperience')
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.then((pks) => {
				return pks.map((pk) => {
					const height = (pk.height / 10).toFixed(1);
					const weight = (pk.weight / 10).toFixed(1);
					return {
						id: parseInt(pk.id),
						name: pk.name,
						height: parseFloat(height),
						weight: parseFloat(weight),
						baseExperience: parseInt(pk.baseexperience)
					}
				})
			})
			.catch((err) => { return err; });
	},
		general: (id) => {
		const queryString = squel.select()
			.from(tables.pk)
			.field('id')
			.field('identifier', 'name')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseexperience')
			.where(`${tables.pk}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((pk) => {
				const height = (pk.height / 10).toFixed(1);
				const weight = (pk.weight / 10).toFixed(1);
				const pokemonId = parseInt(pk.id);
				const artwork = `https://raw.githubusercontent.com/SEAKING-LOVE/pk-assets/master/pokemon/artwork/${pokemonId}.png`;
				const sprite = `https://raw.githubusercontent.com/SEAKING-LOVE/pk-assets/master/pokemon/sprites/${pokemonId}.png`;
				const cry = `https://raw.githubusercontent.com/SEAKING-LOVE/pk-assets/master/pokemon/cries/${pokemonId}.mp3`;
				const footprint = pokemonId <= 649 ? `https://raw.githubusercontent.com/SEAKING-LOVE/pk-assets/master/pokemon/footprint/${pokemonId}.png` : null;
				return {
					id: pokemonId,
					name: pk.name,
					height: parseFloat(height),
					weight: parseFloat(weight),
					baseExperience: parseInt(pk.baseexperience),
					artwork: artwork,
					sprite: sprite,
					cry: cry,
					footprint: footprint,
				}
			})
			.catch((err) => { return err; });
	},
	types: (id) => {
		const queryString = squel.select()
			.from(tables.pkTypes)
			.field(`${tables.pkTypes}.type_id`, 'id')
			.field(`${tables.types}.identifier`, 'name')
			.join(tables.types, null, `${tables.pkTypes}.type_id = ${tables.types}.id`)
			.where(`${tables.pkTypes}.pokemon_id = ${id}`)
			.toString();
		return query(queryString)
			.then((types) => {
				if(!Array.isArray(types)) types = [types];
				return types.map((type) => {
					return {
						id: parseInt(type.id),
						name: type.name					}
				})
			})
			.catch((err) => { return err; });
	},
	abilities: (id) => {
		const queryString = squel.select()
			.from(tables.pkAbilities)
			.field(`${tables.pkAbilities}.ability_id`, 'id')
			.field(`${tables.pkAbilities}.is_hidden`, 'hidden')
			.field(`${tables.abilities}.identifier`, 'name')
			.join(tables.abilities, null, `${tables.pkAbilities}.ability_id = ${tables.abilities}.id`)
			.where(`${tables.pkAbilities}.pokemon_id = ${id}`)
			.toString();
		return query(queryString)
			.then((abilities) => {
				if(!Array.isArray(abilities)) abilities = [abilities];
				return abilities.map((ability) => {
					return {
						id: parseInt(ability.id),
						name: ability.name,
						hidden: ability.hidden == 1
					}
				});
			})
			.catch((err) => { return err; });
	},
	moves: (id) => {
		const queryString = squel.select()
			.from(tables.pkMoves)
			.field(`${tables.pkMoves}.move_id`, 'id')
			.field(`${tables.pkMoves}.level`)
			.field(`${tables.moves}.identifier`, 'name')
			.field(`${tables.moveMethods}.identifier`, 'method')
			.join(tables.moves, null, `${tables.pkMoves}.move_id = ${tables.moves}.id`)
			.join(tables.moveMethods, null, `${tables.pkMoves}.pokemon_move_method_id = ${tables.moveMethods}.id`)
			.where(`${tables.pkMoves}.pokemon_id = ${id}`)
			.toString()

		return query(queryString)
			.then((data) => {
				let catagorized = {};
				data.forEach((move) => {
					const method = move.method;
					if(!catagorized[method]) catagorized[method] = [];
					catagorized[method].push({
						id: parseInt(move.id),
						level: parseInt(move.level),
						name: move.name
					});
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
					if(stat.identifier == 'special-attack') stat.identifier = 'specialAttack';
					if(stat.identifier == 'special-defense') stat.identifier = 'specialDefense';
					stats[stat.identifier] = parseInt(stat.value);
				})
				return stats;
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;
