import {open, readFile} from "fs/promises";
import {log_fancy_inspect} from "./log_fancy_inspect.js";
import {str_to_ip} from "./str_to_ip.js";
/**
 * @returns {Promise<[string, string[]][]>}
 * @arg {string} filename
 */
async function load_route_from_file(filename) {
	let buf = await readFile(filename, {"encoding": "utf8"});
	let s1 = buf.toString().split("--- ROUTE TO ---").slice(1);
	return s1.map(e => {
		let trimmed = e.trim();
		let g = trimmed.split("---").map(e => {
			let trimmed = e.trim();
			return trimmed;
		});
		return [g[0], g[1].split("\n")];
	});
}
/**
 * @arg {[string, string[]][]} traceroute_results
 */
function log_if_traceroute_mismatch(traceroute_results) {
	traceroute_results.map(e => {
		e = [...e];
		let last = e[1].at(-1);
		if(last && last != e[0]) {
			log_fancy_inspect(e);
		}
		return e;
	});
}
/**@arg {[string, ...any[]][]} array */
function sort_by_ip_key(array) {
	array.sort((a, b) => {
		let a_ip = str_to_ip(a[0]);
		let b_ip = str_to_ip(b[0]);
		for(let i = 0; i < 4; i++) {
			if(a_ip[i] === b_ip[i]) continue;
			if(a_ip[i] !== b_ip[i]) return a_ip[i] - b_ip[i];
		}
		return 0;
	});
}
export class RouteReader {
	/**
	 * @arg {string} filename
	 */
	async read_file(filename) {
		let res = await load_route_from_file(filename);
		log_if_traceroute_mismatch(res);
		let mod = await import("./tree.js");
		/**@type {Map<string, [string, string[]]>} */
		let route_map = new Map;
		if(!mod.route_map){
			throw new Error("Bad");
		}
		for(let x of mod.route_map) {
			let desc = x[1].m_route_description;
			route_map.set(desc.target, [desc.target, desc.route]);
		}
		for(let x of res) {
			route_map.set(x[0], x);
		}
		res = [...route_map.values()];
		sort_by_ip_key(res);
		let fc = await open("report.d/route/tree.js", "w");
		await fc.write(`import {Route} from "./Route.js";\n`);
		await Promise.all(res.map(e => this.format_route_const_export(fc, e)));
		await fc.write(`export const tree_contents = [\n\t${res.map(e => `r_${e[0].replaceAll(".", "_")}`).join(",\n\t")}\n];\n`);
		await fc.close();
	}
	/**
	 * @arg {import("fs/promises").FileHandle} out
	 * @arg {[string, string[]]} item
	 * */
	format_route_const_export(out, item) {
		/**@type {[string, string[]]}*/
		let [target, route] = item;
		return out.write(`
export const r_${target.replaceAll(".", "_")} = new Route({
	target: "${target}",
	route: [\n\t\t${route.map(e => `"${e}",\n`).join("\t\t")}\t]
}, true);\n`);
	}
}