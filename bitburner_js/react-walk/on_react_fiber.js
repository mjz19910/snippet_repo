import {on_react_fiber_props} from "./on_react_fiber_props";
import {on_react_ref} from "./on_react_ref";
import {on_react_state_node} from "./on_react_state_node";
import {seen_react_fiber_set} from "./seen_react_fiber_set";

/** @arg {NS} ns @param {ReactFiber|null} fiber_nullable @arg {string[]} path */
export function on_react_fiber(ns,fiber_nullable,path=["fiber"]) {
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
			on_react_state_node(ns,stateNode,[...path,"return"]);
			on_react_fiber(ns,return_,[...path,"return"]);
			on_react_fiber(ns,child,[...path,"child"]);
			on_react_fiber(ns,sibling,[...path,"sibling"]);
			if(index!==1) p("index",index);
			on_react_ref(ns,ref,[...path,"ref"]);
			on_react_fiber_props(ns,pendingProps,[...path,"pendingProps"]);
			on_react_fiber_props(ns,memoizedProps,[...path,"memoizedProps"]);
			if(updateQueue!==null) p("updateQueue",updateQueue);
		} break;
	}
}
