import util from "util";

export class IP_base {
	/**
	 * @param {string} str
	 */
	static parse(str) {
		return str.split(".").map(e => +e);
	}
	/**@arg {["IP", string]} value*/
	static stringify_raw(value) {
		return `IP("${value[1]}")`;
	}
	/**
	 * @param {string} ip
	 */
	constructor(ip) {
		this.addr = IP_base.parse(ip);
	}
	toString() {
		return this.addr.join(".");
	}
	/**
	 * @param {any} _
	 * @param {any} options
	 * @param {(object: string, options: any) => any} inspect
	 */
	[util.inspect.custom](_, options, inspect) {
		return `${options.stylize('IP', 'special')}[${inspect(this.addr.join(".") + ".", options)}]`;
	}
}
