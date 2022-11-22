import {Impl} from "./Impl";

export namespace CustomInputMatcherKeep {
	export type Keep=true;
}

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
	}

	var debugApi: Impl.DebugAPI;
	var CustomInputMatcher: typeof Impl.CustomInputMatcher;

	var __ret: any;
}

declare global {
	var DebugAPI: typeof Impl.DebugAPI;
}
