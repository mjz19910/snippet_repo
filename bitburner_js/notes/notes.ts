function main_2() {
	type MapType={
		[x: string]: {street_address: number|null;};
	};
	// Volhaven
	const volhaven_map={
		travel_agency: {street_address: 2},
		intersection04: {street_address: 4},
		placeholder05: {street_address: 5},
		placeholder06: {street_address: 6},
		intersection07: {street_address: 7},
		world_stock_exchange: {street_address: 8},
		road_termination09: {street_address: 9},
		road_termination17: {street_address: 17},
		syscore_sec: {street_address: 18},
		lexocorp: {street_address: 58},
		hospital: {street_address: 63},
		omnia_cybersystems: {street_address: 67},
		the_slums: {street_address: null}
	} as const satisfies MapType;
	let log_map=true;
	/** @type {typeof volhaven_map} */
	let vol_map_from_ent=Object.fromEntries(Object.entries(volhaven_map).filter(v => {
		if(v[0].startsWith("intersection")) return false;
		if(v[0].startsWith("placeholder")) return false;
		if(v[0].startsWith("road_termination")) return false;
		return true;
	}));
	if(log_map) console.log(vol_map_from_ent);
}
main_2();
