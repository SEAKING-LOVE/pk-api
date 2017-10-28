const squel = require('squel');
const query = require('../pgconnect.js');

const tables = {
	moves: 'moves',
	moveCategory: 'move_battle_styles',
	moveDetails: 'move_meta',
	moveDesc: 'move_flavor_text',
	types: 'types',
};


const Model = {
	all: () => {

	},
	id: (id) => {

	}
}

module.exports = Model;