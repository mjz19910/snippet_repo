class ServiceWorkerContainer {}
class Node {}
class IDBTransaction {}
class Document {}
class IDBDatabase {}
import {T_Split} from "../../userscript/youtube_plugin_raw/yt_json_types/stu/group_T.ts";
import {EventListenersT} from "../modules/DebugApi/src/EventListenersT.ts";
export type Split<S extends string,D extends string>=T_Split<S,D>;
type InterceptFuncType=EventListenerOrEventListenerObject;
type InterceptThis=[string,InterceptFuncType,Record<never,never>?];
type ValueType=Record<`__${typeof InjectApiStr}_namespace`,never>;
class Socket {
	client_id() {return 0;}
}
class ListenSocket {
	client_id=0;
}
const new_elevated_event_handlers: ((arg0: EventListenersT) => void)[]=[];
const sha1_initial="781ee649";
const post_message_connect_message_type=`ConnectOverPostMessage_${sha1_initial}` as const;
const InjectApiStr="inject_api";

const api_debug_enabled=false;
type NodeExt={
	__id_holder: {
		value: number;
	};
};

class AddEventListenerExtension {
	/** @private */
	original_prototype={
		addEventListener: EventTarget.prototype.addEventListener,
		dispatchEvent: EventTarget.prototype.dispatchEvent,
		removeEventListener: EventTarget.prototype.removeEventListener,
	};
	/** @private */
	target_prototype=EventTarget.prototype;
	window_list: Window[]=[window];
	failed_obj: null|{v: unknown;}=null;
	object_ids: WeakRef<Record<never,never>>[]=[];
	namespace_key: `__${typeof InjectApiStr}_namespace`=`__${InjectApiStr}_namespace`;
	elevated_event_handlers: EventListenersT[]=[];
	clear_count=0;
	node_list: WeakRef<WeakRef<Node>[]>=new WeakRef([]);
	node_list_ids: WeakRef<WeakRef<{value: number;}>[]>=new WeakRef([]);
	node_id_max=0;
	constructor() {
		overwrite_addEventListener(this);
		new_elevated_event_handlers.push(this.elevate_handler.bind(this));
		if(!api_debug_enabled) return;
		this.init_overwrite("addEventListener");
		this.init_overwrite("dispatchEvent");
		this.init_overwrite("removeEventListener");
	}
	get_target_prototype() {
		return this.target_prototype;
	}
	/** @arg {EventListenersT} handler */
	elevate_handler(handler: EventListenersT) {
		this.elevated_event_handlers.push(handler);
	}
	/** @private @arg {unknown[]} real_value @arg {{}} val @arg {number} key @arg {number} index */
	convert_to_namespaced_string(real_value: unknown[],val: Record<`__${typeof InjectApiStr}_namespace`,never>,key: number,index: number) {
		if(!(this.namespace_key in val))
			throw new Error("Unreachable");
		if(typeof val[this.namespace_key]!=="string") {
			console.log("unable to find namespace (not a string)",val);
			real_value[key]=`weak_id:${index}`;
			return;
		}
		real_value[key]=`weak_id:${val[this.namespace_key]}:${index}`;
		return;
	}
	add_object_id(val: Record<never,never>) {
		if(!(this.namespace_key in val)) throw new Error("Invalid");
		return this.object_ids.push(new WeakRef(val))-1;
	}
	/** @private @returns {void} @arg {[unknown,number,unknown,...unknown[]]} real_value @arg {number} key @arg {{}|null} val */
	args_iter_on_object(real_value: [unknown,number,unknown,...unknown[]],key: number,val: ValueType|(Window&typeof globalThis&ValueType)|null): void {
		if(val===null)
			return;
		if(val instanceof Socket) {
			this.convert_to_id_key(real_value,key,val,"Socket:client_"+val.client_id());
			return;
		}
		if(val instanceof ListenSocket) {
			this.convert_to_id_key(real_value,key,val,"ListenSocket:client_"+val.client_id);
			return;
		}
		if(val===window) {
			real_value[key]="window:"+this.window_list.indexOf(window);
			return;
		}
		if(val instanceof Node) {
			real_value[key]=this.generate_node_id(val);
			return;
		}
		if(val instanceof Document) {
			real_value[key]=this.generate_node_id(val);
			return;
		}
		let is_react_element=false;
		if("__reactContainer$" in val) {
			is_react_element=true;
		}
		if("__reactFiber$" in val) {
			is_react_element=true;
		}
		if(is_react_element) {
			console.log("react_element",val);
			this.convert_to_id_key(real_value,key,val,"react");
			return;
		} else if(val instanceof IDBDatabase||val instanceof IDBTransaction) {
			// IDBDatabase might have a `closure_lm_${random}` attached on gmail;
			this.convert_to_id_key(real_value,key,val,"idb");
			return;
		} else if("ServiceWorkerContainer" in window&&val instanceof ServiceWorkerContainer) {
			this.convert_to_id_key(real_value,key,val,"ServiceWorkerContainer");
			return;
		}
		real_value[key]="cleared_out:"+this.clear_count++;
		return;
	}
	/** @private @arg {[unknown, unknown, unknown[]]} list */
	add_to_call_list_impl(list: [unknown,unknown,unknown[]]) {
		const [target,orig_this,args]=list;
		/** @type {[unknown,number,unknown,...unknown[]]} */
		const real_value: [unknown,number,unknown,...unknown[]]=[target,args.length+1,orig_this,...args];
		for(const [key,val] of real_value.entries()) {
			switch(typeof val) {
				case "object": this.args_iter_on_object(real_value,key,val as ValueType); break;
				case "function": this.args_iter_on_function(real_value,key,val as CallableFunction&ValueType); break;
				default: break;
			}
		}
	}
	convert_to_id_key(real_value: unknown[],key: number,val: ValueType,namespace: string) {
		define_property_as_value(val,this.namespace_key,namespace);
		this.convert_to_namespaced_string(real_value,val,key,this.add_object_id(val));
	}
	args_iter_on_function<T extends CallableFunction&ValueType>(real_value: unknown[],key: number,val: T) {
		this.convert_to_id_key(real_value,key,val,"function");
	}
	add_to_call_list(list: [unknown,unknown,unknown[]]) {
		if(!api_debug_enabled) return;
		if(this.failed_obj) return;
		try {
			this.add_to_call_list_impl(list);
		} catch(e) {
			console.log("err in add to call list",e);
		}
	}
	/** @private @arg {Node} val */
	generate_node_id(val: Node|(NodeExt&Node)) {
		if("__id_holder" in val&&val.__id_holder) {
			return val.__id_holder.value;
		}
		let list=this.node_list.deref();
		if(!list) {
			list=[];
		}
		let ids=this.node_list_ids.deref();
		if(!ids) {
			ids=[];
		}
		list.push(new WeakRef(val));
		const node_id=this.node_id_max++;
		const id_holder={value: node_id};
		define_property_as_value(val,"__id_holder",id_holder);
		if("__id_holder" in val) {
			val.__id_holder=id_holder;
		}
		ids.push(new WeakRef(id_holder));
		this.node_list=new WeakRef(list);
		return node_id;
	}
	capture_this<CallbackType extends ((this: This,...args: TParameters) => TReturnType),TParameters extends unknown[]=Parameters<CallbackType>,This=ThisParameterType<CallbackType>,TReturnType=ReturnType<CallbackType>>(cb: (cl: {
		this: This;
	},...args: Parameters<CallbackType>) => TReturnType): CallbackType {
		return function(this: This,...args: Parameters<CallbackType>) {
			return cb({this: this},...args);
		} as CallbackType;
	}
	capture_this_2<CallbackType,TParameters extends unknown[],This,TReturnType>(cb: (cl: {
		this: This;
	},...args: TParameters) => TReturnType): CallbackType {
		return function(this: This,...args: TParameters) {
			return cb({this: this},...args);
		} as CallbackType;
	}
	/** @private @arg {Extract<keyof EventTarget,string>} target */
	init_overwrite(target: Extract<keyof EventTarget,string>) {
		switch(target) {
			case "addEventListener":
				/** @arg {[string,EventListenerOrEventListenerObject,any?]} args */
				this.target_prototype[target]=(...args: [string,EventListenerOrEventListenerObject,(boolean|AddEventListenerOptions)?]) => {
					if(api_debug_enabled) this.add_to_call_list([target,this,args]);
					const original_function=args[1];
					if(!this.elevated_event_handlers.includes(original_function)) {
						args[1]=this.capture_this_2<typeof original_function,[evt: Event],InterceptThis,void>((closure,...args: [evt: Event]) => {
							this.eventFireInterceptor(original_function,closure.this,args);
						});
					}
					return this.original_prototype.addEventListener.call(this,...args);
				}; break;
			case "removeEventListener": this.target_prototype[target]=this.capture_this<EventTarget[typeof target]>((closure,...args) => {
				if(api_debug_enabled) this.add_to_call_list([target,closure.this,args]);
				return this.original_prototype[target].call(this,...args);
			}); {
					const original_prototype=this.original_prototype;
					this.target_prototype[target]=function(...args) {
						return original_prototype[target].call(this,...args);
					};
				} break;
			case "dispatchEvent": this.target_prototype[target]=(...args) => {
				if(api_debug_enabled) this.add_to_call_list([target,this,args]);
				return this.original_prototype[target].call(this,...args);
			}; return;
			default: throw new Error("1");
		}
	}
	eventFireInterceptor(arg_function: InterceptThis[1],arg_this: InterceptThis,args: [evt: Event]) {
		if(args[0] instanceof MessageEvent) {
			/** @type {MessageEvent<unknown>} */
			const msg_event: MessageEvent<unknown>=args[0];
			const d=msg_event.data;
			if(typeof d==="object"&&d!==null&&"type" in d) {
				const d_type=Reflect.get(d,"type");
				if(d_type===post_message_connect_message_type) {
					if(api_debug_enabled) console.log("skip page event handler for "+d_type);
					return;
				}
			}
		}
		if(typeof arg_function==="function") {
			return arg_function.apply(arg_this,args);
		} else {
			return arg_function.handleEvent(...args);
		}
	}
}
export let inject_api={
	addEventListenerExt: new AddEventListenerExtension,
	reversePrototypeChain: new class {
		add_target(_v: {}) {}
		generate() {}
	},
};
function overwrite_addEventListener<T extends AddEventListenerExtension>(arg0: T) {
	arg0;
}
function define_property_as_value<T>(val: {}|CallableFunction,namespace_key: string,namespace: T) {
	val; namespace_key; namespace;
}
