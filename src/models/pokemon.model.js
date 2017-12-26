const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');
const assets = require('../assets.js');

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
	stats: 'pokemon.stats',
	species: 'pokemon.pokemon_species',
	damage_class_id: 'pokemon.move_damage_class_prose'
};

const totalPk = 802;

const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.pk)
			.field('id')
			.field('identifier', 'name')
			.field('height')
			.field('weight')
			.field('base_experience', 'baseexperience')
			.where(`id <= ${totalPk}`) // to exclude forms
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.then((pks) => {
				return pks.map((pk) => {
					const height = (pk.height / 10).toFixed(1);
					const weight = (pk.weight / 10).toFixed(1);
					const animated = assets.animated(pk.id);
					const artwork = assets.artwork(pk.id);
					const sprite = assets.sprite(pk.id);
					const cry = assets.cry(pk.id);
					const footprint = assets.footprint(pk.id);
					return {
						id: parseInt(pk.id),
						name: pk.name,
						height: parseFloat(height),
						weight: parseFloat(weight),
						baseExperience: parseInt(pk.baseexperience),
						animated,
						artwork,
						sprite,
						cry,
						footprint
					}
				})
			})
			.catch((err) => { return err; });
	},
	general: (id) => {
		const queryString = squel.select()
			.from(tables.pk)
			.field(`${tables.pk}.id`)
			.field(`${tables.pk}.identifier`, 'name')
			.field(`${tables.pk}.height`)
			.field(`${tables.pk}.weight`)
			.field(`${tables.pk}.base_experience`, 'base_experience')
			.field(`${tables.species}.base_happiness`, 'base_happiness')
			.field(`${tables.species}.capture_rate`, 'capture_rate')
			.join(tables.species, null, `${tables.pk}.id = ${tables.species}.id`)
			.where(`${tables.pk}.id = ${id}`)
			.toString();

		return query(queryString)
			.then((pk) => {
				const height = (pk.height / 10).toFixed(1);
				const weight = (pk.weight / 10).toFixed(1);
				const pokemonId = parseInt(pk.id);

				const animated = assets.animated(pokemonId);
				const artwork = assets.artwork(pokemonId);
				const sprite = assets.sprite(pokemonId);
				const cry = assets.cry(pokemonId);
				const footprint = assets.footprint(pokemonId);

				return {
					id: pokemonId,
					name: pk.name,
					height: parseFloat(height),
					weight: parseFloat(weight),
					baseExperience: parseInt(pk.base_experience),
					baseHappiness: parseInt(pk.base_happiness),
					captureRate: parseInt(pk.capture_rate),
					animated: animated,
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
						name: type.name
					}
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
			.field(`${tables.moves}.power`, 'power')
			.field(`${tables.moves}.pp`, 'pp')
			.field(`${tables.moves}.accuracy`, 'accuracy')
			.field(`${tables.moves}.type_id`, 'type_id')
			.field(`${tables.moves}.damage_class_id`, 'damage_class_id')
			.field(`${tables.moveMethods}.identifier`, 'method')
			.field(`${tables.types}.identifier`, 'type_name')
			.field(`${tables.damage_class_id}.name`, 'damage_class_name')
			.join(tables.moves, null, `${tables.pkMoves}.move_id = ${tables.moves}.id`)
			.join(tables.moveMethods, null, `${tables.pkMoves}.pokemon_move_method_id = ${tables.moveMethods}.id`)
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.join(tables.damage_class_id, null, `${tables.damage_class_id}.move_damage_class_id = ${tables.moves}.damage_class_id AND ${tables.damage_class_id}.local_language_id = 9`)
			.where(`${tables.pkMoves}.pokemon_id = ${id}`)
			.where(`${tables.pkMoves}.version_group_id = 17`)
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
						name: (move.name).replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
						type: (move.type_name).replace(/\b\w/g, l => l.toUpperCase()),
						class: (move.damage_class_name).replace(/\b\w/g, l => l.toUpperCase()),
						power: move.power ? parseInt(move.power) : "-",
						pp: parseInt(move.pp),
						accuracy: move.accuracy ? parseInt(move.accuracy) : "-"
					});
				});
				Object.keys(catagorized).forEach(key => {
					if (key === 'level-up') {
						catagorized[key].sort( (a, b) => {
						    return a.level - b.level;
						});
					} else {
						catagorized[key].sort( (a, b) => {
						    return a.id - b.id;
						});
					}
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
