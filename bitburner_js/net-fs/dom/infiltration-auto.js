// infiltration-auto

import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
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
	const seen_react_fiber_set=new Set;
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
	/** @param {ReactFiber} fiber @arg {string[]} path */
	function on_react_fiber(fiber,path=["fiber"]) {
		if(seen_react_fiber_set.has(fiber)) return;
		seen_react_fiber_set.add(fiber);
		switch(fiber.tag) {
			default: ns.print(`${path.join(".")}.tag: `,fiber.tag); break;
			case 11: {
				const {tag,key,elementType,type,stateNode,return: return_,child,sibling,index,ref,pendingProps,memoizedProps,updateQueue,...y}=fiber;
				const {memoizedState,dependencies,mode,flags,nextEffect,firstEffect,lastEffect,lanes,childLanes,alternate,...y1}=y;
				if(Object.keys(y1).length>0) ns.print("rest: ",y1);
			} break;
			case 5: {
				const {tag,key,elementType,type,stateNode,return: return_,child,sibling,index,ref,pendingProps,memoizedProps,updateQueue,...y}=fiber;
				const {memoizedState,dependencies,mode,flags,nextEffect,firstEffect,lastEffect,lanes,childLanes,alternate,...y1}=y;
				if(Object.keys(y1).length>0) ns.print("rest: ",y1);
				/** @param {string} a1 @param {any} a2 */
				function p(a1,a2) {
					x: {
						if(typeof a2==="string") break x;
						if(typeof a2==="number") break x;
						if(a2===null) break x;
						if(a1==="stateNode") break x;
						if(a1==="pendingProps") {
							break x;
						}
						if(a1==="memoizedProps") break x;
						console.log(`fiber.${a1}:`,a2);
					}
					try {
						ns.print(path.join("."),".",a1," ",a2);
					} catch {
						ns.print(path.join("."),".",a1," ",a2.toString()," {[cyclic object]}");
					}
				}
				if(key!==null) p("key",key);
				switch(elementType) {
					default: p("elementType",elementType); break;
					case "ul": case "div":
				}
				switch(type) {
					default: p("type",type); break;
					case "ul": case "div":
				}
				x: {
					if(stateNode instanceof HTMLUListElement) break x;
					if(stateNode instanceof HTMLDivElement) break x;
					p("stateNode",stateNode);
				}
				on_react_fiber(return_,[...path,"return"]);
				on_react_fiber(child,[...path,"child"]);
				p("sibling",sibling);
				p("index",index);
				p("ref",ref);
				p("pendingProps.className",pendingProps.className);
				console.log("pendingProps",pendingProps.children);
				p("memoizedProps.className",memoizedProps.className);
				p("updateQueue",updateQueue);
			} break;
		}
		fiber.tag;
	}
	react_symbols;
}
