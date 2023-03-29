// infiltration-auto

import {query_element} from "/dom/dom-support.js";
import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	ns.moveTail(250+3,3);
	ns.disableLog("disableLog");
	if(!("root" in window)) return;
	function gen_dispatcher() {
		/** @arg {number} minified_error_id */
		function a(minified_error_id) {return "react mini-error: "+minified_error_id;}
		let eo={},Qi={dependencies: {}};
		let Ji={
			context: {},observedBits: 0,
			/** @type {{context:ReactContext,observedBits:number;next:null;}|null} */
			next: null
		};
		return {
			/** @arg {ReactContext} e @arg {undefined} t */
			useContext(e,t) {
				/** @returns {{context:typeof e,observedBits:number;next:null;}} */
				function get_t() {return as_any(t);}
				if(eo!==e&&!1!==t&&0!==t) {
					if('number'==typeof t&&1073741823!==t||(eo=e,
						// @ts-expect-error
						t=1073741823),
						// @ts-expect-error
						t={
							context: e,
							observedBits: t,
							next: null
						},null===Ji) {
						if(null===Qi) throw Error(a(308));
						Ji=get_t(),
							Qi.dependencies={
								lanes: 0,
								firstContext: t,
								responders: null
							};
					} else {
						Ji=Ji.next=get_t();
					}
				}
				return e._currentValue;
			}
		};
	}
	const local_react_context=gen_dispatcher();
	/** @type {HTMLDivElement} */
	const root_element=as_any(window.root);
	const react_symbols={
		forward_ref: window.React.forwardRef(() => null)["$$typeof"],
		react_element: (() => {
			let u=window.React.createElement("div");
			/** @type {DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>,HTMLElement>} */
			let r=as_any(u);
			return r["$$typeof"];
		})(),
	};
	/** @type {HTMLDivElement} */
	const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
	/** @type {HTMLDivElement} */
	const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
	/** @type {HTMLUListElement} */
	const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
	console.log(MuiList_root);
}
