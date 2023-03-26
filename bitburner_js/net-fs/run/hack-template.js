import {as} from "/run/helper/as.js";
import {getServerMaxMoney_,getServerMinSecurityLevel_,getServerMoneyAvailable_,getServerSecurityLevel_} from "/run/hack-support.js";

/** @param {number} skill_lvl */
function with_ssh(skill_lvl) {
	if(skill_lvl>(100*2)) return "iron-gym";
	if(skill_lvl>(80*2)) return "max-hardware";
	if(skill_lvl>(40*2)) return "harakiri-sushi";
	if(skill_lvl>(30*2)) return "neo-net";
	return without_ssh(skill_lvl);
}
/** @param {number} skill_lvl */
function without_ssh(skill_lvl) {
	if(skill_lvl>10) return "joesguns";
	return "n00dles";
}
/** @param {number} skill_lvl */
function with_ftp(skill_lvl) {
	if(skill_lvl>(468*2)) return "summit-uni";
	if(skill_lvl>(436*2)) return "aevum-police";
	if(skill_lvl>(425*2)) return "catalyst";
	if(skill_lvl>(393*2)) return "rothman-uni";
	if(skill_lvl>(388*2)) return "netlink";
	if(skill_lvl>(300*2)) return "the-hub";
	if(skill_lvl>(215*2)) return "omega-net";
	if(skill_lvl>(150*2)) return "silver-helix";
	return with_ssh(skill_lvl);
}
/**
 * @param {[number,"none"|"with-ssh"|"with-ftp"|"with-http"|"with-smtp"|"with-sql"]} args
 * Returns the "target server",
 * which is the server that we're going to hack.
 * */
export function get_hack_target(args) {
	if(args.length===2&&args[1]==="none") return without_ssh(args[0]);
	if(args.length===2&&args[1]==="with-ssh") return with_ssh(args[0]);
	if(args.length===2&&args[1]==="with-ftp") return with_ftp(args[0]);
	return with_ftp(args[0]);
}

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	const target=get_hack_target(as(ns.args));

	// Defines how much money a server should have before we hack it
	const moneyThreshold=(await getServerMaxMoney_(ns,target))*0.85;
	ns.print("moneyThreshold: $",ns.formatNumber(moneyThreshold));

	// Defines the maximum security level the target server can have.
	const securityThreshold=(await getServerMinSecurityLevel_(ns,target))+2.5;
	ns.print("securityThreshold: ",securityThreshold);

	// Infinite loop that continuously hacks/grows/weakens the target server
	while(true) {
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
}
