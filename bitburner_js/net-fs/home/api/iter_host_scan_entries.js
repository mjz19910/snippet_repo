import {do_disable} from "/api/do_disable.js";
/** @typedef {[[]|[string,number]|[string],[number,"GB"],string][]} ServerMapArray */
/**
 * @param {NS} ns
 * @param {number} depth @arg {Map<string,string[]>} map
 * @param {{log_file:string;server_set:Set<string>;server_map_arr:ServerMapArray;trace:boolean}} opts
 * */
export function iter_host_scan_entries(ns,opts,depth,map) {
	const {server_set,server_map_arr}=opts;
	let depth_list=[];
	const clone=new Map(map);
	for(let [key,val] of clone.entries()) {
		for(let [idx,srv] of val.entries()) {
			if(server_set.has(srv)) continue;
			server_set.add(srv);
			server_map_arr.push([[key,idx],[ns.getServerMaxRam(srv),"GB"],srv]);
			let scan_res=ns.scan(srv);
			let home_idx=scan_res.indexOf("home");
			if(home_idx>-1) scan_res.splice(home_idx,1);
			scan_res=scan_res.filter(v => !server_set.has(v));
			x: if(opts.trace) {
				if(scan_res.length===0) break x;
				depth_list.push([depth," ",srv," ",scan_res]);
			}
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
	ns.write(opts.log_file,file_data.join(""),"a");
}

/** @param {NS} ns @arg {string[]} arr_disabled */
export function disable_log_use(ns,arr_disabled) {
	do_disable(ns,arr_disabled,"scan");
	do_disable(ns,arr_disabled,"getServerMaxRam");
}