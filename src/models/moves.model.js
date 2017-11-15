const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	moves: 'pokemon.moves',
	movesCategory: 'pokemon.move_battle_styles',
	movesDetails: 'pokemon.move_meta',
	movesDesc: 'pokemon.move_flavor_text',
	types: 'pokemon.types',
	pkMoves: 'pokemon.pokemon_moves',
};

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
			.field(`${tables.types}.id`, 'typeId')
			.field(`${tables.types}.identifier`, 'typeName')
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.join(tables.movesDesc, null, `${tables.movesDesc}.move_id = ${tables.moves}.id`)
			.where(`${tables.moves}.id = ${id}`)
			.where(`${tables.movesDesc}.language_id = 9`)
			.toString();
		return query(queryString)
			.then((moves) => {
				return moves.map((move) => {
					return {
						id: parseInt(move.id),
						moveName: move.moveName,
						power: parseInt(move.power),
						pp: parseInt(move.pp),
						accuracy: parseInt(move.accuracy),
						description: move.description,
						typeId: parseInt(move.typeId),
						typeName: move.typeName
					}
				});
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