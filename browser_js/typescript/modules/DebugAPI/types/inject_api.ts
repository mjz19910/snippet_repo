import {EventListenersT} from "../src/EventListenersT";

// saved_objects
declare global {
	interface InjectAPI {
		saved_objects: [string,{name: string;}][];
	}
}

// saved_object_arrays
declare global {
	interface InjectAPI {
		saved_object_arrays: {}[][];
	}
}

declare global {
	interface InjectAPI {
		ModuleLoadDbg: {};
		DisabledMulCompression: {};
	}
}
declare global {
	interface InjectAPI {
		RemoteOriginConnection: {};
		remote_origin: {};
	}
}

declare global {
	interface InjectAPI {
		elevate_event_handlers: ((arg0: EventListenersT) => void)[];
	}
}

// inject_api global
declare global {
	interface Window {
		inject_api: InjectAPI;
	}
}

export {};
