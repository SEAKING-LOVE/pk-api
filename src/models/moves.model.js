const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	moves: 'pokemon.moves',
	movesCategory: 'pokemon.move_battle_styles',
	movesDetails: 'pokemon.move_meta',
	movesDesc: 'pokemon.move_flavor_text',
	types: 'pokemon.types',
	pkMoves: 'pokemon.pokemon_moves',
	damage_class_id: 'pokemon.move_damage_class_prose',
	move_effect: 'pokemon.move_effect_prose'
};


const format = {
	processEffectDesc: (effect, chance) => {
		return effect.replace("$effect_chance%", chance)
					 .replace(/\[(.*?)\]/g, "");
	}
}

const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.moves)
			.field(`${tables.moves}.id`, 'moveId')
			.field(`${tables.moves}.identifier`, 'moveName')
			.field(`${tables.moves}.power`)
			.field(`${tables.moves}.pp`)
			.field(`${tables.moves}.accuracy`)
			.field(`${tables.types}.identifier`, 'typeName')
			.field(`${tables.types}.id`, 'typeId')
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.order(`${tables.moves}.identifier`)
			.toString();

		return query(queryString)
			.then((moves) => {
				return moves.map((move) => {
					return {
						moveId: parseInt(move.moveId),
						moveName: move.moveName,
						power: parseInt(move.power),
						pp: parseInt(move.pp),
						accuracy: move.accuracy,
						typeId: parseInt(move.typeId),
						typeName: move.typeName
					}
				});
			})
			.catch((err) => { return err; });
	},
	// https://github.com/SEAKING-LOVE/pk-api/blob/master/data/move_damage_classes.csv
	description: (id) => { //add distinct
		const queryString = squel.select()
			.from(tables.moves)
			.field(`${tables.moves}.id`)
			.field(`${tables.moves}.identifier`, 'moveName')
			.field(`${tables.moves}.power`)
			.field(`${tables.moves}.pp`)
			.field(`${tables.moves}.accuracy`)
			.field(`${tables.movesDesc}.flavor_text`, 'description')
			.field(`${tables.types}.id`, 'type_id')
			.field(`${tables.types}.identifier`, 'type_name')
			.field(`${tables.moves}.damage_class_id`, 'damage_class_id')
			.field(`${tables.damage_class_id}.name`, 'damage_class_name')
			.field(`${tables.moves}.effect_id`, 'effect_id')
			.field(`${tables.moves}.effect_chance`, 'effect_chance')
			.field(`${tables.move_effect}.short_effect`, 'effect_description')
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.join(tables.movesDesc, null, `${tables.movesDesc}.move_id = ${tables.moves}.id`)
			.join(tables.damage_class_id, null, `${tables.damage_class_id}.move_damage_class_id = ${tables.moves}.damage_class_id AND ${tables.damage_class_id}.local_language_id = 9`)
			.join(tables.move_effect, null, `${tables.move_effect}.move_effect_id = ${tables.moves}.effect_id AND ${tables.damage_class_id}.local_language_id = 9`)
			.where(`${tables.moves}.id = ${id}`)
			.where(`${tables.movesDesc}.language_id = 9`)
			.where(`${tables.movesDesc}.version_group_id = 17`)
			.toString();

		return query(queryString)
			.then((move) => {
					const effectChanceStr = move.effect_chance ? (move.effect_chance).toString() + "%" : '';
					const effectDescription = format.processEffectDesc(move.effect_description, effectChanceStr);

					return {
						id: parseInt(move.id),
						moveName: move.moveName,
						power: parseInt(move.power),
						pp: parseInt(move.pp),
						accuracy: parseInt(move.accuracy),
						description: move.description,
						typeId: parseInt(move.type_id),
						typeName: move.type_name,
						categoryTypeId: parseInt(move.damage_class_id),
						categoryTypeName: move.damage_class_name,
						effectId: parseInt(move.effect_id),
						effectChance: move.effect_chance,
						effectDescription: effectDescription
					}
				})
			.catch((err) => { return err; });
	},
	pokemon: (id) => {
		const queryString = squel.select()
			.from(tables.pkMoves)
			.field(`${tables.pkMoves}.pokemon_id`, 'pokemonId')
			.field(`${tables.pkMoves}.move_id`, 'moveId')
			.field(`${tables.pkMoves}.pokemon_move_method_id`, 'moveMethodId')
			.field(`${tables.pkMoves}.level`)
			.field(`${tables.moves}.identifier`, 'moveName')
			.join(tables.moves, null, `${tables.pkMoves}.move_id = ${tables.moves}.id`)
			.where(`${tables.pkMoves}.move_id = ${id}`)

		return query(queryString)
			.then((moves) => {
				return moves.map((move) => {
					return {
						pokemonId: parseInt(move.pokemonId),
						moveId: parseInt(move.moveId),
						moveMethodId: parseInt(move.moveMethodId),
						level: parseInt(move.level),
						moveName: move.moveName,
					}
				});
			})
			.catch((err) => { return err; });
	}
}

module.exports = Model;
