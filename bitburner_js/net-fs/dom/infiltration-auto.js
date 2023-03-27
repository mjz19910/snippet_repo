// infiltration-auto

import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	if(!("root" in window)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(window.root);
	/** @template {Element} R @returns {R} @template {Element} T @arg {T} root @template {string} U @arg {U} selector */
	function query_element(root,selector) {
		/** @type {R|null} */
		let element=root.querySelector(selector);
		if(!element) {
			debugger;
			throw new Error("Missing element");
		}
		return element;
	};
	/** @template {Element} T @arg {T} node */
	function query_parent_element(node) {
		let element=node.parentElement;
		if(!element) {
			debugger;
			throw new Error("Missing element");
		}
		return element;
	}
	/** @param {Element} val @returns {ReactFiber} */
	function get_react_fiber(val) {
		return Object.values(val)[0];
	}
	const react_symbols={
		forward_ref: window.React.forwardRef(() => null)["$$typeof"],
	};
	/**
	 * @returns {HTMLDivElement}
	 * @param {HTMLElement} node
	 */
	function as_div_element(node) {
		if(!(node instanceof HTMLDivElement)) {
			debugger;
			throw new Error("Wrong type");
		}
		return node;
	}
	/** @type {HTMLDivElement} */
	const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
	/** @type {HTMLDivElement} */
	const MuiBox_root=as_div_element(query_parent_element(MuiDrawer_root));
	let mui_box_react_fiber=get_react_fiber(MuiBox_root);
	on_react_fiber(mui_box_react_fiber);
	/** @type {HTMLDivElement} */
	const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
	/** @type {HTMLUListElement} */
	const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
	let mui_list_react_fiber=get_react_fiber(MuiList_root);
	on_react_fiber(mui_list_react_fiber);
	/** @param {ReactFiber} fiber */
	function on_react_fiber(fiber) {
		switch(fiber.tag) {
			default: ns.print("fiber.tag: ",fiber.tag); break;
			case 5: {
				const {tag,key,elementType,type,stateNode,return: return_,child,sibling,index,pendingProps,memoizedProps,updateQueue,...y}=fiber;
				console.log("rest:",y);
			} break;
		}
		fiber.tag;
	}
	react_symbols;
}
