import {IDValue_0 as IDValue_0_import} from "./support/IDValueI_0.js";
import {Nullable_} from "./support/Nullable.js";
import {RecordKey_} from "./support/RecordKey.js";

declare global {
	type IDValue_0=IDValue_0_import;
	var IDValue_0: typeof IDValue_0_import;
}

declare global {
	type Nullable<T>=Nullable_<T>;
}

declare global {
	type RecordKey<T>=RecordKey_<T>;
}

declare global {
	type ActivateClass={
		type: "class-breakpoint";
		name: string;
		target: DbgNewableFn;
		activate: (fn_val: DbgNewableFn,args: any[]) => any;
		activate_args: any[];
	};

	type ActivateFunction={
		type: "function-breakpoint";
		name: string;
		target: CallableFunction;
		activate: (fn_val: CallableFunction,thisArg: any,args: any[]) => any;
		activate_args: [any,any[]];
	};

	type IDebugBreakpointArgs=ActivateClass|ActivateFunction;
}

type DbgNewableFn=new (...arg0: any[]) => any;

type DebuggableFunctions=DbgNewableFn|CallableFunction;

declare global {
	interface Window {
		debug?: I_debug|undefined;
		undebug?: I_undebug|undefined;
	}

	interface I_debug {
		(fn: DebuggableFunctions,code: string): void;
	}

	interface I_undebug {
		(fn: (...x: any[]) => any): void;
	}
}

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
	type SavedArrayItemType<T>=[string, T];
	interface Window {
		inject_api?: InjectApi;
	}
}

function test_inject_api() {
	let inject_api=new InjectApi;
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
	type dbg_arg_error={type: "argument-error";};
	type dbg_invalid_state={type: "invalid-state-error";};

	type dbg_data={
		type: "data";
		result: [string,any];
		return: any;
	};

	type dbg_unexpected={
		type: "unexpected";
		data: {
			result: {
				type: "hidden-var";
				var: string;
			}|{
				type: "no-var";
			};
			return: any;
		};
	};

	type dbg_data_array={
		type: "data-arr";
		data: {
			result: any[];
			return: any;
		};
	};

	type dbg_no_response={
		type: "no-response";
		return: any;
	};

	type dbg_var_result={
		type: "var-result";
		name: string;
		result: any;
		return: any;
	};

	type dbg_result=dbg_arg_error|dbg_data|dbg_unexpected|dbg_invalid_state|dbg_data_array|dbg_no_response|dbg_var_result;
}

declare global {
	type dbg_eval_hidden={type: "eval-hidden-var";};
	type dbg_no_var={type: "no-var";};

	type dbg_var={
		type: "var";
		data: any[];
	};

	interface dbg_get_ty {
		get?: (__v: string) => dbg_eval_hidden|dbg_no_var|dbg_var;
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
	type Constructor=new (...x: any[]) => any;
}

declare global {
	type depth_type=["depth",number,WeakRef<depth_or_any[]>];
	type value_id_type=["value_id",number,["real_holder",any]];
	type depth_or_any=["real_holder",unknown]|value_id_type|depth_type;
}


export enum ConnectFlag {
	None=0,
	Syn=1<<0,
	Ack=1<<1,
}

declare global {
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
		flags: ConnectFlag,
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

export {type DebugApiH_Type as DebugApiH_Type};
declare global {
	type DebugApiH_Type={
		InjectApi: InjectApi,
		Repeat_0: typeof Repeat_0,
	};
}

// WeakRef
declare global {
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef";
		deref(): T|undefined;
	}
	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>;
		new <T extends object>(target: T): WeakRef<T>;
	}
	var WeakRef: WeakRefConstructor;
}
