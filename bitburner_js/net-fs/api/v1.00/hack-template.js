import {as_any} from "/api/v1.00/as.js";
import {HackState,generic_get_call_with_id,getServerMaxMoney_,getServerMinSecurityLevel_,getServerMoneyAvailable_,getServerSecurityLevel_} from "/api/v1.00/hack-support.js";


/** @param {HackState} s @param {string} a1 */
export function write_log_message(s,a1) {
	s.ns.writePort(3,s.hostname+"->"+a1+":"+s.target);
}
/**
 * @param {HackState} this_
 */
export async function run_hack(this_) {
	if(!this_.target) throw new Error("Bad args");
	const max_money=await getServerMaxMoney_(this_);
	if(max_money===0) return;
	// Defines how much money a server should have before we hack it
	const moneyThreshold=(await getServerMaxMoney_(this_))*0.85;
	this_.ns.print("moneyThreshold: $",this_.ns.formatNumber(moneyThreshold));
	// Defines the maximum security level the target server can have.
	const securityThreshold=(await getServerMinSecurityLevel_(this_))+1;
	this_.ns.print("securityThreshold: ",this_.ns.formatNumber(securityThreshold));
	const security_level=await getServerSecurityLevel_(this_);
	const server_money=await getServerMoneyAvailable_(this_);
	this_.ns.print("securityLevel: ",this_.ns.formatNumber(security_level));
	this_.ns.print("moneyAvailable: $",this_.ns.formatNumber(server_money));
	if(security_level>securityThreshold) {
		write_log_message(this_,"weaken");
		await this_.ns.weaken(this_.target);
	} else if(server_money<moneyThreshold) {
		write_log_message(this_,"grow");
		await this_.ns.grow(this_.target);
	} else {
		write_log_message(this_,"hack");
		await this_.ns.hack(this_.target);
	}
	if(this_.thread_count>512) {
		let j=0;
		let security_level=await getServerSecurityLevel_(this_);
		while(security_level>securityThreshold) {
			if(j===0) write_log_message(this_,"weaken");
			await this_.ns.weaken(this_.target);
			security_level=await getServerSecurityLevel_(this_);
			j++;
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	let disable_log_action=false;
	if(disable_log_action) {
		ns.disableLog("weaken");
		ns.disableLog("grow");
		ns.disableLog("hack");
	}
	/** @type {{_:[thread_count:number,hostname:string]}} */
	let pa=as_any(ns.flags([]));
	/** @type {HackState} */
	const s=new HackState(ns,pa);
	await hack_forever(s);
}
/** @arg {HackState} s */
async function hack_forever(s) {
	for(;;) {
		await s.ns.sleep(0);
		const srv=await generic_get_call_with_id(s,Math.random()+"","get_hack_target"); ``;
		s.target=srv.hostname;
		s.ns.printf("[%s] target: %s",s.hostname,s.target);
		await run_hack(s);
	}
}