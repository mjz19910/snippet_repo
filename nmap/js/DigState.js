
export class DigState {
	/** @type {Parameters<ReturnType<this['nmap_get_result_fn']>>[0][]} */
	m_nmap_results = [];
	/** @arg {[DNS_base, Extract<typeof Status[keyof typeof Status], number>, IP_base, string]} item*/
	nmap_result_has_dns(item) {
		this.m_nmap_results.push(item);
	}
	/** @arg {[DNS_base, Extract<typeof Status[keyof typeof Status], number>, IP_base]} item*/
	nmap_result_no_dns(item) {
		this.m_nmap_results.push(item);
	}
	/**@arg {"has_dns"|"no_dns"} key */
	nmap_get_result_fn(key) {
		switch(key) {
			case "has_dns": return this.nmap_result_has_dns;
			case "no_dns": return this.nmap_result_no_dns;
		}
	}
	/**@param {this['m_nmap_results'][0]} item*/
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
