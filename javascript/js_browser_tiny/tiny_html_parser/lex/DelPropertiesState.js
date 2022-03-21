export class DelPropertiesState {
	/**@type {Map<any, [string, TypedPropertyDescriptor<any> & PropertyDescriptor][]>}*/
	remove_map = new Map;
	/**@type {any[]}*/
	new_cache = [];
	/**@type {any[]}*/
	new_del = [];
	/**
	 * @type {any}
	 */
	cur;
	/**
	 * @type {any}
	 */
	ctx_req;
}
