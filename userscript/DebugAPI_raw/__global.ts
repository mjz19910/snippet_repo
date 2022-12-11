import {} from "./support/IDValue_0.js";
import {} from "./support/IInjectAPI.js";
import {} from "./support/Nullable.js";
import {} from "./support/RecordKey.js";
import {RepeatL_0} from "./support/Repeat_0.js";

declare global {
	type ActivateClass={
		type: "activate-class";
		value: (fn_val: Constructor,args: any[]) => any;
	};

	type ActivateFunction={
		type: "activate-function";
		value: (fn_val: Function,thisArg: any,args: any[]) => any;
	};

	type IActivate=ActivateClass|ActivateFunction;
}

declare global {
	interface Window {
		debug?: I_debug|undefined;
		undebug?: I_undebug|undefined;
	}

	interface I_debug {
		(fn: (...x: any[]) => void,code: string): void;
	}

	interface I_undebug {
		(fn: (...x: any[]) => any): void;
	}
}

// Holder
export type Holder=1;

declare global {
	type msg_ev_01=CM<MessageEvent<{
		type: string;
		data: unknown;
	}>>|null;
}

declare global {
	type CM<T>={tag: "cast_tag",data: T;};
}

//@@iterator for NodeListOf
declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

// inject_api global
declare global {
	interface InjectAPI extends IInjectAPI {
		saved_instances?: [string,{name: string;},{}][];
	}
	interface Window {
		[InjectAPIStr]?: InjectAPI;
	}
}

function test_inject_api() {
	let inject_api: InjectAPI={};
	inject_api;
}
test_inject_api();

// SafeFunctionPrototype
declare global {
	type SafeFunctionPrototype={
		apply: (this: Function,thisArg: any,argArray?: any) => any;
		bind: (this: Function,thisArg: any,...argArray: any[]) => any;
		call: (this: Function,thisArg: any,...argArray: any[]) => any;
	};
}


declare global {
	class Repeat_0<T> extends RepeatL_0<T> {}
}

declare global {
	type AnyOrRepeat_0<T>=T|Repeat_0<T>;
}

declare global {
	type AnyOrRepeat2_0<T,U>=["T",AnyOrRepeat_0<T>]|["U",AnyOrRepeat_0<U>];
}

// AltPair
declare global {
	type AltPair<T,U>=["T",T]|["U",U];
}

declare global {
	type DualR_0=[true,AnyOrRepeat2_0<string,number>[]]|[false,AltPair<string,number>[]];
}

declare global {
	type dbg_AE={
		type: "argument-error";
	};

	type dbg_DT={
		type: "data";
		result: [string,any];
		return: any;
	};

	type dbg_T4={
		type: "unexpected";
		data: {
			result: {
				type: 'hidden-var';
				var: string;
			}|{
				type: 'no-var';
			};
			return: any;
		};
	};

	type dbg_ISE={
		type: 'invalid-state-error';
	};

	type dbg_T6={
		type: 'data-arr';
		data: {
			result: any[];
			return: any;
		};
	};

	type dbg_t1={
		type: "no-response";
		return: any;
	};

	type dbg_var_result={
		type: "var-result";
		name: string;
		result: any;
		return: any;
	};

	type dbg_result=dbg_AE|dbg_DT|dbg_T4|dbg_ISE|dbg_T6|dbg_t1|dbg_var_result;
}

declare global {
	interface dbg_get_ty {
		get: (__v: string) => {type: string; data: null;}|{type: string; data: any[];};
	}
}

declare global {
	type EventListenerInternal={
		listener: Function,
		once: boolean,
		passive: boolean,
		type: "string",
		useCapture: boolean,
	};
}

declare global {
	type Constructor=new () => any;
}

declare global {
	type depth_type=['depth',number,WeakRef<depth_or_any[]>];
	type value_id_type=['value_id',number,["real_holder",any]];
	type depth_or_any=['real_holder',unknown]|value_id_type|depth_type;
}

declare global {
	type ConnectFlags=[1,"syn"]|[2,"ack"];
	type WrappedMessage<T>={
		type: typeof post_message_connect_message_type,
		data: T,
	};
	type MessageType=
		ConnectionConnected|
		ConnectionDisconnected|
		ConnectionSideMsg|
		ConnectionWillDisconnect;
	type ConnectionMessage={
		type: "tcp",
		flags: ConnectFlags[],
		seq: number,
		ack: number|null,
		client_id: number,
		data: MessageType|ConnectionForward|null,
	};
	type ConnectionForward={
		type: "forward";
		client_id_path: [number,number,null][];
		data: MessageType|null,
	};
	type ConnectionConnected={
		type: "connected";
	};
	type ConnectionWillDisconnect={
		type: "will_disconnect";
		can_reconnect: boolean;
	};
	type ConnectionDisconnected={
		type: "disconnected";
	};
	type ConnectionSide="client"|"server";
	type ConnectionSideMsg={
		type: "side",
		side: ConnectionSide,
	};
	interface BlockEnd {}
}

declare global {
	interface Node {
		__id_holder?: {value: number;};
	}
}

declare global {
	type EventListenersT=EventListenerOrEventListenerObject|((v: MessageEvent<any>) => void);
}

declare global {
	type ReportInfo<T>={
		data: ConnectionMessage,
		handler: T;
	};
}


declare global {
	type arg_list_item_type=WeakRef<{}>|bigint|boolean|string|number|symbol;
	interface Function {
		__arg_list_for_add_event_listeners: arg_list_item_type[][];
	}
}

// WeakRef
declare global {
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef";

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T|undefined;
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>;

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>;
	}

	var WeakRef: WeakRefConstructor;
}
