export class Host_r {
	/**
	 * @param {any} ip
	 * @param {any} dns_name
	 */
	constructor(ip, dns_name) {
		this.ip = ip;
		this.dns_name = dns_name;
	}
}
/**
 * @param {[string, string]} v
 */
export function Host(...v) {
	return new Host_r(...v);
}
