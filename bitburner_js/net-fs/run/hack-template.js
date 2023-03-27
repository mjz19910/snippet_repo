import {generic_get_call,getServerMaxMoney_,getServerMinSecurityLevel_,getServerMoneyAvailable_,getServerSecurityLevel_} from "/run/hack-support.js";

/** @param {NS} ns @param {string} target */
export async function run_hack(ns,target) {
	// Defines how much money a server should have before we hack it
	const moneyThreshold=(await getServerMaxMoney_(ns,target))*0.85;
	ns.print("moneyThreshold: $",ns.formatNumber(moneyThreshold));
	// Defines the maximum security level the target server can have.
	const securityThreshold=(await getServerMinSecurityLevel_(ns,target))+2.5;
	ns.print("securityThreshold: ",securityThreshold);
	const security_level=await getServerSecurityLevel_(ns,target);
	const server_money=await getServerMoneyAvailable_(ns,target);
	ns.print("securityLevel: ",security_level);
	ns.print("moneyAvailable: $",ns.formatNumber(server_money));
	if(security_level>securityThreshold) {
		await ns.weaken(target);
	} else if(server_money<moneyThreshold) {
		await ns.grow(target);
	} else {
		await ns.hack(target);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	for(;;) {
		const srv=await generic_get_call(ns,Math.random()+"","get_hack_target");
		const target=srv.hostname;
		await run_hack(ns,target);
	}
}
