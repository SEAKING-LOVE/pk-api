const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	types: 'pokemon.types',
	effectiveness: 'pokemon.type_efficacy',
	pk: 'pokemon.pokemon',
	pkTypes: 'pokemon.pokemon_types',
};

const Model = {
	all: () => {
		const queryString = squel.select()
			.from(tables.types)
			.field(`${tables.types}.id`)
			.field(`${tables.types}.identifier`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	id: (id) => {
		const queryString = squel.select()
			.from(tables.types)
			.field(`${tables.types}.id`)
			.field(`${tables.types}.identifier`)
			.where(`${tables.types}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	effectAll: () => {
		const effectivenessSubquery = squel.select()
			.from(tables.effectiveness)
			.field(`${tables.effectiveness}.damage_type_id`)
			.field(`${tables.effectiveness}.target_type_id`)
			.field(`${tables.effectiveness}.damage_factor`)

		const typeNameRejoin = squel.select()
			.from(tables.types, 'typeRejoin')
			.field(`typeRejoin.id`)
			.field(`typeRejoin.identifier`)

		const queryString = squel.select()
			.from(tables.types, 'types')
			.field(`types.id`, 'damageId')
			.field(`types.identifier`, 'damageType')
			.field(`effectiveness.target_type_id`, 'targetId')
			.field(`typeNameRejoin.identifier`, 'targetType')
			.field(`effectiveness.damage_factor`, 'damageFactor')
			.join(effectivenessSubquery, "effectiveness", `types.id = effectiveness.damage_type_id`)
			.join(typeNameRejoin, "typeNameRejoin", `effectiveness.target_type_id = typeNameRejoin.id`)
			.toString();
		console.log(queryString);
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	pokemon: (id) => {
		const queryString = squel.select()
			.from(tables.pkTypes)
			.field(`${tables.pkTypes}.pokemon_id`, 'pokemonId')
			.field(`${tables.pkTypes}.type_id`, 'typeId')
			.field(`${tables.pk}.identifier`, 'pokemon')
			.field(`${tables.types}.identifier`, 'type')
			.join(tables.pk, null, `${tables.pk}.id = ${tables.pkTypes}.pokemon_id`)
			.join(tables.types, null, `${tables.types}.id = ${tables.pkTypes}.type_id`)
			.where(`${tables.pkTypes}.type_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	effectDamageId: (id) => {
		const effectivenessSubquery = squel.select()
			.from(tables.effectiveness)
			.field(`${tables.effectiveness}.damage_type_id`)
			.field(`${tables.effectiveness}.target_type_id`)
			.field(`${tables.effectiveness}.damage_factor`)

		const typeNameRejoin = squel.select()
			.from(tables.types, 'typeRejoin')
			.field(`typeRejoin.id`)
			.field(`typeRejoin.identifier`)

		const queryString = squel.select()
			.from(tables.types, 'types')
			.field(`types.id`, 'damageId')
			.field(`types.identifier`, 'damageType')
			.field(`effectiveness.target_type_id`, 'targetId')
			.field(`typeNameRejoin.identifier`, 'targetType')
			.field(`effectiveness.damage_factor`, 'damageFactor')
			.join(effectivenessSubquery, "effectiveness", `types.id = effectiveness.damage_type_id`)
			.join(typeNameRejoin, "typeNameRejoin", `effectiveness.target_type_id = typeNameRejoin.id`)
			.where(`effectiveness.damage_type_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	},
	effectTargetId: (id) => {
		const effectivenessSubquery = squel.select()
			.from(tables.effectiveness)
			.field(`${tables.effectiveness}.damage_type_id`)
			.field(`${tables.effectiveness}.target_type_id`)
			.field(`${tables.effectiveness}.damage_factor`)

		const typeNameRejoin = squel.select()
			.from(tables.types, 'typeRejoin')
			.field(`typeRejoin.id`)
			.field(`typeRejoin.identifier`)

		const queryString = squel.select()
			.from(tables.types, 'types')
			.field(`types.id`, 'damageId')
			.field(`types.identifier`, 'damageType')
			.field(`effectiveness.target_type_id`, 'targetId')
			.field(`typeNameRejoin.identifier`, 'targetType')
			.field(`effectiveness.damage_factor`, 'damageFactor')
			.join(effectivenessSubquery, "effectiveness", `types.id = effectiveness.damage_type_id`)
			.join(typeNameRejoin, "typeNameRejoin", `effectiveness.target_type_id = typeNameRejoin.id`)
			.where(`effectiveness.target_type_id = ${id}`)
			.toString();
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;