import {FakeDOMStringList} from "./mod.js";
import {Badge} from "./std/Badge.js";
/**@implements {URL} */
class FakeURL {
	/**@type {string}*/
	get hash() {throw new Error("NoImpl");}
	/**@type {string}*/
	get host() {throw new Error("NoImpl");}
	/**@type {string}*/
	get hostname() {throw new Error("NoImpl");}
	/**@type {string}*/
	get href() {throw new Error("NoImpl");}
	/**@type {string}*/
	get origin() {throw new Error("NoImpl");}
	/**@type {string}*/
	get password() {throw new Error("NoImpl");}
	/**@type {string}*/
	get pathname() {throw new Error("NoImpl");}
	/**@type {string}*/
	get port() {throw new Error("NoImpl");}
	/**@type {string}*/
	get protocol() {throw new Error("NoImpl");}
	/**@type {string}*/
	get search() {throw new Error("NoImpl");}
	/**@type {URLSearchParams}*/
	get searchParams() {throw new Error("NoImpl");}
	/**@type {string}*/
	get username() {throw new Error("NoImpl");}
	/**@returns {string} */
	toJSON() {throw new Error("NoImpl");}
}

/**@implements {Location}*/
export class FakeLocation {
	/**@type {Badge|null} */
	#dom_impl_badge = null;
	#original_location_str;
	/**@type {URL} */
	#location_url = new FakeURL;
	/**@type {string[]} */
	#m_ancestor_origin_list = [];
	get ancestorOrigins() {
		if(!this.#dom_impl_badge) throw new Error("No badge");
		const dom_list = new FakeDOMStringList(this.#dom_impl_badge);
		dom_list.setBackingArray(this.#dom_impl_badge, this.#m_ancestor_origin_list);
		return dom_list;
	}
	/**
	 * @param {any} value_to_assign_location_to
	 */
	assign(value_to_assign_location_to) {
		void value_to_assign_location_to;
	}
	get hash() {return this.#location_url.hash;}
	set hash(v) {this.#location_url.hash = v;}
	get host() {return this.#location_url.host;}
	set host(v) {this.#location_url.host = v;}
	get hostname() {return this.#location_url.hostname;}
	set hostname(v) {this.#location_url.hostname = v;}
	get href() {return this.#location_url.href;}
	set href(v) {
		if(v.match("https?://")) {
			this.#location_url.href = v;
			return;
		}
		if(v.match(/(?:[\/\w])+\?.+/)) {
			var idx = v.indexOf("?");
			var pn = v.slice(0, idx);
			var s = v.slice(idx, v.length);
			console.log(pn, s);
			return;
		}
		console.log(this.#location_url.search, v);
		this.#location_url.search = v;
	}
	get origin() {return this.#location_url.origin;}
	get pathname() {return this.#location_url.pathname;}
	set pathname(v) {this.#location_url.pathname = v;}
	get port() {return this.#location_url.port;}
	set port(v) {this.#location_url.port = v;}
	get protocol() {return this.#location_url.protocol;}
	set protocol(v) {this.#location_url.protocol = v;}
	reload() {}
	replace() {}
	get search() {return this.#location_url.search;}
	set search(v) {this.#location_url.search = v;}
	constructor() {
		this.#original_location_str = "";
		/**@type {undefined | ((dom_impl_badge:Badge,href:string)=>void)} */
		this.location_setup = function(dom_impl_badge = new Badge, href) {
			this.#dom_impl_badge = dom_impl_badge;
			this.#original_location_str = href;
			this.#location_url = new URL(href);
			void this.#location_url, this.#original_location_str;
			delete this.location_setup;
		};
	}
}
