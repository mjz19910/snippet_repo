import {generic_get_call,getServerMaxMoney_,getServerMinSecurityLevel_,getServerMoneyAvailable_,getServerSecurityLevel_} from "/run/hack-support.js";


/**
 * @param {HackState} s
 * @param {string} a1
 * @param {string} a2
 * @param {string} a3
 */
function write_log_message(s,a1,a2,a3) {
	s.ns.writePort(3,a1+"->"+a2+":"+a3);
}
/**
 * @param {HackState} s
 * @param {number} i
 */
export async function run_hack(s,i) {
	const {ns,thread_count,target}=s;
	if(!target) throw new Error("Bad args");
	const max_money=await getServerMaxMoney_(ns,target);
	if(max_money===0) return;
	// Defines how much money a server should have before we hack it
	const moneyThreshold=(await getServerMaxMoney_(ns,target))*0.85;
	ns.print("moneyThreshold: $",ns.formatNumber(moneyThreshold));
	// Defines the maximum security level the target server can have.
	const securityThreshold=(await getServerMinSecurityLevel_(ns,target))+2.5;
	ns.print("securityThreshold: ",ns.formatNumber(securityThreshold));
	const security_level=await getServerSecurityLevel_(ns,target);
	const server_money=await getServerMoneyAvailable_(ns,target);
	ns.print("securityLevel: ",ns.formatNumber(security_level));
	ns.print("moneyAvailable: $",ns.formatNumber(server_money));
	if(security_level>securityThreshold) {
		if(i===0) write_log_message(s,s.hostname,"weaken",target);
		await ns.weaken(target);
	} else if(server_money<moneyThreshold) {
		if(i===0) write_log_message(s,s.hostname,"grow",target);
		await ns.grow(target);
	} else {
		if(i===0) write_log_message(s,s.hostname,"hack",target);
		await ns.hack(target);
	}
	if(i===0&&thread_count>512) {
		let j=0;
		let security_level=await getServerSecurityLevel_(ns,target);
		while(security_level>securityThreshold) {
			if(i===0&&j===0) write_log_message(s,s.hostname,"weaken",target);
			await ns.weaken(target);
			security_level=await getServerSecurityLevel_(ns,target);
			j++;
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("weaken");
	ns.disableLog("sleep");
	ns.disableLog("grow");
	ns.disableLog("hack");
	/** @type {any} */
	let pa=ns.flags([]);
	/** @type {{_:[thread_count:number,hostname:string]}} */
	let f_=pa;
	const [thread_count,hostname]=f_._;
	/** @type {HackState} */
	const s={
		ns,thread_count,hostname,
		first: true,
		target: null,
	};
	for(;;) {
		const srv=await generic_get_call(ns,Math.random()+"","get_hack_target");
		s.target=srv.hostname;
		ns.printf("[%s] target: %s",s.hostname,s.target);
		for(let i=0;i<8;i++) {
			await run_hack(s,i);
		}
	}
}

/** @typedef {{first:boolean;ns:NS;thread_count:number;hostname:string;target:string|null}} HackState */
