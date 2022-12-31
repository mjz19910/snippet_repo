import {Route} from "./Route.js";

interface RouteDesc {
	target: string;
	route: string[];
	new_version?: Route|null;
}

interface RouteDescRo {
	readonly target: string;
	readonly route: readonly string[];
	readonly new_version?: Readonly<Route>|null;
}

export class RouteDescription {
	target="";
	route=[""];
	/** @type {Route|null} */
	new_version: Route|null=null;
	/** @arg {string} target @arg {string[]} route_list @arg {Route|null} new_version */
	constructor(target: string,route_list: string[],new_version: Route|null) {
		this.target=target;
		this.route=route_list;
		this.new_version=new_version;
	}
	/** @arg {RouteDesc|RouteDescRo} value */
	static from(value: RouteDesc|RouteDescRo) {
		let {target,route,new_version}=value;
		if(!new_version) {
			new_version=null;
		};
		return new this(target,route.slice(),new_version);
	}
	/** @arg {Map<string, { target: string; route: string[]; new_version?: Route|null; }>} map */
	static from_map(map: Map<string,{target: string; route: string[]; new_version?: Route|null;}>) {
		/** @type {Map<string, Route>} */
		let ret: Map<string,Route>=new Map;
		for(let [key,val] of map) {
			ret.set(key,new Route(this.from(val)));
		}
		return ret;
	}
}
