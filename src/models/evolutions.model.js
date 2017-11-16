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
		const evoChainQuery = squel.select()
			.from(tables.species)
			.field(`${tables.species}.evolution_chain_id`)
			.where(`${tables.species}.id = ${id}`)

		const pokemonSpeciesQuery = (evoChain) => {
			return squel.select()
			.from(tables.species)
			.field('id')
			.field('identifier', 'name')
			.field('evolves_from_species_id', 'predecessorid')
			.field('evolution_chain_id', 'chainId')
			.where(`${tables.species}.evolution_chain_id = ${evoChain}`)
		} 
		return query(evoChainQuery)
			.then((targetSpecies) => {
				return query(pokemonSpeciesQuery(targetSpecies['evolution_chain_id']))
					.then((chainSpecies) => {
						if(!Array.isArray(chainSpecies)) chainSpecies = [chainSpecies];
						return chainSpecies.map((species) => {
							return {
								id: parseInt(species.id),
								name: species.name,
								predecessorId: species.predecessorid,
								chainId: parseInt(species.chainid), 
							}			
						})
					})
					.catch((err) => { return err; })
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;