import {Route} from "./Route.js";

/** @typedef {{target: string;route: string[];new_version?: Route|Readonly<Route>|null;}} RouteDesc @typedef {{readonly target: string;readonly route: readonly string[];readonly new_version?: Readonly<Route>|null;}} RouteDescRo */

export class RouteDescription {
	target="";
	route=[""];
	/**@type {Route|null} */
	new_version=null;
	/** @arg {string} target @arg {string[]} route_list @arg {Route|null} new_version */
	constructor(target,route_list,new_version) {
		this.target=target;
		this.route=route_list;
		this.new_version=new_version;
	}
	/** @arg {RouteDesc|RouteDescRo} value */
	static from(value) {
		let {target,route,new_version}=value;
		if(!new_version) {
			new_version=null;
		};
		return new this(target,route.slice(),new_version);
	}
	/**@arg {Map<string, { target: string; route: string[]; new_version?: Route|null; }>} map */
	static from_map(map) {
		/**@type {Map<string, Route>} */
		let ret=new Map;
		for(let [key,val] of map) {
			ret.set(key,new Route(this.from(val)));
		}
		return ret;
	}
}
