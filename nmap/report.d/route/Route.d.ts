import {RouteDescription} from "./RouteDescription.ts";

export class Route {
	m_route_description: RouteDescription;
	constructor(route_description: RouteDescription, is_raw?: boolean): Route;
}
