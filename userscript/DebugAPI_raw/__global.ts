import {} from "./support/IDValue_0.js";
import {} from "./support/IInjectAPI.js";
import {} from "./support/Nullable.js";
import {} from "./support/RecordKey.js";
import {RepeatL_0} from "./support/Repeat_0.js";

// Holder
export type Holder=1;

//@@iterator for NodeListOf
declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

// inject_api global
declare global {
	interface InjectAPI extends IInjectAPI {}
	interface Window {
		inject_api: InjectAPI;
	}
}

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
	type dbg_T1={
		type: 'argument-error';
		data: null;
	};

	type dbg_T2={
		type: "argument-error";
		data: null;
	};

	type dbg_T3={
		type: "data";
		data: {
			result: [string,any];
			return: any;
		};
	};

	type dbg_T4={
		type: "unexpected";
		data: {
			result: {
				type: 'hidden-var';
				var: string;
			}|{
				type: 'no-var';
				data: null;
			};
			return: any;
		};
	};

	type dbg_T5={
		type: 'invalid-state-error';
		data: null;
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
		data: {
			result: null,
		};
	};

	type dbg_t2={
		type: 'no-response-null-result';
		data: {
			result: null;
			return: any;
		};
	};

	type dbg_result=dbg_T1|dbg_T2|dbg_T3|dbg_T4|dbg_T5|dbg_T6|dbg_t1|dbg_t2;
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
	type ConnectionConnected={
		type: "connect";
		client_id: number;
	};
	type ConnectionDisconnected={
		type: "disconnected";
		can_reconnect:boolean;
	};
	type ConnectionSide="client"|"server";
	type ConnectionAck={
		type:"ack",
		client_id:number,
		side:ConnectionSide,
	};
	type ConnectionMessage=
		ConnectionAck|
		ConnectionConnected|
		ConnectionDisconnected;
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
		source: MessageEventSource;
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
