const squel = require('squel').useFlavour('postgres');
const query = require('../pgconnect.js');

const tables = {
	evo: 'pokemon.pokemon_evolution',
	triggers: 'pokemon.evolution_trigger_prose',
	location_names: 'pokemon.location_area_prose',
	item_names: 'pokemon.item_names',
	pk: 'pokemon.pokemon',
	species: 'pokemon.pokemon_species',
	genders: 'pokemon.genders',
	moves: 'pokemon.moves',
	types: 'pokemon.types'
};

const queryHelper = {
	chainDataQuery: (evoChainId) => {
		return squel.select()
		.from(tables.species, 'species')
		.field(`species.id`, 'pkid')
		.field(`species.identifier`, 'name')
		.field(`species.evolves_from_species_id`, 'predecessorid')
		.field(`species.evolution_chain_id`, 'chainId')
		.field(`evolutionData.evolved_species_id`)
		.field(`evolutionData.evolution_trigger_id`)
		.field(`evolutionData.trigger_item_id`)
		.field(`evolutionData.minimum_level`)
		.field(`evolutionData.gender_id`)
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
		.field(`locationData.name`, 'location_name')
		.field(`genderData.identifier`, 'gender')
		.field(`moveData.identifier`, 'known_move')
		.field(`moveTypeData.identifier`, 'known_move_type')
		.field(`partySpeciesData.identifier`, 'party_species_name')
		.field(`partyTypeData.identifier`, 'party_type_name')
		.field(`tradeSpeciesData.identifier`, 'trade_species_name')
		.field(`itemTriggerData.name`, 'trigger_item')
		.field(`itemHeldData.name`, 'held_item')
		.left_join(queryHelper.evolutionData, "evolutionData", `species.id = evolutionData.evolved_species_id`)
		.left_join(queryHelper.triggerData, "triggerData", `evolutionData.evolution_trigger_id = triggerData.evolution_trigger_id`)
		.left_join(queryHelper.locationData, "locationData", `evolutionData.location_id = locationData.location_area_id`)
		.left_join(queryHelper.genderData, "genderData", `genderData.id = evolutionData.gender_id`)
		.left_join(queryHelper.moveData, "moveData", `moveData.id = evolutionData.known_move_id`)
		.left_join(queryHelper.typeData, "moveTypeData", `moveTypeData.id = evolutionData.known_move_type_id`)
		.left_join(queryHelper.typeData, "partyTypeData", `partyTypeData.id = evolutionData.party_type_id`)
		.left_join(queryHelper.itemData, "itemTriggerData", `evolutionData.trigger_item_id = itemTriggerData.item_id`)
		.left_join(queryHelper.itemData, "itemHeldData", `evolutionData.held_item_id = itemHeldData.item_id`)
		.left_join(queryHelper.speciesRejoinData, "partySpeciesData", `partySpeciesData.id = evolutionData.party_species_id`)
		.left_join(queryHelper.speciesRejoinData, "tradeSpeciesData", `tradeSpeciesData.id = evolutionData.trade_species_id`)
		.where(`species.evolution_chain_id = ${evoChainId}`)
	},
	evolutionData:  squel.select()
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
		.field(`${tables.evo}.turn_upside_down`),
	triggerData: squel.select()
		.from(tables.triggers)
		.field(`${tables.triggers}.evolution_trigger_id`)
		.field(`${tables.triggers}.name`)
		.where(`${tables.triggers}.local_language_id = 9`),
	itemData: squel.select()
		.from(tables.item_names)
		.field(`${tables.item_names}.item_id`)
		.field(`${tables.item_names}.name`)
		.where(`${tables.item_names}.local_language_id = 9`),
	locationData: squel.select()
		.from(tables.location_names)
		.field(`${tables.location_names}.location_area_id`)
		.field(`${tables.location_names}.name`)
		.where(`${tables.location_names}.local_language_id = 9`),
	genderData: squel.select()
		.from(tables.genders)
		.field(`${tables.genders}.id`)
		.field(`${tables.genders}.identifier`),
	moveData: squel.select()
		.from(tables.moves)
		.field(`${tables.moves}.id`)
		.field(`${tables.moves}.identifier`),
	typeData: squel.select()
		.from(tables.types)
		.field(`${tables.types}.id`)
		.field(`${tables.types}.identifier`),
	speciesRejoinData: squel.select()
		.from(tables.species)
		.field(`${tables.species}.id`)
		.field(`${tables.species}.identifier`)
}

