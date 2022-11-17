import * as http from "http";
import * as https from "https";
/**
 * @typedef {{is_https: true;value: typeof https;}} HttpsOnly
 * @typedef {{is_https: false;value: typeof http;}} HttpOnly
 */
export class RequestModule {
	/**@type {false} */
	is_https=false;
	/**@type {HttpOnly|HttpsOnly} */
	http_import={
		is_https: false,
		value: http,
	};
	/**
	 * @arg {string | http.RequestOptions | URL} options
	 * @arg {(res: http.IncomingMessage) => void} [callback]
	 */
	get(options,callback) {
		if(this.http_import.is_https) {
			return http.get(options,callback);
		}
	}
}
