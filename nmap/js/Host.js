export class Host_r {
	/** @arg {unknown} ip @arg {unknown} dns_name */
	constructor(ip, dns_name) {
		this.ip = ip;
		this.dns_name = dns_name;
	}
}
/** @arg {[string, string]} v */
export function Host(...v) {
	return new Host_r(...v);
}
