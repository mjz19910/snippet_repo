import * as http from "http";
import * as https from "https";

/** @typedef {{is_https: true;value: typeof https;}} HttpsOnly @typedef {{is_https: false;value: typeof http;}} HttpOnly */
export class RequestModule {
	/**@type {false} */
	is_https=false;
	get=http.get.bind(http);
	/** @arg {HttpsOnly|HttpOnly} update_imp */
	init(update_imp) {
		this.get=update_imp.value.get.bind(update_imp);
	}
	constructor() {
		this.init({
			is_https: false,
			value: http,
		});
	}
}
