import {RouteDescription} from "./RouteDescription.js";

export class Route {
	m_route_description;
	/**
	 * @arg {RouteDescription} route_description
	 * @arg {boolean} [is_raw]
	 */
	constructor(route_description, is_raw) {
		this.m_route_description = route_description;
		if(is_raw){
			return;
		}
		let self_idx=route_description.route.indexOf("100.126.0.17");
		if(self_idx > -1) {
			route_description.route = route_description.route.slice(self_idx + 1);
			route_description.route.unshift("(...[same as route to 100.126.0.17])");
		}
	}
}
