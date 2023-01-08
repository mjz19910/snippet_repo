class ServiceResolver<T,U> {
	/** @type {T|null} */
	services: T|null=null;
	/** @type {U|null} */
	params: U|null=null;
	/** @arg {T} services @arg {U} params */
	constructor(services: T,params: U) {
		this.services=services;
		this.params=params;
	}
	/** @arg {T} services */
	add_services(services: T) {
		this.services=services;
	}
	/** @arg {U} params */
	set_params(params: U) {
		this.params=params;
	}
	/** @arg {keyof U} key */
	get_param(key: keyof U) {
		if(!this.params)
			throw new Error("No service params");
		return this.params[key];
	}
	get<V extends keyof T>(key: V) {
		if(!this.services)
			throw new Error("No services");
		return this.services[key];
	}
}
