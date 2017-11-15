const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	abilities: 'pokemon.abilities',
	abilitiesDesc: 'pokemon.ability_flavor_text',
	pkAbilities: 'pokemon.pokemon_abilities',
};

const Model = {
	all: () => {
		const subQuery = squel.select()
				.from(tables.abilitiesDesc)
				.field(`${tables.abilitiesDesc}.ability_id`)
				.field(`${tables.abilitiesDesc}.language_id`)
				.field(`MAX(${tables.abilitiesDesc}.version_group_id)`)
				.where(`${tables.abilitiesDesc}.language_id = 9`)
				.group(`${tables.abilitiesDesc}.language_id`)
				.group(`${tables.abilitiesDesc}.ability_id`)

		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`, 'name')
			.join(subQuery, "subQuery", `${tables.abilities}.id = subQuery.ability_id`)
			.order(`${tables.abilities}.identifier`)

		return query(queryString)
			.then((abilities) => {
				return abilities.map((ability) => {
					return {
						id: parseInt(ability.id),
						name: ability.name
					}
				})
			})
			.catch((err) => { return err; });
	},
	description: (id) => {
		const subQuery = squel.select()
				.distinct(`${tables.abilitiesDesc}.ability_id`)
				.from(tables.abilitiesDesc)
				.field(`${tables.abilitiesDesc}.ability_id`)
				.field(`${tables.abilitiesDesc}.language_id`)
				.field(`${tables.abilitiesDesc}.flavor_text`)
				.field(`MAX(${tables.abilitiesDesc}.version_group_id)`)
				.where(`${tables.abilitiesDesc}.language_id = 9`)
				.group(`${tables.abilitiesDesc}.language_id`)
				.group(`${tables.abilitiesDesc}.ability_id`)
				.group(`${tables.abilitiesDesc}.flavor_text`)

		const queryString = squel.select()
			.from(tables.abilities)
			.field(`${tables.abilities}.id`)
			.field(`${tables.abilities}.identifier`, 'name')
			.field(`subQuery.flavor_text`, 'description')
			.join(subQuery, "subQuery", `${tables.abilities}.id = subQuery.ability_id`)
			.where(`${tables.abilities}.id = ${id}`)
			.toString();
		return query(queryString)
			.then((ability) => {
				return {
					id: parseInt(ability.id),
					name: ability.name,
					description: ability.description
				}
			})
			.catch((err) => { return err; });

	},
	pokemon: (id) => {
		const queryString = squel.select()
			.from(tables.pkAbilities)
			.field(`${tables.pkAbilities}.pokemon_id`, 'pokemonId')
			.field(`${tables.pkAbilities}.is_hidden`, 'isHidden')
			.field(`${tables.abilities}.identifier`, 'abilityName')
			.join(tables.abilities, null, `${tables.pkAbilities}.ability_id = ${tables.abilities}.id`)
			.where(`${tables.pkAbilities}.ability_id = ${id}`)
			.toString();

		return query(queryString)
			.then((pokemon) => {
				return pokemon.map((ability) => {
					return {
						pokemonId: parseInt(ability.pokemonid),
						isHidden: ability.isHidden == 1, 
						abilityName: ability.abilityname
					};
				})
			})
			.catch((err) => { return err; });
	}
}

module.exports = Model;