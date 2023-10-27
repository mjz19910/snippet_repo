import util from "util";

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
	/** @arg {unknown} _ @arg {unknown} options @arg {(object: string, options: unknown) => unknown} inspect */
	[util.inspect.custom](_, options, inspect) {
		return `${options.stylize('IP', 'special')}[${inspect(this.addr.join(".") + ".", options)}]`;
	}
}