const format = {
	chain: (chain) => {
		let newChain = [];
		for(let i = 0; i < chain.length; i ++) {
			const currMember = format.chainMember(chain[i]);
			const newChainIndex = newChain.findIndex((member) => { //find index of curr in newChain
				return member.id == currMember.id; 
			});
			if(newChainIndex == -1) { // add curr to newChain if doesn't already exist
				newChain.push(currMember);
			} else { // merge curr with corresponding newChain member
				newChain[newChainIndex] = format.mergeMembers(newChain[newChainIndex], currMember);
			}
		}
		newChain = format.filterNulls(newChain);
		return newChain;

	},
	mergeMembers: (m1, m2) => {
		let newMember = {};
		
		for(key in m1) {
			const isFieldArray = Array.isArray(m1[key]);

			if(isFieldArray) {
				const isNewValue = m1[key].indexOf(m2[key][0]) !== -1;
				newMember[key] = isNewValue ? m1[key] : m1[key].concat(m2[key]);
			} else {
				newMember[key] = m1[key];
			}
		}
		return newMember;
	},
	filterNulls: (chain) => {
		return chain.map((member) => {
			for(key in member) {
				if(Array.isArray(member[key])) {
					member[key] = member[key].filter((val) => val !== null)
				}
			}
			return member;
		});
	},
	chainMember: (member) => {
		let relative_physical_stat_desc = null;
		if (member.relative_physical_stats === -1) {
			relative_physical_stat_desc = "Attack < Defense";
		} else if (relative_physical_stat_desc === 0 ){
			relative_physical_stat_desc = "Attack = Defense";
		} else if (member.relative_physical_stats === 1) {
			relative_physical_stat_desc = "Attack > Defense";
		} 

		return {
			id: parseInt(member.pkid),
			name: member.name,
			predecessorId: member.predecessorid,
			chainId: parseInt(member.chainid), 
			minimumLevel: [member.minimum_level],
			triggerMethod: [member.trigger_method],
			triggerItem: [member.trigger_item],
			heldItem: [member.held_item],
			minimumHappiness: [member.minimum_happiness],
			minimumBeauty: [member.minimum_beauty],
			minimumAffection: [member.minimum_affection],
			genderId: [member.gender_id],
			gender: [member.gender],
			locationName: [member.location_name],
			timeOfDay: [member.time_of_day],
			knownMoveId: [member.known_move_id],
			knownMove: [member.known_move],
			knownMoveTypeId: [member.known_move_type_id],
			knownMoveType: [member.known_move_type],
			relativePhysicalStats: [relative_physical_stat_desc],
			partySpeciesId: [member.party_species_id],
			partySpeciesName: [member.party_species_name],
			partyTypeId: [member.party_type_id],
			partyTypeName: [member.party_type_name],
			tradeSpeciesId: [member.trade_species_id],
			tradeSpeciesName: [member.trade_species_name],
			needsOverworldRain: [member.needs_overworld_rain === "0" ? false : true],
			turnUpsideDown: [member.turn_upside_down === "0" ? false : true],
		}			
	}
}

const Model = {
	id: (id) => {		
		const evoChainQuery = squel.select()
			.from(tables.species)
			.field(`${tables.species}.evolution_chain_id`)
			.where(`${tables.species}.id = ${id}`)
		
		return query(evoChainQuery)
			.then((targetSpecies) => {
				const evoChainId = targetSpecies['evolution_chain_id'];
				return query(queryHelper.chainDataQuery(evoChainId))
					.then((chain) => format.chain(chain))
					.catch((err) => { return err; })
			})
			.catch((err) => { return err; });
	}
};

module.exports = Model;
