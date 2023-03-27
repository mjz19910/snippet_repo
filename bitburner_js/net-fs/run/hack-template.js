import {generic_get_call,getServerMaxMoney_,getServerMinSecurityLevel_,getServerMoneyAvailable_,getServerSecurityLevel_} from "/run/hack-support.js";

/**
 * @param {HackState} s
 */
export async function run_hack(s) {
	const {ns,thread_count,target}=s;
	if(!target) throw new Error("Bad args");
	const max_money=await getServerMaxMoney_(ns,target);
	if(max_money===0) return;
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
		if(s.first) {
			debugger;
			ns.writePort(10,s.hostname+"->weaken:"+target);
			s.first=false;
		}
		await ns.weaken(target);
	} else if(server_money<moneyThreshold) {
		if(s.first) {
			debugger;
			ns.writePort(10,s.hostname+"->grow:"+target);
			s.first=false;
		}
		await ns.grow(target);
	} else {
		if(s.first) {
			debugger;
			ns.writePort(10,s.hostname+"->hack:"+target);
			s.first=false;
		}
		await ns.hack(target);
	}
	if(thread_count>512) {
		let security_level=await getServerSecurityLevel_(ns,target);
		while(security_level>securityThreshold) {
			await ns.weaken(target);
			security_level=await getServerSecurityLevel_(ns,target);
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
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
		ns.tprintf("[%s] target: %s",s.hostname,s.target);
		await run_hack(s);
	}
}
/** @typedef {{first:boolean;ns:NS;thread_count:number;hostname:string;target:string|null}} HackState */