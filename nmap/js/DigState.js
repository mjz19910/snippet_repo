export class Status {
	/** @readonly*/ static Up = 1;
	/** @readonly*/ static [1] = "Up";
}
export class IP_base {
	/** @arg {string} str */
	static parse(str) {
		return str.split(".").map(e => +e);
	}
	/** @arg {["IP", string]} value */
	static stringify_raw(value) {
		return `IP("${value[1]}")`;
	}
	/** @arg {string} ip */
	constructor(ip) {
		this.addr = IP_base.parse(ip);
	}
	toString() {
		return this.addr.join(".");
	}
}
export class DNS_base {
	/** @arg {string} dns_name */
	constructor(dns_name) {
		this.parts = dns_name.split(".").slice(0, -1);
	}
}
export class DigState {
	/** @type {Parameters<ReturnType<this['nmap_get_result_fn']>>[0][]} */
	m_nmap_results = [];
	/** @arg {[DNS_base, Extract<typeof Status[keyof typeof Status], number>, IP_base, string]} item */
	nmap_result_has_dns(item) {
		this.m_nmap_results.push(item);
	}
	/** @arg {[DNS_base, Extract<typeof Status[keyof typeof Status], number>, IP_base]} item */
	nmap_result_no_dns(item) {
		this.m_nmap_results.push(item);
	}
	/** @arg {"has_dns"|"no_dns"} key */
	nmap_get_result_fn(key) {
		switch(key) {
			case "has_dns": return this.nmap_result_has_dns;
			case "no_dns": return this.nmap_result_no_dns;
		}
	}
	/** @arg {this['m_nmap_results'][0]} item */
	nmap_result(item) {
		this.m_nmap_results.push(item);
	}
	/** @type {[DNS_base, number, string, string, IP_base][]} */
	m_dig_results = [];
	/** @arg {[DNS_base, number, string, string, IP_base]} item */
	dig_result(item) {
		this.m_dig_results.push(item);
	}
}
