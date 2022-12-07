import {IInjectAPI} from "./support/IInjectAPI.js";

// Holder
export type Holder=1;

// PickByValue & Entries
declare global {
	type PickByValue<T,V>=Pick<T,{[K in keyof T]: T[K] extends V? K:never}[keyof T]>;
	type Entries<T>={
		[K in keyof T]: [K,T[K]];
	}[keyof T][];
	type Entries3<T>={
		[K in keyof T]: [keyof PickByValue<T,T[K]>,T[K]]
	}[keyof T][];
}

//@@iterator for NodeListOf
declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

// inject_api global
declare global {
	interface Window {
		inject_api: IInjectAPI;
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

export class Repeat_2<T> {
	value;
	times;
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
	static from_TU_entry(
		_a: ["string",string]|["number",number],
		_b: number
	): ["string",string|Repeat_2<string>]|["number",number|Repeat_2<number>] {
		throw new Error("1");
	}
}

declare global {
	type AnyOrRepeat2_0<T,U>=["T",AnyOrRepeat_0<T>]|["U",AnyOrRepeat_0<U>];
}

declare global {
	type DualR=[true,AnyOrRepeat2_1<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
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

export type Constructor=new () => any;

declare global {
	type depth_type=['depth',number,WeakRef<depth_or_any[]>];
	type value_id_type=['value_id',number,["real_holder",any]];
	type depth_or_any=['real_holder',unknown]|value_id_type|depth_type;
}

declare global {
	type RemoteOriginConnected={type: "connected",client_id: number;};
	type RemoteOriginDisconnected={type: "disconnected";};
	type OriginConnectionSide="client"|"server";
	type RemoteOriginKeepAliveReply={type: "keep_alive_reply",sides: [OriginConnectionSide,OriginConnectionSide];};
	type RemoteOriginKeepAlive={type: "keep_alive"; side: OriginConnectionSide;};
	type RemoteOriginMessage=
		RemoteOriginConnected|
		RemoteOriginDisconnected|
		RemoteOriginKeepAlive|
		RemoteOriginKeepAliveReply;
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
		event: MessageEvent<RemoteOriginMessage>;
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
