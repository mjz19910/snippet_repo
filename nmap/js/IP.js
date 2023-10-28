import { IP_base } from "./IP_base.js";

/** @arg {string} ip */
export function IP(ip) {
	return IP_base.parse(ip);
}
