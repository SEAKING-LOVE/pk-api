const squel = require('squel');

const tables = {
	evo: 'pokemon.pokemon_evolution',
	trigger: 'pokemon.evolution_trigger',
	pk: 'pokemon.pokemon',
	species: 'pokemon_species'
};


const Model = {
	id: (id) => {
		// group by evolution_chain_id and return id of pokemon where
		// evolves_from_species_id = NULL because that should be the baby form
		// https://github.com/SEAKING-LOVE/pk-api/blob/master/data/pokemon_species.csv
		// DOCS: http://veekun.github.io/pokedex/main-tables.html#dex-table-pokemonspecies
		const queryString = squel.select()
			.field(`${tables.species}.id`)
			.where()
			.from(tables.evo);
		return query(queryString)
			.then((data) => { return data; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;