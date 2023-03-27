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
	let delay=100;
	while(continue_flag) {
		min_node_entry=hacknet_entries.reduce((v,u) => cmp_node(u[1],v[1])? u:v);
		continue_flag=false;
		/** @type {number|null} */
		let upgrade_cost=null;
		/** @type {["level"|"ram"|"core",2|3][]} */
		let upgrade_type=[];
		for(let v of hacknet_entries) {
			let res=upgrade_node_level_entry(ns,...v);
			if(res[1]!==null) {
				upgrade_type[0]=["level",res[0]];
				did_upgrade=true;
				continue_flag=true;
				upgrade_cost=res[1];
			}
		};
		for(let v of hacknet_entries) {
			let res=upgrade_node_ram(ns,...v);
			if(res[1]!==null) {
				upgrade_type[0]=["ram",res[0]];
				did_upgrade=true;
				continue_flag=true;
				upgrade_cost=res[1];
			}
		};
		for(let v of hacknet_entries) {
			let res=upgrade_node_cores(ns,...v);
			if(res[1]!==null) {
				upgrade_type[0]=["core",res[0]];
				did_upgrade=true;
				continue_flag=true;
				upgrade_cost=res[1];
			}
		};
		if(upgrade_cost!==null) ns.printf("min: %s %s",min_node_entry[1].name,upgrade_type);
		await ns.sleep(delay);
		let sel_upg=upgrade_type[0];
		if(sel_upg) {
			if(sel_upg[1]===2) {
				delay+=5000;
			} else if(sel_upg[1]===3) {
				if(delay>5000) delay/=4;
				if(delay<4000) delay=4000;
			} else throw new Error("Bad");
		}
	}
	if(did_upgrade) {
		ns.print("done: ",ns.hacknet.getNodeStats(min_node_entry[0]));
	} else {
		ns.print("Hacknet Nodes already upgraded");
	}
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[1,null]|[2,number]|[3,number]}
 */
function upgrade_node_cores(ns,idx,node) {
	if(node.cores>=16) return [1,null];
	let cores_n=16-node.cores;
	let upgraded_cores=false;
	while(cores_n>0) {
		let res=ns.hacknet.upgradeCore(idx,cores_n);
		if(res) {
			upgraded_cores=true;
			node.cores+=cores_n;
			break;
		}
		cores_n--;
	}
	let cost=ns.hacknet.getCoreUpgradeCost(idx,1);
	if(upgraded_cores) {
		return [3,cost];
	}
	return [2,cost];
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[1,null]|[2,number]|[3,number]}
 */
function upgrade_node_ram(ns,idx,node) {
	if(node.ram>=64) return [1,null];
	let upgraded_ram=false;
	let ram_n=8-Math.log2(node.ram);
	while(ram_n>0) {
		let res=ns.hacknet.upgradeRam(idx,ram_n);
		if(res) {
			upgraded_ram=true;
			let cnt=ram_n;
			for(let i=0;i<cnt;i++) {
				node.ram*=2;
			}
			break;
		}
		ram_n--;
	}
	let cost=ns.hacknet.getRamUpgradeCost(idx,1);
	if(upgraded_ram) {
		return [3,cost];
	}
	return [2,cost];
}
/**
 * @param {NS} ns @arg {number} idx @arg {NodeStats} node
 * @returns {[1,null]|[2,number]}
 */
function upgrade_node_level_entry(ns,idx,node) {
	if(node.level>=200) return [1,null];
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
	return [2,cost];
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
