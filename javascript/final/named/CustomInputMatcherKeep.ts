import {Impl} from "./Impl";

export namespace CustomInputMatcherKeep {
	export type Keep=true;
}

declare global {
	interface Window {
		__ret: {};
	}

	var __ret: {};
}
