// cint (number for a single setTimeout / setInterval)
declare global {
	interface Window {
		cint?: number;
	}
}

// module_list
declare global {
	interface Window {
		module_list: WebAssembly.Module[];
	}
}

export {};
