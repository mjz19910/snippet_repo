import {EventListenersT} from "../src/EventListenersT";

// saved_objects
declare global {
	interface InjectApi {
		saved_instances?: [string,{name: string;},{}][];
		parse_javascript_str?: (code_str: string) => void;
		saved_objects?: [string,{name: string;}][];
	}
}

declare global {
	interface InjectApi {
		RemoteOriginConnection?: {};
		remote_origin?: {};
	}
}

declare global {
	interface InjectApi {
		elevate_event_handlers?: ((arg0: EventListenersT) => void)[];
	}
}

// inject_api global
declare global {
	interface Window {
		inject_api?: InjectApi;
	}
}

export const inject_api: InjectApi={};

export {};
