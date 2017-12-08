const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	evo: 'pokemon.pokemon_evolution',
	triggers: 'pokemon.evolution_triggers',
	item_names: 'pokemon.item_names',
	pk: 'pokemon.pokemon',
	species: 'pokemon.pokemon_species'
};


const Model = {
	id: (id) => {		
		const evoChainQuery = squel.select()
			.from(tables.species)
			.field(`${tables.species}.evolution_chain_id`)
			.where(`${tables.species}.id = ${id}`)

		const evolutionData = squel.select()
			.from(tables.evo)
			.field(`${tables.evo}.evolved_species_id`)
			.field(`${tables.evo}.evolution_trigger_id`)
			.field(`${tables.evo}.trigger_item_id`)
			.field(`${tables.evo}.minimum_level`)
			.field(`${tables.evo}.gender_id`)
			.field(`${tables.evo}.location_id`)
			.field(`${tables.evo}.held_item_id`)
			.field(`${tables.evo}.time_of_day`)
			.field(`${tables.evo}.known_move_id`)
			.field(`${tables.evo}.known_move_type_id`)
			.field(`${tables.evo}.minimum_happiness`)
			.field(`${tables.evo}.minimum_beauty`)
			.field(`${tables.evo}.minimum_affection`)
			.field(`${tables.evo}.relative_physical_stats`)
			.field(`${tables.evo}.party_species_id`)
			.field(`${tables.evo}.party_type_id`)
			.field(`${tables.evo}.trade_species_id`)
			.field(`${tables.evo}.needs_overworld_rain`)
			.field(`${tables.evo}.turn_upside_down`)

		const triggerData = squel.select()
			.from(tables.triggers)
			.field(`${tables.triggers}.evolution_trigger_id`)
			.field(`${tables.triggers}.name`)
			.where(`${tables.triggers}.local_language_id = 9`)

		const itemData = squel.select()
			.from(tables.item_names)
			.field(`${tables.item_names}.item_id`)
			.field(`${tables.item_names}.name`)
			.where(`${tables.item_names}.local_language_id = 9`)

		const pokemonSpeciesQuery = (evoChain) => {
			return squel.select()
			.from(tables.species, species)
			.field(`species.id`, 'pkid')
			.field(`species.identifier`, 'name')
			.field(`species.evolves_from_species_id`, 'predecessorid')
			.field(`species.evolution_chain_id`, 'chainId')
			.field(`evolutionData.evolved_species_id`)
			.field(`evolutionData.evolution_trigger_id`)
			.field(`evolutionData.trigger_item_id`)
			.field(`evolutionData.minimum_level`)
			.field(`evolutionData.gender_id`)
			.field(`evolutionData.location_id`)
			.field(`evolutionData.held_item_id`)
			.field(`evolutionData.time_of_day`)
			.field(`evolutionData.known_move_id`)
			.field(`evolutionData.known_move_type_id`)
			.field(`evolutionData.minimum_happiness`)
			.field(`evolutionData.minimum_beauty`)
			.field(`evolutionData.minimum_affection`)
			.field(`evolutionData.relative_physical_stats`)
			.field(`evolutionData.party_species_id`)
			.field(`evolutionData.party_type_id`)
			.field(`evolutionData.trade_species_id`)
			.field(`evolutionData.needs_overworld_rain`)
			.field(`evolutionData.turn_upside_down`)
			.field(`triggerData.name`, 'trigger_method')
			.field(`itemTriggerData.name`, 'trigger_item')
			.field(`itemHeldData.name`, 'held_item')
			.left_join(evolutionData, "evolutionData", `species.id = evolutionData.evolved_species_id`)
			.left_join(triggerData, "triggerData", `evolutionData.evolution_trigger_id = triggerData.evolution_trigger_id`)
			.left_join(itemData, "itemTriggerData", `evolutionData.trigger_item_id = itemTriggerData.item_id`)
			.left_join(itemData, "itemHeldData", `evolutionData.held_item_id = itemHeldData.item_id`)
			.where(`${tables.species}.evolution_chain_id = ${evoChain}`)
		} 
		return query(evoChainQuery)
			.then((targetSpecies) => {
				return query(pokemonSpeciesQuery(targetSpecies['evolution_chain_id']))
					.then((chainSpecies) => {
						if(!Array.isArray(chainSpecies)) chainSpecies = [chainSpecies];
						return chainSpecies.map((species) => {
							return {
								id: parseInt(species.pkid),
								name: species.name,
								predecessorId: species.predecessorid,
								chainId: parseInt(species.chainid), 
								// Todo, fill in the other evolution method information
								minimumLevel: species.minimum_level,
								triggerMethod: species.trigger_method,
								triggerItem: species.trigger_item,
								heldItem: species.held_item,
							}			
						})
					})
					.catch((err) => { return err; })
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;