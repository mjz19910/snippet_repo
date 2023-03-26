import {do_disable} from "/api/do_disable.js";

/** @param {NS} ns @arg {string} src_host @arg {boolean} trace */
export function start_host_scan(ns,src_host,trace) {
	const scan_log_file="/data/host_scan.list.txt";
	ns.clear(scan_log_file);

	/** @type {Map<string, string[]>} */
	let map=new Map;
	/** @type {Set<string>} */
	let seen_set=new Set;
	const hostname_list=[src_host];
	map.set(src_host,ns.scan(src_host));
	/** @type {HostScanOpts} */
	const scan_opts={src_host,trace,seen_set,hostname_list};
	let scan_results=["------\n","\n"];
	let depth=0;
	for(;;) {
		depth++;
		const result=iter_host_scan_entries(ns,scan_opts,depth,map);
		scan_results.push(result);
		if(map.size===0) break;
	}
	ns.write(scan_log_file,scan_results.join(""),"w");
	return hostname_list;
}
/**
 * @param {NS} ns
 * @param {number} depth @arg {Map<string,string[]>} map
 * @param {HostScanOpts} opts
 * */
export function iter_host_scan_entries(ns,opts,depth,map) {
	const {seen_set,hostname_list}=opts;
	let depth_list=[];
	const clone=new Map(map);
	for(let [key,val] of clone.entries()) {
		for(let srv of val) {
			if(seen_set.has(srv)) continue;
			seen_set.add(srv);
			hostname_list.push(srv);
			let scan_res=ns.scan(srv);
			let home_idx=scan_res.indexOf(opts.src_host);
			if(home_idx>-1) scan_res.splice(home_idx,1);
			scan_res=scan_res.filter(v => !seen_set.has(v));
			depth_list.push([depth," ",srv," ",scan_res]);
			map.set(srv,scan_res);
		}
		map.delete(key);
	}
	/** @type {string[]} */
	let file_data=[];
	/** @arg {string} str */
	function append(str) {
		file_data.push(str);
	}
	for(let depth_item of depth_list) {
		for(let part of depth_item) {
			if(part instanceof Array) {
				append("[");
				for(let v of part.slice(0,-1)) {
					append(v+",");
				}
				append(part[part.length-1]);
				append("]");
				continue;
			}
			append(""+part);
		}
		append("\n");
	}
	append("\n");
	return file_data.join("");
}

/** @param {NS} ns @arg {string[]} arr_disabled */
export function disable_log_use(ns,arr_disabled) {
	do_disable(ns,arr_disabled,"scan");
	do_disable(ns,arr_disabled,"getServerMaxRam");
}

/** @typedef {{src_host:string;seen_set:Set<string>;hostname_list:string[];trace:boolean}} HostScanOpts */
