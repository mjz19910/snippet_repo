export class BaseDNS {
	/** @arg {string} dns_name */
	constructor(dns_name) {
		this.parts = dns_name.split(".").slice(0, -1);
	}
}
export function DNS(/** @type {string} */ e) {
	return new BaseDNS(e);
}
