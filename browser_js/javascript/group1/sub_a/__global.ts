import {TimeoutExecutor} from "../../group2/RustBasicExecutor_item.js";

type TaskAsFuture<T>={
	contains(value: T): boolean;
};

type ActiveTask<T>={
	future: TaskAsFuture<T>;
	cancel():void;
};

declare global {
	interface Window {
		// cint (number for a single setTimeout / setInterval)
		__cint?: number;
		// item_04
		__active_task?: ActiveTask<{}>;
		get_active_task<T>(like:T): ActiveTask<T>;
		__cur_task: TimeoutExecutor;
		// item_05
		buffer_vec: ArrayBuffer;
		float_32_vec: Float32Array;
		uint8_vec: Uint8Array;
		__worker: {};
		__tick_log: {}[];
		__result_vec: number[];
	}
}

// module_list
declare global {
	interface Window {
		module_list: WebAssembly.Module[];
		exchange?: (x:number)=>void;
	}
}

export {};
