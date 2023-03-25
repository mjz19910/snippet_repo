/** @typedef {{servers:string[];txts: string[];scripts:string[];flags:NS["flags"]}} AutoCompleteData */
/** @arg {AutoCompleteData} data @arg {(string | number | boolean)[]} args */
export function autocomplete(data, args) {
	/** @type {{target:string[];_:string[]}} */
	let flags_ = data.flags([
		["target", null],
	]);
	if (flags_.target === null) return [];
	if (args[0] === "--target") return [...data.servers];
	return [];
}
/** @param {NS} ns */
export function get_hack_target(ns) {
	/** @type {{target:string}} */
	const flags_ = ns.flags([
		["target", "n00dles"],
	]);

	return flags_.target;
}

/** @param {NS} ns */
export async function main(ns) {
	// Defines the "target server", which is the server
	// that we're going to hack.
	const target = get_hack_target(ns);


	// Defines how much money a server should have before we hack it
	// In this case, it is set to 75% of the server's max money
	const moneyThresh = ns.getServerMaxMoney(target) * 0.85;

	// Defines the maximum security level the target server can
	// have. If the target's security level is higher than this,
	// we'll weaken it before doing anything else
	const securityThresh = ns.getServerMinSecurityLevel(target) + 2.5;

	// Infinite loop that continously hacks/grows/weakens the target server
	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			// If the server's security level is above our threshold, weaken it
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			// If the server's money is less than our threshold, grow it
			await ns.grow(target);
		} else {
			// Otherwise, hack it
			await ns.hack(target);
		}
	}
}