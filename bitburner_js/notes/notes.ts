function main_2() {
	type MapType={
		[x: string]: {street_address: number|null;};
	};
	// Volhaven
	const volhaven_map={
		travel_agency: {street_address: 2},
		intersection04: {street_address: 4},
		corner05: {street_address: 5},
		corner06: {street_address: 6},
		intersection07: {street_address: 7},
		world_stock_exchange: {street_address: 8},
		corner09: {street_address: 9},
		corner17: {street_address: 17},
		syscore_sec: {street_address: 18},
		corner28: {street_address: 28},
		corner57: {street_address: 57},
		lexocorp: {street_address: 58},
		zb: {street_address: 58},
		computek: {street_address: 58},
		nwo: {street_address: 58},
		corner61: {street_address: 61},
		intersection62: {street_address: 62},
		hospital: {street_address: 63},
		intersection64: {street_address: 64},
		corner65: {street_address: 65},
		corner66: {street_address: 66},
		omnia_cybersystems: {street_address: 67},
		corner68: {street_address: 68},
		corner69: {street_address: 69},
		intersection70: {street_address: 70},
		omnitek_inc: {street_address: 71},
		corner72: {street_address: 72},
		intersection73: {street_address: 73},
		helios_labs: {street_address: 74},
		corner75: {street_address: 75},
		corner76: {street_address: 76},
		corner77: {street_address: 77},
		the_slums: {street_address: null}
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
