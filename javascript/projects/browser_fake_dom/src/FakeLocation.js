import {any} from "./any.js";
import {fake} from "./fake.js/index.js";
import {FakeDOMStringList} from "./FakeDOMStringList.js";
import {BaseBadge} from "./BaseBadge.js/index.js";
import {Badge} from "./Badge.ts/index.js";
/**@implements {URL} */
class FakeURL {
	X=new URL("file://");
	/**@type {string}*/
	get hash() {return this.X.hash;}
	set hash(value) {this.X.hash=value;}
	/**@type {string}*/
	get host() {return this.X.host;}
	set host(value) {this.X.host=value;}
	/**@type {string}*/
	get hostname() {return this.X.hostname;}
	set hostname(value) {this.X.hostname=value;}
	/**@type {string}*/
	get href() {return this.X.href;}
	set href(value) {this.X.href=value;}
	/**@type {string}*/
	get origin() {return this.X.origin;}
	set origin(_value) {throw new Error("Attempt to set readonly property");}
	/**@type {string}*/
	get password() {return this.X.password;}
	set password(value) {this.X.password=value;}
	/**@type {string}*/
	get pathname() {return this.X.pathname;}
	set pathname(value) {this.X.pathname=value;}
	/**@type {string}*/
	get port() {return this.X.port;}
	set port(value) {this.X.port=value;}
	/**@type {string}*/
	get protocol() {return this.X.protocol;}
	set protocol(value) {this.X.protocol=value;}
	/**@type {string}*/
	get search() {return this.X.search;}
	set search(value) {this.X.search=value;}
	/**@type {URLSearchParams}*/
	get searchParams() {return this.X.searchParams;}
	set searchParams(_value) {throw new Error("Attempt to set readonly value");}
	/**@type {string}*/
	get username() {return this.X.username;}
	set username(value) {this.X.username=value;}
	/**@returns {string} */
	toJSON() {throw new Error("NoImpl");}
}

/**@implements {Location}*/
export class FakeLocation {
	/**@type {Location} */
	X=any({});
	/**@type {Badge|null} */
	#dom_impl_badge=null;
	#original_location_str;
	/**@type {URL} */
	#location_url=new FakeURL;
	/**@type {string[]} */
	#m_ancestor_origin_list=[];
	get ancestorOrigins() {
		if(!this.#dom_impl_badge) throw new Error("No badge");
		const dom_list=new FakeDOMStringList(this.#dom_impl_badge);
		dom_list.setBackingArray(this.#dom_impl_badge,this.#m_ancestor_origin_list);
		return dom_list;
	}
	/**
	 * @param {string|URL} value
	 */
	assign(value) {
		if(typeof value==='string') {
			this.#location_url.href=value;
		} else {
			this.#location_url.href=value.href;
		}
	}
	get hash() {
		return this.#location_url.hash;
	}
	set hash(v) {
		this.#location_url.hash=v;
	}
	get host() {
		return this.#location_url.host;
	}
	set host(v) {
		this.#location_url.host=v;
	}
	get hostname() {
		return this.#location_url.hostname;
	}
	set hostname(v) {
		this.#location_url.hostname=v;
	}
	get href() {
		return this.#location_url.href;
	}
	set href(value) {
		if(value.match("https?://")) {
			this.#location_url.href=value;
			return;
		}
		if(value.match(/(?:[\/\w])+\?.+/)) {
			var idx=value.indexOf("?");
			var pn=value.slice(0,idx);
			var s=value.slice(idx,value.length);
			console.log(pn,s);
			return;
		}
		console.log("%o",value);
		this.#location_url.href=value;
	}
	get origin() {return this.#location_url.origin;}
	get pathname() {return this.#location_url.pathname;}
	set pathname(v) {this.#location_url.pathname=v;}
	get port() {return this.#location_url.port;}
	set port(v) {this.#location_url.port=v;}
	get protocol() {return this.#location_url.protocol;}
	set protocol(v) {this.#location_url.protocol=v;}
	reload() {}
	replace() {}
	get search() {return this.#location_url.search;}
	set search(v) {this.#location_url.search=v;}
	/**
	 * @param {FakeLocation | string} [location_url]
	 * @arg {BaseBadge} [dom_badge]
	 */
	constructor(dom_badge, location_url) {
		if(dom_badge && location_url && dom_badge instanceof Badge && dom_badge.is_valid()) {
			if(typeof location_url == "string") {
				this.#original_location_str=location_url;
				this.#dom_impl_badge=dom_badge;
			}
		} else {
			throw new TypeError("Illegal constructor");
		}
		this.#original_location_str="";
		/**@type {undefined | ((dom_impl_badge:Badge,href:string)=>void)} */
		this.location_setup=function(dom_impl_badge=new Badge,href) {
			this.#dom_impl_badge=dom_impl_badge;
			this.#original_location_str=href;
			this.#location_url=new URL(href);
			void this.#location_url,this.#original_location_str;
			delete this.location_setup;
		};
	}
}
