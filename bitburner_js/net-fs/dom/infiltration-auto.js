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
	/** @param {{}} y */
	function g(y) {
		if(Object.keys(y).length>0) {ns.print("rest: ",Object.keys(y)); console.log("rest",y);}
	}
	/** @param {string} key @param {{}[]} value @param {string[]} path @returns {never} */
	function unhandled(key,value,path) {
		ns.toast(key+" not handled: "+path.join("."),"error");
		console.log(key,path.join("."),...value);
		ns.exit();
	}
	const global_hook=__REACT_DEVTOOLS_GLOBAL_HOOK__.hook_ref;
	const dispatcher_ref=global_hook.currentDispatcherRef;
	/** @arg {string[]} path @param {ReactForwardRef} forward_ref */
	function on_react_forward_ref(path,forward_ref) {
		const {$$typeof,render,...y}=forward_ref; g(y);
		if($$typeof!==react_symbols.forward_ref) {
			unhandled("not_forward_ref",[forward_ref],path);
		}
		ns.print("forward_ref.render.name: ",render.name," ",render.length);
		let ref_render;
		let ref_obj={};
		let prev_dispatcher=dispatcher_ref.current;
		try {
			dispatcher_ref.current={};
			debugger;
			let res=render(ref_obj,null);
			ref_render=[ref_obj,res];
		} catch(e) {
			ref_render=[ref_obj,e];
		} finally {
			dispatcher_ref.current=prev_dispatcher;
		}
		console.log("forward_ref",ref_render);
	}
	/** @type {string[]} */
	const fn_str_list=[];
	/** @type {Map<Function,[number,string]>} */
	const fn_str_map=new Map;
	const fn_set=new Set;
	/** @param {ReactElement2} element @arg {string[]} path */
	function on_react_element(element,path) {
		const react_element_sym=react_symbols.react_element;
		switch(element.$$typeof) {
			default: unhandled("react_element",[element],path);
			case react_element_sym: {
				const {$$typeof,type,key,ref,props,_owner,...y}=element; g(y);
				if(typeof type!=="function") {
					on_react_forward_ref(path,type);
				} else {
					/** @type {[number,string]} */
					let fn_string=[0,""];
					if(!fn_set.has(type)) {
						fn_set.add(type);
						fn_string[1]=type.toString();
						if(!fn_str_list.includes(fn_string[1])) fn_str_list.push(fn_string[1]);
						fn_string[0]=fn_str_list.indexOf(fn_string[1]);
						fn_str_map.set(type,fn_string);
					} else {
						let item=fn_str_map.get(type);
						if(!item) ns.exit();
						fn_string=item;
					}
					ns.print("react_element.type: ",type.name," idx:",fn_string[0]);
				}
				x: {
					if(key===null) break x;
					ns.print("react_element.key: ",key);
				}
			} return;
		}
	}
	/** @param {ReactElementProps} props @arg {string[]} path */
	function on_react_fiber_props(props,path) {
		for(let [idx_i,child_like] of props.children.entries()) {
			if(child_like===void 0) continue;
			if(child_like instanceof Array) {
				let sub_children=child_like;
				for(let [idx_j,child] of sub_children.entries()) {
					on_react_element(child,[...path,"children",idx_i+"",idx_j+""]);
				}
				return;
			}
			if(typeof child_like==="object") {
				let child=child_like;
				on_react_element(child,[...path,"children",idx_i+""]);
				return;
			}
			ns.toast("fiber_props not handled","error");
			console.log("fiber_props.children",child_like);
			ns.exit();
		}
	}
	/** @param {ReactFiber|null} fiber_nullable @arg {string[]} path */
	function on_react_fiber(fiber_nullable,path=["fiber"]) {
		if(fiber_nullable===null) return;
		let fiber=fiber_nullable;
		if(seen_react_fiber_set.has(fiber)) return;
		seen_react_fiber_set.add(fiber);
		switch(fiber.tag) {
			default: {
				ns.print(`${path.join(".")}.tag: `,fiber.tag);
				ns.toast("react_fiber not handled: "+path,"error");
				console.log("react_fiber",path,fiber);
				ns.exit();
			};
			case 11: {
				const {tag,key,elementType,type,stateNode,return: return_,child,sibling,index,ref,pendingProps,memoizedProps,updateQueue,...y}=fiber;
				const {memoizedState,dependencies,mode,flags,nextEffect,firstEffect,lastEffect,lanes,childLanes,alternate,...y1}=y;
				if(Object.keys(y1).length>0) ns.print("rest: ",y1);
			} break;
			case 7: {
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
				on_react_state_node(stateNode,[...path,"return"]);
				on_react_fiber(return_,[...path,"return"]);
				on_react_fiber(child,[...path,"child"]);
				on_react_fiber(sibling,[...path,"sibling"]);
				if(index!==1) p("index",index);
				on_react_ref(ref,[...path,"ref"]);
				on_react_fiber_props(pendingProps,[...path,"pendingProps"]);
				on_react_fiber_props(memoizedProps,[...path,"memoizedProps"]);
				p("updateQueue",updateQueue);
			} break;
		}
		fiber.tag;
	}
	/** @param {object|null} ref @param {string[]} path */
	function on_react_ref(ref,path) {
		if(ref===null) return;
		ns.toast("react_ref not handled: "+path,"error");
		console.log("react_ref",path,ref);
		ns.exit();
	}
	/** @param {HTMLElement} node @param {string[]} path */
	function on_react_state_node(node,path) {
		if(node instanceof HTMLElement) return;
		ns.toast("react_state_node not handled: "+path,"error");
		console.log("react_state_node",path,node);
		ns.exit();
	}
	/** @type {HTMLDivElement} */
	const root_element=as_any(window.root);
	/** @param {Element} val @returns {ReactFiber} */
	function get_react_fiber(val) {
		return Object.values(val)[0];
	}
	const react_symbols={
		forward_ref: window.React.forwardRef(() => null)["$$typeof"],
		react_element: (() => {
			let u=window.React.createElement("div");
			/** @type {DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>,HTMLElement>} */
			let r=as_any(u);
			return r["$$typeof"];
		})(),
	};
	const seen_react_fiber_set=new Set;
	/** @type {HTMLDivElement} */
	const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
	/** @type {HTMLDivElement} */
	const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
	/** @type {HTMLUListElement} */
	const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
	let mui_list_react_fiber=get_react_fiber(MuiList_root);
	on_react_fiber(mui_list_react_fiber);
}
