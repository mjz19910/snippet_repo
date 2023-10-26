import {parsejs} from "./_deparsejs.ts";
// cspell:ignore parsejs deparsejs
declare global {
	interface Window {
		parser: parsejs;
	}
}

export {};
