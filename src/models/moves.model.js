const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	moves: 'pokemon.moves',
	movesCategory: 'pokemon.move_battle_styles',
	movesDetails: 'pokemon.move_meta',
	movesDesc: 'pokemon.move_flavor_text',
	types: 'pokemon.types',
};

const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.moves)
			.field(`${tables.moves}.id`)
			.field(`${tables.moves}.identifier`)
			.field(`${tables.moves}.power`)
			.field(`${tables.moves}.pp`)
			.field(`${tables.moves}.accuracy`)
			.field(`${tables.types}.identifier`, 'type')
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.order(`${tables.moves}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	// https://github.com/SEAKING-LOVE/pk-api/blob/master/data/move_damage_classes.csv
	id: (id) => { //add distinct
		const queryString = squel.select()
			.from(tables.moves)
			.field(`${tables.moves}.id`)
			.field(`${tables.moves}.identifier`)
			.field(`${tables.moves}.power`)
			.field(`${tables.moves}.pp`)
			.field(`${tables.moves}.accuracy`)
			.field(`${tables.movesDesc}.flavor_text`)
			.field(`${tables.types}.identifier`, 'type')
			.join(tables.types, null, `${tables.types}.id = ${tables.moves}.type_id`)
			.join(tables.movesDesc, null, `${tables.movesDesc}.move_id = ${tables.moves}.id`)
			.where(`${tables.moves}.id = ${id}`)
			.where(`${tables.movesDesc}.language_id = 9`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
}

module.exports = Model;