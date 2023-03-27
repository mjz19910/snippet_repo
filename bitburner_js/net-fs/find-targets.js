import {as,canHack,getNetworkNodes,get_keys_of} from "/utils.js";

/** @param {NS} ns */
export async function main(ns) {
	/** @type {{compareField:"maxMoney"|"hackChance"}} */
	let f_=as(ns.flags([
		["compareField","maxMoney"],
	]));
	var compareField=f_.compareField;
	var player=ns.getPlayer();
	var filename="network-report.txt";

	/** @param {string} node @returns {NodeInfoType} */
	function getNodeInfo(node) {
		var server=ns.getServer(node);
		var maxMoney=server.moneyMax;
		var chance=ns.formulas.hacking.hackChance(server,player);
		var reqHackLevel=server.requiredHackingSkill;
		return {
			node,
			maxMoney,
			hackChance: chance,
			reqHackLevel,
		};
	}

	/** @param {NodeInfoType[]} nodes */
	async function writeNodesToFile(nodes) {
		let lines=[];
		for(let node of nodes) {
			const s_node={
				...node,
				maxMoney: ns.formatNumber(node.maxMoney),
			};
			for(var field of get_keys_of(s_node)) {
				var value=s_node[field];
				lines.push(field+": "+value);
			}
			lines.push("");
		}
		var fileContent=lines.join("\n");
		ns.write(filename,fileContent,"w");
		ns.alert(fileContent);
		ns.toast("Wrote targets to "+filename,"info");
	}

	/** @returns {(a:NodeInfoType,b:NodeInfoType)} */
	function getComparator() {
		return (a,b) => {
			if(a[compareField]>b[compareField]) {
				return -1;
			} else if(a[compareField]<b[compareField]) {
				return 1;
			} else {
				return 0;
			}
		};
	}

	var networkNodes=getNetworkNodes(ns);
	var hackableNodes=networkNodes.filter(node => canHack(ns,node)&&!node.includes("big-"));
	var nodeDetails=hackableNodes.map(node => getNodeInfo(node));
	var nodeAsc=nodeDetails.sort(getComparator());
	writeNodesToFile(nodeAsc);
}

/** @typedef {{node:string;maxMoney:number;hackChance:number;reqHackLevel:number}} NodeInfoType */
