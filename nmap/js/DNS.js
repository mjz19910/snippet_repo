import util from "util";
export class BaseDNS {
	/**
	 * @param {string} dns_name
	 */
	constructor(dns_name) {
		this.parts = dns_name.split(".").slice(0, -1);
	}
	/**
	 * @param {any} _
	 * @param {any} options
	 * @param {(arg0: string, arg1: any) => any} inspect
	 */
	[util.inspect.custom](_, options, inspect) {
		return `${options.stylize('DNS', 'special')} [${inspect(this.parts.join(".") + ".", options)}]`;
	}
}
export function DNS(/** @type {string} */ e) {
	return new BaseDNS(e);
}
