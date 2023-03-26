/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");
	ns.clearLog();
	ns.tail();

	function myMoney() {
		return ns.getServerMoneyAvailable("home");
	}
	myMoney;

	let hacknet_entries=get_hacknet_node_entries(ns);
	while(hacknet_entries.length<9) {
		let node_id=ns.hacknet.purchaseNode();
		if(node_id!==-1) {
			let node_info=ns.hacknet.getNodeStats(node_id);
			hacknet_entries.push([node_id,node_info]);
			ns.print("new node",node_id);
		}
		await ns.sleep(1000);
	}
	let nodes_not=hacknet_entries.filter(v => (v[1].level%10)!==0);
	nodes_not.forEach(([idx,node]) => {
		const {level}=node;
		const offset=10-level%10;
		let upgraded=ns.hacknet.upgradeLevel(idx,offset);
		if(upgraded) node.level+=offset;
	});
	if(nodes_not.length>0) {
		ns.print("not: ",nodes_not[0][1].name);
	}
	/** @arg {NodeStats} a @arg {NodeStats} b */
	function cmp_node(a,b) {
		if(a.level===b.level) {
			return a.cores<b.cores;
		}
		if(a.cores===b.cores) {
			if(a.ram===b.ram) return a.level<b.level;
			return a.ram<b.ram;
		}
		if(a.ram===b.ram) return a.level<b.level;
		return a.level<b.level;
	}
	let min_node_entry=hacknet_entries.reduce((v,u) => cmp_node(u[1],v[1])? u:v);
	let continue_flag=true,did_upgrade=false;
	while(continue_flag) {
		min_node_entry=hacknet_entries.reduce((v,u) => cmp_node(u[1],v[1])? u:v);
		continue_flag=false;
		let upgrade_cost=null,upgrade_type=null;
		hacknet_entries.forEach(v => {
			let res=upgrade_node_level_entry(ns,...v);
			if(res[0]) {
				upgrade_type="level";
				did_upgrade=true;
				continue_flag=res[0];
				upgrade_cost=res[1];
			}
		});
		hacknet_entries.forEach(v => {
			let res=upgrade_node_ram(ns,...v);
			if(res[0]) {
				upgrade_type="ram";
				did_upgrade=true;
				continue_flag=res[0];
				upgrade_cost=res[1];
			}
		});
		hacknet_entries.forEach(v => {
			let res=upgrade_node_cores(ns,...v);
			if(res[0]) {
				upgrade_type="core";
				did_upgrade=true;
				continue_flag=res[0];
				upgrade_cost=res[1];
			}
		});
		if(upgrade_cost!==null) ns.printf("min: %s %s",min_node_entry[1].name,upgrade_type);
		await ns.sleep(1000);
	}
	if(did_upgrade) {
		ns.print("done: ",ns.hacknet.getNodeStats(min_node_entry[0]));
	} else {
		ns.print("Hacknet Nodes already upgraded");
	}
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[false,null]|[true,number]}
 */
function upgrade_node_cores(ns,idx,node) {
	if(node.cores>=16) return [false,null];
	let cores_n=16-node.cores;
	while(cores_n>0) {
		let res=ns.hacknet.upgradeCore(idx,cores_n);
		if(res) {
			node.cores+=cores_n;
			break;
		}
		cores_n--;
	}
	let cost=ns.hacknet.getCoreUpgradeCost(idx,1);
	return [true,cost];
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[false,null]|[true,number]}
 */
function upgrade_node_ram(ns,idx,node) {
	if(node.ram>=64) return [false,null];
	let ram_n=8-Math.log2(node.ram);
	while(ram_n>0) {
		let res=ns.hacknet.upgradeRam(idx,ram_n);
		if(res) {
			let cnt=ram_n;
			for(let i=0;i<cnt;i++) {
				node.ram*=2;
			}
			break;
		}
		ram_n--;
	}
	let cost=ns.hacknet.getRamUpgradeCost(idx,1);
	return [true,cost];
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[false,null]|[true,number]}
 */
function upgrade_node_level_entry(ns,idx,node) {
	if(node.level>=200) return [false,null];
	let level_n=200-node.level;
	while(level_n>0) {
		let res=ns.hacknet.upgradeLevel(idx,level_n);
		if(res) {
			node.level+=level_n;
			break;
		}
		level_n-=10;
	}
	let cost=ns.hacknet.getLevelUpgradeCost(idx,10);
	return [true,cost];
}
/** @param {NS} ns */
function get_hacknet_node_entries(ns) {
	/** @type {[number,NodeStats][]} */
	let node_list=[];
	let i=0,len=ns.hacknet.numNodes();
	while(i<len) {
		let node_info=ns.hacknet.getNodeStats(i);
		node_list.push([i,node_info]);
		++i;
	}
	return node_list;
}
