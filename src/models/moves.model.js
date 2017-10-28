const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	moves: 'pokemon.moves',
	moveCategory: 'pokemon.move_battle_styles',
	moveDetails: 'pokemon.move_meta',
	moveDesc: 'pokemon.move_flavor_text',
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
	id: (id) => {

	}
}

module.exports = Model;