/** @param {NS} ns */
export async function main(ns) {
	const player_hacking_skill=ns.getHackingLevel();
	const hack_script="hack-template-v3.js";
	const scripts=["hack-support-v3.js",hack_script];
	let scan_res=ns.scan("home");
	const target_host=scan_res[0];
	ns.scp(scripts,target_host,"home");
	ns.killall(target_host);
	ns.exec(hack_script,target_host,1,player_hacking_skill,"none");
}
