const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	evo: 'pokemon.pokemon_evolution',
	trigger: 'pokemon.evolution_trigger',
	pk: 'pokemon.pokemon',
	species: 'pokemon.pokemon_species'
};


const Model = {
	id: (id) => {
		// group by evolution_chain_id and return id of pokemon where
		// evolves_from_species_id = NULL because that should be the baby form
		// https://github.com/SEAKING-LOVE/pk-api/blob/master/data/pokemon_species.csv
		// DOCS: http://veekun.github.io/pokedex/main-tables.html#dex-table-pokemonspecies
		
		const evoChainQuery = squel.select()
			.from(tables.species)
			.field(`${tables.species}.evolution_chain_id`)
			.where(`${tables.species}.id = ${id}`)

		const pokemonSpeciesQuery = (evoChain) => {
			return squel.select()
			.from(tables.species)
			.where(`${tables.species}.evolution_chain_id = ${evoChain}`)

		} 

		return query(evoChainQuery)
			.then((targetSpecies) => {
				return query(pokemonSpeciesQuery(targetSpecies['evolution_chain_id']))
					.then((chainSpecices) => {
						return chainSpecices
					})
					.catch((err) => { return err; })
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;