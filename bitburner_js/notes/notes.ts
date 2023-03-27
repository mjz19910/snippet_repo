const map_template={
	corner_o_00: {street_address: null},
	corner_x_00: {street_address: null},
	intersection00: {street_address: null},
};

function main_2() {
	type MapType={
		[x: string]: {street_address: string|number|null;};
	};
	// Volhaven
	const volhaven_map={
		intersection04: {street_address: 4},
		corner_x_05: {street_address: 5},
		corner_x_06: {street_address: 6},
		intersection07: {street_address: 7},
		corner_o_09: {street_address: 9},
		corner_o_17: {street_address: 17},
		corner_o_19: {street_address: 19},
		intersection20: {street_address: 20},
		corner_x_21: {street_address: 21},
		corner_x_22: {street_address: 22},
		corner_x_23: {street_address: 23},
		corner_x_24: {street_address: 24},
		intersection25: {street_address: 25},
		corner_x_26: {street_address: 26},
		corner_o_28: {street_address: 28},
		corner_o_57: {street_address: 57},
		corner_o_59: {street_address: 59},
		corner_x_61: {street_address: 61},
		intersection62: {street_address: 62},
		intersection64: {street_address: 64},
		corner_o_65: {street_address: 65},
		corner_o_66: {street_address: 66},
		corner_o_68: {street_address: 68},
		corner_o_69: {street_address: 69},
		intersection70: {street_address: 70},
		corner_o_72: {street_address: 72},
		intersection73: {street_address: 73},
		corner_o_75: {street_address: 75},
		corner_o_76: {street_address: 76},
		corner_o_77: {street_address: 77},
		travel_agency: {street_address: 2},
		world_stock_exchange: {street_address: 8},
		syscore_sec: {street_address: 18},
		millenium_fitness_gym: {street_address: 27},
		lexocorp: {street_address: 58},
		nwo: {street_address: 60},
		hospital: {street_address: 63},
		omnia_cybersystems: {street_address: 67},
		omnitek_inc: {street_address: 71},
		helios_labs: {street_address: 74},
		computek: {street_address: 78},
		zb: {street_address: 79},
		the_slums: {street_address: null},
	} as const satisfies MapType;
	let log_map=true;
	/** @type {typeof volhaven_map} */
	let vol_map_from_ent=Object.fromEntries(Object.entries(volhaven_map).filter(v => {
		if(v[0].startsWith("intersection")) return false;
		if(v[0].startsWith("corner")) return false;
		return true;
	}));
	if(log_map) console.log(vol_map_from_ent);
}
main_2();
