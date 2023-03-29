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
	const react_render_set=new Set;
	/** @arg {string[]} path @param {ReactForwardRef} forward_ref */
	function on_react_forward_ref(path,forward_ref) {
		const {$$typeof,render,...y}=forward_ref; g(y);
		x: {
			if(react_render_set.has(render)) break x;
			react_render_set.add(render);
			if($$typeof!==react_symbols.forward_ref) {
				unhandled("not_forward_ref",[forward_ref],path);
			}
			/** @type {{}[]} */
			const action_log=[];
			const base_ref={
				absolute: Symbol.for("absolute"),
				children: Symbol.for("children"),
				className: Symbol.for("className"),
				component: Symbol.for("component"),
				flexItem: Symbol.for("flexItem"),
				light: Symbol.for("light"),
				orientation: Symbol.for("orientation"),
				role: Symbol.for("role"),
				textAlign: Symbol.for("textAlign"),
				/** @type {"variant"} */
				variant: "variant",
			};
			const proxy_config={log_own_keys: false};
			/** @satisfies {ProxyHandler<typeof base_ref>} */
			const proxy_target={
				/** @arg {keyof typeof base_ref} k */
				get(obj,k) {
					let key=obj===base_ref? "base_ref":"unknown";
					action_log.push(["get",key,k]);
					if(k in obj) return obj[k];
					console.log("ref get",k);
					return void 0;
				},
				ownKeys(obj) {
					let key=obj===base_ref? "base_ref":"unknown";
					action_log.push(["ownKeys",key]);
					if(proxy_config.log_own_keys) console.log("ref ownKeys");
					return Reflect.ownKeys(obj);
				},
				getOwnPropertyDescriptor(target,p) {
					let key=target===base_ref? "base_ref":"unknown";
					action_log.push(["getOwnPropertyDescriptor",key,p]);
					if(p in target) return Reflect.getOwnPropertyDescriptor(target,p);
					console.log("ref getOwnPropertyDescriptor",p);
					return void 0;
				}
			};
			let owner_state=new Proxy(base_ref,new Proxy(proxy_target,{
				/** @arg {keyof typeof proxy_target} k */
				get(obj,k) {
					if(k in obj) return obj[k];
					console.log("proxy get",k);
					return void 0;
				},
			}));
			let prev_dispatcher=dispatcher_ref.current;
			/** @type {["error",unknown]|["result",{},{}[]]} */
			let ref_render;
			try {
				dispatcher_ref.current={
					/** @arg {{}} obj @arg {undefined} a1 */
					useContext(obj,a1) {
						action_log.push(["useContext",obj,a1]);
					}
				};
				debugger;
				let res=render(owner_state,null);
				ref_render=["result",res,action_log];
			} catch(e) {
				ref_render=["error",e];
			} finally {
				dispatcher_ref.current=prev_dispatcher;
			}
			if(ref_render[0]==="error") {
				ns.print("forward_ref.render.name: ",render.name," ",render.length);
			} else {
				console.log("forward_ref",ref_render[1],{log: ref_render[2]});
			}
		}
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
				x: if(typeof type!=="function") {
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
					if(type.name==="p"&&fn_string[0]===0) break x;
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
				if(updateQueue!==null) p("updateQueue",updateQueue);
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
