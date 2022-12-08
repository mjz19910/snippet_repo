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

// inject_api global
declare global {
	interface InjectAPI {}
	interface Window {
		inject_api: InjectAPI;
	}
}

export {};
