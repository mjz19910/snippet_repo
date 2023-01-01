import {EventListenersT} from "../../typescript/modules/DebugApi/src/EventListenersT.js";

type InterceptFuncType=EventListenerOrEventListenerObject;
type InterceptThis=[string,InterceptFuncType,any?];
class Socket {
	client_id() {return 0;};
}
class ListenSocket {
	client_id=0;
}
let new_elevated_event_handlers: ((arg0: EventListenersT) => void)[]=[];
const sha1_initial="781ee649";
const post_message_connect_message_type=`ConnectOverPostMessage_${sha1_initial}` as const;
const commit_id_sha1=/* @sha1 */"ce87fbfd";
const InjectApiStr="inject_api";

let api_debug_enabled=false;
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
	failed_obj: null|{v: any;}=null;
	object_ids: WeakRef<{}>[]=[];
	namespace_key: `__${typeof InjectApiStr}_${typeof commit_id_sha1}_namespace`=`__${InjectApiStr}_${commit_id_sha1}_namespace`;
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
	convert_to_namespaced_string(real_value: unknown[],val: {},key: number,index: number) {
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
	/** @private @arg {{}} val */
	add_object_id(val: {}) {
		if(!(this.namespace_key in val)) throw new Error("Invalid");
		return this.object_ids.push(new WeakRef(val))-1;
	}
	/** @private @returns {void} @arg {[unknown,number,unknown,...unknown[]]} real_value @arg {number} key @arg {{}|null} val */
	args_iter_on_object(real_value: [unknown,number,unknown,...unknown[]],key: number,val: {}|null): void {
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
		let [target,orig_this,args]=list;
		/** @type {[unknown,number,unknown,...unknown[]]} */
		let real_value: [unknown,number,unknown,...unknown[]]=[target,args.length+1,orig_this,...args];
		for(let [key,val] of real_value.entries()) {
			switch(typeof val) {
				case "object": this.args_iter_on_object(real_value,key,val); break;
				case "function": this.args_iter_on_function(real_value,key,val); break;
				default: break;
			}
		}
	}
	convert_to_id_key(real_value: unknown[],key: number,val: {}|CallableFunction,namespace: string) {
		define_property_as_value(val,this.namespace_key,namespace);
		this.convert_to_namespaced_string(real_value,val,key,this.add_object_id(val));
	}
	args_iter_on_function<T extends CallableFunction>(real_value: unknown[],key: number,val: T) {
		this.convert_to_id_key(real_value,key,val,"function");
	}
	add_to_call_list(list: [any,any,any[]]) {
		if(!api_debug_enabled) return;
		if(this.failed_obj) return;
		try {
			this.add_to_call_list_impl(list);
		} catch(e) {
			console.log("err in add to call list",e);
		}
	}
	/** @private @arg {Node} val */
	generate_node_id(val: Node|({__id_holder: {value: number;};}&Node)) {
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
		let node_id=this.node_id_max++;
		let id_holder={value: node_id};
		define_property_as_value(val,"__id_holder",id_holder);
		if("__id_holder" in val) {
			val.__id_holder=id_holder;
		}
		ids.push(new WeakRef(id_holder));
		this.node_list=new WeakRef(list);
		return node_id;
	}
	/** @private @arg {Extract<keyof EventTarget,string>} target */
	init_overwrite(target: Extract<keyof EventTarget,string>) {
		let t=this;
		switch(target) {
			case "addEventListener":
				/** @arg {[string,EventListenerOrEventListenerObject,any?]} args */
				t.target_prototype[target]=function(...args: [string,EventListenerOrEventListenerObject,any?]) {
					if(api_debug_enabled) t.add_to_call_list([target,this,args]);
					let original_function=args[1];
					if(!t.elevated_event_handlers.includes(original_function)) {
						/** @arg {[evt: Event]} args */
						args[1]=function(...args: [evt: Event]) {
							t.eventFireInterceptor(original_function,this,args);
						};
					}
					return t.original_prototype.addEventListener.call(this,...args);
				}; break;
			case "removeEventListener": t.target_prototype[target]=function(...args) {
				if(api_debug_enabled) t.add_to_call_list([target,this,args]);
				return t.original_prototype[target].call(this,...args);
			}; break;
			case "dispatchEvent": t.target_prototype[target]=function(...args) {
				if(api_debug_enabled) t.add_to_call_list([target,this,args]);
				return t.original_prototype[target].call(this,...args);
			}; return;
			default: throw new Error("1");
		}
	}
	eventFireInterceptor(arg_function: InterceptThis[1],arg_this: InterceptThis,args: [evt: Event]) {
		if(args[0] instanceof MessageEvent) {
			/** @type {MessageEvent<unknown>} */
			let msg_event: MessageEvent<unknown>=args[0];
			let d=msg_event.data;
			if(typeof d==="object"&&d!==null&&"type" in d) {
				if(d.type===post_message_connect_message_type) {
					if(api_debug_enabled) console.log("skip page event handler for "+d.type);
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
